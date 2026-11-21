import { playFindSound, playHintSound, playMissSound, setSoundEnabled } from './audio.js';
import { renderArtwork, renderKeyboardCursor, renderMarkers as renderFoundMarkers } from './scene-art.js';
import { PLATES, SECONDS_PER_PLATE } from './scene-data.js';
import { chooseHint, completePlate, createGameState, locateDifference, recordFind, recordMiss, selectPlate, stepClock, totalScore } from './game-state.js';

const byId = (id) => document.getElementById(id);
const state = createGameState();
const cursor = { x: 360, y: 225 };
const pictures = {
  left: { button: byId('leftPicture'), art: byId('leftArt'), markers: byId('leftMarkers'), magnifier: byId('leftMagnifier'), cursor: byId('leftCursor') },
  right: { button: byId('rightPicture'), art: byId('rightArt'), markers: byId('rightMarkers'), magnifier: byId('rightMagnifier'), cursor: byId('rightCursor') },
};
let focusedSide = null;
let lastFocusedSide = null;
let hintTimeout;
let transitionTimeout;
let soundOn = false;
let magnifierOn = false;

function activePlate() {
  return PLATES[state.chapter];
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function announce(message) {
  byId('liveRegion').textContent = '';
  window.setTimeout(() => { byId('liveRegion').textContent = message; }, 35);
}

function setFeedback(message, kind = '') {
  const feedback = byId('feedback');
  feedback.classList.remove('is-found', 'is-miss');
  if (kind) feedback.classList.add(`is-${kind}`);
  byId('feedbackText').textContent = message;
}

function renderScene() {
  const plate = activePlate();
  focusedSide = null;
  lastFocusedSide = null;
  byId('plateKicker').innerHTML = `FIELD NOTE ${String(state.chapter + 1).padStart(2, '0')} <span aria-hidden="true">/</span> ${plate.kicker}`;
  byId('plateTitle').textContent = plate.name;
  byId('plateStory').textContent = plate.story;
  for (const [side, view] of Object.entries(pictures)) {
    view.art.innerHTML = renderArtwork(plate, side === 'right', side);
    renderMagnifier(view, side, plate);
    view.art.setAttribute('aria-label', `${plate.name}, ${side} observation`);
    view.button.setAttribute('aria-label', `${side === 'left' ? 'Left' : 'Right'} picture: ${plate.name}. ${plate.differences.length} details differ between the pictures. Focus here, use arrow keys to move, then press Enter or Space to check a spot.`);
  }
  setFeedback('Take your time. The little things are telling.');
  renderChapterNav();
  updateDisplay();
}

function renderChapterNav() {
  document.querySelectorAll('[data-chapter]').forEach((button) => {
    const chapter = Number(button.dataset.chapter);
    const complete = state.completed[chapter];
    button.disabled = chapter > 0 && !state.completed.slice(0, chapter).every(Boolean);
    button.classList.toggle('is-current', chapter === state.chapter);
    button.classList.toggle('is-complete', complete);
    if (chapter === state.chapter) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
    button.querySelector('.chapter-mark').textContent = complete ? '✓' : chapter === state.chapter ? '◌' : '○';
  });
}

function updateMarkerLayers() {
  const plate = activePlate();
  for (const view of Object.values(pictures)) {
    const markers = renderMarkersFor(view, plate);
    view.markers.innerHTML = markers;
    view.magnifierMarkers.innerHTML = markers;
  }
}

function renderMarkersFor(view, plate) {
  return renderFoundMarkers(plate, state.found, state.hintId);
}

function renderCursor() {
  for (const [side, view] of Object.entries(pictures)) {
    const isVisible = side === focusedSide && state.phase === 'playing' && !magnifierOn;
    view.cursor.toggleAttribute('hidden', !isVisible);
    view.cursor.innerHTML = isVisible ? renderKeyboardCursor(cursor) : '';
  }
}

function renderMagnifier(view, side, plate) {
  const clipId = `lens-${plate.id}-${side}`;
  view.magnifier.innerHTML = `
    <defs><clipPath id="${clipId}" clipPathUnits="userSpaceOnUse"><circle class="magnifier-clip" cx="360" cy="225" r="50"/></clipPath></defs>
    <g clip-path="url(#${clipId})">
      <svg class="magnifier-window" x="300" y="187.5" width="120" height="75" viewBox="330 206.25 60 37.5" preserveAspectRatio="none">
        ${renderArtwork(plate, side === 'right', side)}
        <g class="magnifier-markers"></g>
      </svg>
    </g>
    <circle class="magnifier-border" cx="360" cy="225" r="50"/>
  `;
  view.magnifierClip = view.magnifier.querySelector('.magnifier-clip');
  view.magnifierWindow = view.magnifier.querySelector('.magnifier-window');
  view.magnifierBorder = view.magnifier.querySelector('.magnifier-border');
  view.magnifierMarkers = view.magnifier.querySelector('.magnifier-markers');
}

function updateMagnifierPositions() {
  const activeSide = focusedSide ?? lastFocusedSide;
  for (const [side, view] of Object.entries(pictures)) {
    const visible = magnifierOn && state.phase === 'playing' && side === activeSide;
    view.magnifier.toggleAttribute('hidden', !visible);
    if (!visible) continue;
    view.magnifierClip.setAttribute('cx', String(cursor.x));
    view.magnifierClip.setAttribute('cy', String(cursor.y));
    view.magnifierWindow.setAttribute('x', String(cursor.x - 60));
    view.magnifierWindow.setAttribute('y', String(cursor.y - 37.5));
    view.magnifierWindow.setAttribute('viewBox', `${cursor.x - 30} ${cursor.y - 18.75} 60 37.5`);
    view.magnifierBorder.setAttribute('cx', String(cursor.x));
    view.magnifierBorder.setAttribute('cy', String(cursor.y));
  }
}

function updateDisplay() {
  const plate = activePlate();
  const remaining = plate.differences.length - state.found.size;
  byId('remainingCount').textContent = String(remaining).padStart(2, '0');
  byId('remainingSuffix').textContent = remaining === 1 ? 'detail' : 'details';
  byId('foundCount').textContent = String(state.found.size).padStart(2, '0');
  byId('foundSuffix').textContent = `of ${String(plate.differences.length).padStart(2, '0')}`;
  const currentScore = totalScore(state) + (!state.completed[state.chapter] && state.phase !== 'timed-out' ? state.points : 0);
  byId('totalScoreCount').textContent = String(currentScore).padStart(4, '0');
  byId('timerReadout').textContent = formatTime(state.timeLeft);
  byId('timerReadout').dateTime = `PT${Math.floor(state.timeLeft / 60)}M${state.timeLeft % 60}S`;
  byId('timerFill').style.transform = `scaleX(${state.timeLeft / SECONDS_PER_PLATE})`;
  byId('timerTrack').classList.toggle('is-urgent', state.timeLeft <= 35);
  byId('timerTrack').setAttribute('aria-valuenow', String(state.timeLeft));
  byId('hintButton').disabled = state.hintUsed || state.phase !== 'playing';
  byId('magnifierButton').disabled = state.phase !== 'playing';
  byId('pauseButton').disabled = ['transition', 'timed-out', 'finished'].includes(state.phase);
  byId('pauseLabel').textContent = state.phase === 'paused' ? 'Resume' : 'Pause';
  for (const view of Object.values(pictures)) view.button.disabled = state.phase !== 'playing';
  updateMarkerLayers();
  renderCursor();
  updateMagnifierPositions();
  renderChapterNav();
}

function hintDirection(item) {
  const vertical = item.y < 150 ? 'upper' : item.y > 300 ? 'lower' : 'middle';
  const horizontal = item.x < 240 ? 'left' : item.x > 480 ? 'right' : 'center';
  return `${vertical} ${horizontal}`;
}

function toggleMagnifier() {
  if (state.phase !== 'playing') return;
  magnifierOn = !magnifierOn;
  byId('magnifierButton').setAttribute('aria-pressed', String(magnifierOn));
  byId('magnifierLabel').textContent = magnifierOn ? 'Lens on' : 'Magnifier';
  setFeedback(magnifierOn ? 'The lens follows your eye. The details are still yours to find.' : 'The full picture is back in view.');
  announce(magnifierOn ? 'Magnifier on.' : 'Magnifier off.');
  updateMagnifierPositions();
}

function askForHint() {
  if (state.phase !== 'playing') return;
  const id = chooseHint(state);
  if (id === null) {
    setFeedback('Aster has already shared this plate’s hint.');
    return;
  }
  const plateId = activePlate().id;
  playHintSound();
  setFeedback(`Aster’s glow is near the ${hintDirection(activePlate().differences[id])}.`, 'found');
  announce(`Hint: Aster’s glow is near the ${hintDirection(activePlate().differences[id])}.`);
  updateDisplay();
  window.clearTimeout(hintTimeout);
  hintTimeout = window.setTimeout(() => {
    if (activePlate().id !== plateId) return;
    state.hintId = null;
    updateDisplay();
  }, 4300);
}

function finishPlate() {
  state.phase = 'transition';
  completePlate(state);
  updateDisplay();
  setFeedback('Every detail is back where it belongs. Aster rings the little brass bell.', 'found');
  announce(`Plate complete. ${activePlate().name} is fully observed.`);
  window.clearTimeout(transitionTimeout);
  transitionTimeout = window.setTimeout(() => {
    if (state.chapter === PLATES.length - 1) {
      state.phase = 'finished';
      const detailCount = PLATES.reduce((total, plate) => total + plate.differences.length, 0);
      byId('finishSummary').textContent = `${PLATES.length} plates, ${detailCount} details, ${state.allMisses} quiet ${state.allMisses === 1 ? 'misstep' : 'missteps'}.`;
      byId('finalScore').textContent = String(totalScore(state)).padStart(4, '0');
      updateDisplay();
      byId('finishDialog').showModal();
      return;
    }
    selectPlate(state, state.chapter + 1);
    cursor.x = 360;
    cursor.y = 225;
    renderScene();
    announce(`The next field note: ${activePlate().name}.`);
  }, 1400);
}

function checkAt(x, y) {
  if (state.phase !== 'playing') return;
  const plate = activePlate();
  const id = locateDifference(plate, x, y);
  if (id < 0) {
    recordMiss(state);
    playMissSound();
    setFeedback(`A quiet ripple. The night keeps ${state.timeLeft ? 'four seconds' : 'the rest of this plate'} for itself.`, 'miss');
    announce('No change there. Four seconds have passed.');
    if (state.timeLeft === 0) {
      state.phase = 'timed-out';
      setFeedback('The lanterns are dim. Start this plate again when you are ready.', 'miss');
    }
    updateDisplay();
    return;
  }
  if (recordFind(state, id) === 'already-found') {
    setFeedback('That detail is safely noted. Look for a different glimmer.');
    return;
  }
  playFindSound();
  setFeedback(`Found ${plate.differences[id].name}. ${plate.differences.length - state.found.size} still to find.`, 'found');
  announce(`Found ${plate.differences[id].name}. ${plate.differences.length - state.found.size} details remain.`);
  updateDisplay();
  if (state.found.size === plate.differences.length) finishPlate();
}

function handlePictureClick(side, event) {
  if (state.phase !== 'playing') return;
  if (event.detail === 0) {
    checkAt(cursor.x, cursor.y);
    return;
  }
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = Math.max(0, Math.min(720, ((event.clientX - bounds.left) / bounds.width) * 720));
  const y = Math.max(0, Math.min(450, ((event.clientY - bounds.top) / bounds.height) * 450));
  focusedSide = side;
  lastFocusedSide = side;
  cursor.x = x;
  cursor.y = y;
  checkAt(x, y);
  renderCursor();
  updateMagnifierPositions();
}

function resetCurrentPlate() {
  window.clearTimeout(transitionTimeout);
  if (byId('finishDialog').open) byId('finishDialog').close();
  if (state.phase === 'finished') {
    state.completed = Array(PLATES.length).fill(false);
    state.scores = Array(PLATES.length).fill(0);
    selectPlate(state, 0);
  } else {
    selectPlate(state, state.chapter);
  }
  cursor.x = 360;
  cursor.y = 225;
  renderScene();
}

for (const [side, view] of Object.entries(pictures)) {
  view.button.addEventListener('focus', () => {
    focusedSide = side;
    lastFocusedSide = side;
    renderCursor();
    updateMagnifierPositions();
  });
  view.button.addEventListener('blur', () => {
    if (focusedSide === side) focusedSide = null;
    renderCursor();
    updateMagnifierPositions();
  });
  view.button.addEventListener('mousemove', (event) => {
    if (!magnifierOn || state.phase !== 'playing') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursor.x = Math.max(0, Math.min(720, ((event.clientX - bounds.left) / bounds.width) * 720));
    cursor.y = Math.max(0, Math.min(450, ((event.clientY - bounds.top) / bounds.height) * 450));
    focusedSide = side;
    lastFocusedSide = side;
    renderCursor();
    updateMagnifierPositions();
  });
  view.button.addEventListener('keydown', (event) => {
    const moves = { ArrowLeft: [-18, 0], ArrowRight: [18, 0], ArrowUp: [0, -18], ArrowDown: [0, 18] };
    const move = moves[event.key];
    if (!move || state.phase !== 'playing') return;
    event.preventDefault();
    cursor.x = Math.max(18, Math.min(702, cursor.x + move[0]));
    cursor.y = Math.max(18, Math.min(432, cursor.y + move[1]));
    renderCursor();
    updateMagnifierPositions();
  });
  view.button.addEventListener('click', (event) => handlePictureClick(side, event));
}

document.querySelectorAll('[data-chapter]').forEach((button) => {
  button.addEventListener('click', () => {
    window.clearTimeout(transitionTimeout);
    if (byId('finishDialog').open) byId('finishDialog').close();
    selectPlate(state, Number(button.dataset.chapter));
    cursor.x = 360;
    cursor.y = 225;
    focusedSide = null;
    lastFocusedSide = null;
    renderScene();
  });
});

byId('hintButton').addEventListener('click', askForHint);
byId('magnifierButton').addEventListener('click', toggleMagnifier);
byId('restartButton').addEventListener('click', resetCurrentPlate);
byId('pauseButton').addEventListener('click', () => {
  if (state.phase === 'playing') {
    state.phase = 'paused';
    setFeedback('Clock stopped. Let your eyes rest among the leaves.');
  } else if (state.phase === 'paused') {
    state.phase = 'playing';
    setFeedback('The little things are telling.');
  }
  updateDisplay();
});
byId('soundButton').addEventListener('click', () => {
  soundOn = setSoundEnabled(!soundOn);
  byId('soundButton').setAttribute('aria-pressed', String(soundOn));
  byId('soundButton').setAttribute('aria-label', soundOn ? 'Turn sound off' : 'Turn sound on');
  byId('soundLabel').textContent = soundOn ? 'Sound on' : 'Sound off';
});
let helpPausedClock = false;
byId('helpButton').addEventListener('click', () => {
  helpPausedClock = state.phase === 'playing';
  if (helpPausedClock) {
    state.phase = 'paused';
    updateDisplay();
  }
  byId('helpDialog').showModal();
});
byId('helpDialog').addEventListener('close', () => {
  if (!helpPausedClock || state.phase !== 'paused') return;
  helpPausedClock = false;
  state.phase = 'playing';
  updateDisplay();
});
byId('playAgainButton').addEventListener('click', resetCurrentPlate);

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'm' && !byId('helpDialog').open && !byId('finishDialog').open) {
    if (event.target instanceof HTMLButtonElement && !['leftPicture', 'rightPicture', 'magnifierButton'].includes(event.target.id)) return;
    event.preventDefault();
    toggleMagnifier();
    return;
  }
  if (event.key.toLowerCase() === 'h' && !byId('helpDialog').open && !byId('finishDialog').open) {
    if (event.target instanceof HTMLButtonElement && !['hintButton', 'leftPicture', 'rightPicture'].includes(event.target.id)) return;
    event.preventDefault();
    askForHint();
  }
});

window.setInterval(() => {
  if (stepClock(state)) {
    state.phase = 'timed-out';
    setFeedback('The lanterns are dim. Start this plate again when you are ready.', 'miss');
    announce('Time is up. Start this field note again whenever you are ready.');
  }
  updateDisplay();
}, 1000);

renderScene();
