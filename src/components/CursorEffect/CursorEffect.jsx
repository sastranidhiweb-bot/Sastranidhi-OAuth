// src/components/CursorEffect/CursorEffect.jsx
//
// Site-wide mouse effect: a short trail of sparkles behind the pointer.
// The normal cursor stays as it is; this only decorates it. Nothing is drawn
// on touch screens or when the visitor prefers reduced motion. Styles in
// styles/cursor-effect.css.
//
// Kept cheap so it never feels laggy: sparkles are pre-drawn sprites (no
// per-frame blur), only the area they cover is cleared, and the loop stops
// when idle.

import { useEffect, useRef } from 'react';
import '../../styles/cursor-effect.css';

const SPARKLE_LIFE = 600; // ms
const SPARKLE_GAP = 16; // px of movement between sparkles
const MAX_SPARKLES = 40;
// Site theme: white and purple. White sparkles get a purple glow so they
// still show up on the light page backgrounds.
const COLORS = [
  { fill: '#FFFFFF', glow: '#9B6BE5' },
  { fill: '#FFFFFF', glow: '#6933C9' },
  { fill: '#9B6BE5', glow: '#9B6BE5' },
  { fill: '#6933C9', glow: '#6933C9' },
];
const SPRITE = 32; // sprite size in px; sparkles are drawn scaled down from it

export default function CursorEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fancyPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fancyPointer.matches || reducedMotion.matches) return undefined;

    const canvas = canvasRef.current;
    // desynchronized lets the browser show frames with less delay where supported
    const ctx = canvas.getContext('2d', { desynchronized: true });
    const sprites = COLORS.map(makeSprite);

    // Sparkles are soft glows, so the canvas runs at CSS-pixel size even on
    // high-DPI screens: a quarter of the pixels to clear and draw.
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const mouse = { x: -100, y: -100 };
    const lastSparkle = { x: 0, y: 0 };
    let sparkles = [];
    let dirty = null; // area drawn last frame, the only part that needs clearing
    let frame = 0;
    let lastTime = 0;

    const tick = (now) => {
      // movement is scaled by frame time, so 60 Hz and 144 Hz screens look the same
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16.7;
      lastTime = now;

      if (dirty) ctx.clearRect(dirty.x, dirty.y, dirty.w, dirty.h);
      dirty = null;
      sparkles = sparkles.filter((s) => now - s.born < SPARKLE_LIFE);
      if (sparkles.length) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const s of sparkles) {
          const life = 1 - (now - s.born) / SPARKLE_LIFE; // 1 -> 0
          const step = dt / 16.7;
          s.x += s.vx * step;
          s.y += s.vy * step;
          s.vy += 0.03 * step; // drift down a little
          const size = s.size * life;
          ctx.globalAlpha = life;
          ctx.drawImage(s.sprite, s.x - size / 2, s.y - size / 2, size, size);
          minX = Math.min(minX, s.x - size);
          minY = Math.min(minY, s.y - size);
          maxX = Math.max(maxX, s.x + size);
          maxY = Math.max(maxY, s.y + size);
        }
        ctx.globalAlpha = 1;
        dirty = { x: minX - 2, y: minY - 2, w: maxX - minX + 4, h: maxY - minY + 4 };
      }

      if (!sparkles.length && !dirty) {
        // nothing moving: stop until the next mousemove
        frame = 0;
        lastTime = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - lastSparkle.x;
      const dy = mouse.y - lastSparkle.y;
      if (dx * dx + dy * dy > SPARKLE_GAP * SPARKLE_GAP && sparkles.length < MAX_SPARKLES) {
        lastSparkle.x = mouse.x;
        lastSparkle.y = mouse.y;
        sparkles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: 12 + Math.random() * 10,
          sprite: sprites[Math.floor(Math.random() * sprites.length)],
          born: performance.now(),
        });
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-sparkles" aria-hidden="true" />;
}

// Four-pointed twinkle star with its glow, drawn once per colour at startup;
// each frame then only copies it (drawImage), which is far cheaper than
// drawing a blurred shape.
function makeSprite({ fill, glow }) {
  const c = document.createElement('canvas');
  c.width = SPRITE;
  c.height = SPRITE;
  const g = c.getContext('2d');
  const m = SPRITE / 2;
  const r = SPRITE * 0.3;
  g.fillStyle = fill;
  g.shadowColor = glow;
  g.shadowBlur = SPRITE * 0.25;
  g.beginPath();
  g.moveTo(m, m - r);
  g.quadraticCurveTo(m, m, m + r, m);
  g.quadraticCurveTo(m, m, m, m + r);
  g.quadraticCurveTo(m, m, m - r, m);
  g.quadraticCurveTo(m, m, m, m - r);
  g.fill();
  return c;
}
