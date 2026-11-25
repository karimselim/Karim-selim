import React, { useEffect, useRef } from 'react';

// Tiny QA bugs crawl at the edges of Skills. They flee the cursor; click one to squash it.
const N = 9;

const Bugs = () => {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const box = cv.parentElement.parentElement;
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, raf = null, visible = false;
    let mx = -999, my = -999;
    const resize = () => {
      W = cv.width = box.clientWidth;
      H = cv.height = box.clientHeight;
    };
    resize();
    const bugs = Array.from({ length: N }, () => {
      const edge = Math.random() < 0.5;
      return {
        x: edge ? (Math.random() < 0.5 ? 20 : W - 20) : Math.random() * W,
        y: edge ? Math.random() * H : Math.random() < 0.5 ? 20 : H - 20,
        a: Math.random() * 6.28,
        s: 0.4 + Math.random() * 0.5,
        ph: Math.random() * 10,
        dead: 0,
      };
    });
    const splats = [];
    const drawBug = (b, t) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a + Math.PI / 2);
      ctx.strokeStyle = '#8a1a1f';
      ctx.lineWidth = 1.2;
      for (let i = -1; i <= 1; i++) {
        const w = Math.sin(t * 0.02 + b.ph + i) * 2;
        ctx.beginPath();
        ctx.moveTo(-3, i * 3); ctx.lineTo(-9, i * 4 + w);
        ctx.moveTo(3, i * 3); ctx.lineTo(9, i * 4 - w);
        ctx.stroke();
      }
      ctx.fillStyle = '#1a0507';
      ctx.strokeStyle = '#c2272d';
      ctx.beginPath(); ctx.ellipse(0, 0, 4, 7, 0, 0, 6.28); ctx.fill(); ctx.stroke();
      ctx.restore();
    };
    const tick = t => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      const rect = box.getBoundingClientRect();
      const cx = mx - rect.left, cy = my - rect.top;
      splats.forEach(s => {
        ctx.fillStyle = `rgba(150,10,20,${s.life})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 7, 0, 6.28); ctx.fill();
        s.life -= 0.0015;
      });
      while (splats.length && splats[0].life <= 0) splats.shift();
      bugs.forEach(b => {
        if (b.dead) {
          if (t - b.dead > 6000) { b.dead = 0; b.x = Math.random() < 0.5 ? 20 : W - 20; b.y = Math.random() * H; }
          return;
        }
        const d = Math.hypot(b.x - cx, b.y - cy);
        let sp = b.s;
        if (d < 160) { b.a = Math.atan2(b.y - cy, b.x - cx); sp = 3; }
        else b.a += Math.sin(t * 0.001 + b.ph) * 0.05;
        b.x += Math.cos(b.a) * sp; b.y += Math.sin(b.a) * sp;
        if (b.x < 10 || b.x > W - 10) { b.a = Math.PI - b.a; b.x = Math.max(10, Math.min(W - 10, b.x)); }
        if (b.y < 10 || b.y > H - 10) { b.a = -b.a; b.y = Math.max(10, Math.min(H - 10, b.y)); }
        drawBug(b, t);
      });
    };
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    const onClick = e => {
      if (!visible) return;
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      bugs.forEach(b => {
        if (!b.dead && Math.hypot(b.x - x, b.y - y) < 18) {
          b.dead = performance.now();
          splats.push({ x: b.x, y: b.y, life: 0.7 });
        }
      });
    };
    const io = new IntersectionObserver(en => { visible = en[0].isIntersecting; if (!visible) ctx.clearRect(0, 0, W, H); }, { threshold: 0.35 });
    io.observe(box);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 56, pointerEvents: 'none' }} />;
};

export default Bugs;
