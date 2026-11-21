import { MISS_PENALTY_SECONDS, PLATES, SECONDS_PER_PLATE } from './scene-data.js';

export function createGameState() {
  return {
    chapter: 0,
    found: new Set(),
    completed: [false, false, false],
    scores: [0, 0, 0],
    timeLeft: SECONDS_PER_PLATE,
    misses: 0,
    allMisses: 0,
    points: 0,
    hintUsed: false,
    hintId: null,
    phase: 'playing',
  };
}

export function selectPlate(state, chapter) {
  state.chapter = Math.max(0, Math.min(PLATES.length - 1, chapter));
  state.found = new Set();
  state.timeLeft = SECONDS_PER_PLATE;
  state.misses = 0;
  state.points = 0;
  state.hintUsed = false;
  state.hintId = null;
  state.phase = 'playing';
}

export function locateDifference(plate, x, y) {
  return plate.differences.findIndex((item) => Math.hypot(item.x - x, item.y - y) <= item.radius);
}

export function recordFind(state, id) {
  if (state.found.has(id)) return 'already-found';
  state.found.add(id);
  state.points += 75 + Math.floor(state.timeLeft / 4) + (state.misses === 0 ? 15 : 0);
  return 'found';
}

export function recordMiss(state) {
  state.misses += 1;
  state.allMisses += 1;
  state.timeLeft = Math.max(0, state.timeLeft - MISS_PENALTY_SECONDS);
  state.points = Math.max(0, state.points - 8);
}

export function chooseHint(state) {
  if (state.hintUsed) return null;
  const nextId = PLATES[state.chapter].differences.findIndex((_, id) => !state.found.has(id));
  if (nextId < 0) return null;
  state.hintUsed = true;
  state.hintId = nextId;
  return nextId;
}

export function stepClock(state) {
  if (state.phase !== 'playing') return false;
  state.timeLeft = Math.max(0, state.timeLeft - 1);
  return state.timeLeft === 0;
}

export function completePlate(state) {
  state.completed[state.chapter] = true;
  state.scores[state.chapter] = state.points + 250 + state.timeLeft * 2;
}

export function totalScore(state) {
  return state.scores.reduce((sum, score) => sum + score, 0);
}
