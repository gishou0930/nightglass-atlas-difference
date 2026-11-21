let context;
let enabled = false;

function getContext() {
  if (!context) context = new window.AudioContext();
  if (context.state === 'suspended') void context.resume();
  return context;
}

function tone(frequency, start, length, volume = 0.045, type = 'sine') {
  if (!enabled) return;
  const audio = getContext();
  const oscillator = audio.createOscillator();
  const envelope = audio.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(volume, start + 0.018);
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + length);
  oscillator.connect(envelope).connect(audio.destination);
  oscillator.start(start);
  oscillator.stop(start + length + 0.025);
}

export function setSoundEnabled(value) {
  enabled = value;
  if (enabled) tone(587.33, getContext().currentTime, 0.19, 0.028);
  return enabled;
}

export function playFindSound() {
  const now = enabled ? getContext().currentTime : 0;
  tone(587.33, now, 0.22);
  tone(783.99, now + 0.075, 0.28, 0.035);
  tone(1046.5, now + 0.15, 0.33, 0.025);
}

export function playMissSound() {
  if (!enabled) return;
  const now = getContext().currentTime;
  tone(196, now, 0.18, 0.018, 'triangle');
  tone(146.83, now + 0.06, 0.24, 0.015, 'triangle');
}

export function playHintSound() {
  if (!enabled) return;
  const now = getContext().currentTime;
  tone(659.25, now, 0.24, 0.024);
  tone(880, now + 0.11, 0.34, 0.02);
}
