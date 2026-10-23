import confetti from "canvas-confetti";

/**
 * Standard celebratory confetti burst (Pastel Sakura Blossom & Fairycore colors)
 */
export const fireConfetti = () => {
  const count = 220;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 28,
    startVelocity: 55,
    colors: ["#ff7597", "#ffb3c6", "#d8b4f8", "#ffd1dc"]
  });
  fire(0.2, {
    spread: 60,
    colors: ["#ffffff", "#fda4af", "#e0aaff", "#c5e3f6"]
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.85,
    colors: ["#ffe599", "#ff6584", "#9d65e8", "#4a90e2"]
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#ffd1dc", "#ff9bb2", "#c8b6ff", "#b8e2f2"]
  });
};

/**
 * Heart-shaped & Blossom confetti shower for romantic moments
 */
export const fireHeartBurst = () => {
  confetti({
    particleCount: 70,
    spread: 85,
    origin: { y: 0.6 },
    shapes: ["circle"],
    colors: ["#ff6584", "#ff8fa3", "#ffb3c1", "#d8b4f8", "#ffffff", "#ffe0eb"],
    scalar: 1.5,
    ticks: 220
  });
};

/**
 * Grand fireworks display on candle blowing
 */
export const fireFireworks = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 55 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ["#ff6584", "#ffb3c6", "#d8b4f8", "#ffd166", "#4a90e2"]
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ["#ff7597", "#f8c8dc", "#c8b6ff", "#b8e2f2", "#ffffff"]
    });
  }, 250);
};

/**
 * Sparkle shower on coupon / quiz unlock
 */
export const fireSparkles = () => {
  confetti({
    particleCount: 90,
    angle: 60,
    spread: 60,
    origin: { x: 0 },
    colors: ["#f7ba2a", "#ff7597", "#d8b4f8", "#ffffff", "#4a90e2"]
  });
  confetti({
    particleCount: 90,
    angle: 120,
    spread: 60,
    origin: { x: 1 },
    colors: ["#f7ba2a", "#ff7597", "#d8b4f8", "#ffffff", "#4a90e2"]
  });
};
