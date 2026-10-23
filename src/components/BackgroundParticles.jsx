import React, { useEffect, useRef } from "react";

export const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Refined petal colors: rose, lavender, champagne, peach
    const petalColors = [
      "rgba(232, 130, 155, ",  // Soft Rose
      "rgba(196, 161, 201, ",  // Dusty Lavender
      "rgba(212, 165, 116, ",  // Champagne Gold
      "rgba(245, 218, 220, ",  // Warm Petal
      "rgba(238, 204, 196, ",  // Peach Cream
    ];

    // Create depth-layered petals
    const petalCount = Math.min(Math.floor(width / 32), 28);
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      const isForeground = Math.random() > 0.6;
      const shapeType = Math.random(); // 0-0.4: blossom, 0.4-0.7: ellipse, 0.7-1: heart
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isForeground ? Math.random() * 9 + 8 : Math.random() * 5 + 4,
        speedY: isForeground ? Math.random() * 1.2 + 0.6 : Math.random() * 0.6 + 0.3,
        speedX: Math.random() * 0.6 - 0.15,
        oscillationSpeed: Math.random() * 0.018 + 0.008,
        oscillationDistance: Math.random() * 30 + 15,
        oscillationOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.02 + 0.008,
        opacity: isForeground ? Math.random() * 0.35 + 0.3 : Math.random() * 0.25 + 0.15,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        shapeType: shapeType < 0.4 ? "blossom" : shapeType < 0.7 ? "ellipse" : "heart",
        layer: isForeground ? "fg" : "bg",
      });
    }

    // Soft Bokeh light orbs
    const orbCount = Math.min(Math.floor(width / 50), 18);
    const orbs = [];
    const orbColors = [
      "rgba(212, 165, 116, ",  // Gold
      "rgba(232, 130, 155, ",  // Rose
      "rgba(196, 161, 201, ",  // Lavender
      "rgba(250, 245, 238, ",  // Starlight
    ];

    for (let i = 0; i < orbCount; i++) {
      const isLarge = Math.random() > 0.75;
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isLarge ? Math.random() * 4 + 3 : Math.random() * 2.2 + 1,
        speedY: (Math.random() - 0.5) * 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        baseOpacity: isLarge ? Math.random() * 0.2 + 0.1 : Math.random() * 0.35 + 0.15,
        opacity: 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        isStarGlint: !isLarge && Math.random() > 0.65,
      });
    }

    // Draw cherry blossom petal (5-petal shape)
    const drawBlossomPetal = (ctx, petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      const scaleX = Math.cos(petal.flip);
      ctx.scale(scaleX, 1);
      ctx.fillStyle = `${petal.color}${petal.opacity})`;

      const s = petal.size * 0.5;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -s, s * 0.45, s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate((Math.PI * 2) / 5);
      }
      ctx.restore();
    };

    // Draw ellipse petal
    const drawEllipsePetal = (ctx, petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      const scaleX = Math.cos(petal.flip);
      ctx.scale(scaleX, 1);
      ctx.beginPath();
      ctx.fillStyle = `${petal.color}${petal.opacity})`;
      const s = petal.size;
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.8, -s * 0.8, s * 0.85, s * 0.3, 0, s);
      ctx.bezierCurveTo(-s * 0.85, s * 0.3, -s * 0.8, -s * 0.8, 0, -s);
      ctx.fill();
      ctx.restore();
    };

    // Draw heart-like petal
    const drawHeartPetal = (ctx, petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      const scaleX = Math.cos(petal.flip);
      ctx.scale(scaleX * 0.7, 0.7);
      ctx.beginPath();
      ctx.fillStyle = `${petal.color}${petal.opacity})`;
      const s = petal.size;
      ctx.moveTo(0, s * 0.6);
      ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.5, -s, 0, -s * 0.4);
      ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.2, 0, s * 0.6);
      ctx.fill();
      ctx.restore();
    };

    // Draw bokeh orb
    const drawOrb = (ctx, orb) => {
      ctx.save();
      ctx.translate(orb.x, orb.y);
      const op = Math.max(0.03, Math.min(0.7, orb.opacity));
      const rad = orb.size;

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rad * 3);
      gradient.addColorStop(0, `${orb.color}${op * 0.6})`);
      gradient.addColorStop(0.5, `${orb.color}${op * 0.15})`);
      gradient.addColorStop(1, `${orb.color}0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, rad * 3, 0, Math.PI * 2);
      ctx.fill();

      if (orb.isStarGlint) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${op * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(-rad * 1.8, 0);
        ctx.lineTo(rad * 1.8, 0);
        ctx.moveTo(0, -rad * 1.8);
        ctx.lineTo(0, rad * 1.8);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, rad * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${op * 0.7})`;
      ctx.fill();

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      // Background layer orbs first
      orbs.forEach((orb) => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        orb.opacity = orb.baseOpacity + Math.sin(tick * orb.pulseSpeed + orb.pulseOffset) * 0.15;

        if (orb.x < -20) orb.x = width + 10;
        if (orb.x > width + 20) orb.x = -10;
        if (orb.y < -20) orb.y = height + 10;
        if (orb.y > height + 20) orb.y = -10;

        drawOrb(ctx, orb);
      });

      // Petals: background layer first, then foreground
      const sortedPetals = [...petals].sort((a, b) => (a.layer === "bg" ? -1 : 1));
      sortedPetals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(tick * p.oscillationSpeed + p.oscillationOffset) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.shapeType === "blossom") drawBlossomPetal(ctx, p);
        else if (p.shapeType === "heart") drawHeartPetal(ctx, p);
        else drawEllipsePetal(ctx, p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0
      }}
    />
  );
};
