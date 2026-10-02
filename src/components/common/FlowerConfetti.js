import confetti from 'canvas-confetti';

export const triggerBloomConfetti = () => {
  // Soft pastel petal colors: lavender, blush pink, soft cream, sage green, gold
  const colors = ['#C084FC', '#F472B6', '#FBCFE8', '#DDD6FE', '#FDE047', '#86EFAC'];

  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.8 },
    colors: colors,
    shapes: ['circle'],
    ticks: 180,
    gravity: 0.7,
    scalar: 1.1,
  });
};

export const triggerCelebrationConfetti = () => {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#A855F7', '#EC4899', '#F43F5E', '#3B82F6', '#10B981'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
