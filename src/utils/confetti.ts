// src/utils/confetti.ts
export async function fireConfetti() {
  const { default: confetti } = await import('canvas-confetti');
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#FF791B', '#FFF3EB', '#ffffff', '#e06510'],
  });
}
