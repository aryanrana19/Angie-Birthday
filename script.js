/* =========================================
   ANGIE'S BIRTHDAY SITE — script.js
   ========================================= */

/* ──────────────────────────────────────────
   1. LOADER
   ────────────────────────────────────────── */
(function initLoader() {
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderText= document.getElementById('loaderText');
  const loaderSub = document.getElementById('loaderSub');

  const steps = [
    { pct: 20,  delay: 400,  main: 'Initializing Birthday Protocol...',  sub: '' },
    { pct: 50,  delay: 1100, main: 'Loading Angie.exe',                   sub: '' },
    { pct: 75,  delay: 1800, main: 'Compiling 19 years of greatness...',  sub: '🎀 Please wait...' },
    { pct: 90,  delay: 2500, main: 'Calibrating Camera Camera sensor...', sub: '📷 Still off...' },
    { pct: 100, delay: 3100, main: 'Ready. Happy Birthday! ✨',           sub: '~Loading complete~' },
  ];

  steps.forEach(({ pct, delay, main, sub }) => {
    setTimeout(() => {
      loaderBar.style.width = pct + '%';
      loaderText.textContent = main;
      if (sub) { loaderSub.style.opacity = '1'; loaderSub.textContent = sub; }
    }, delay);
  });

  // Launch loader particles
  initLoaderParticles();

  setTimeout(() => {
    loader.classList.add('fade-out');
    document.getElementById('mainSite').classList.remove('hidden');
    setTimeout(() => {
      loader.remove();
      startSite();
    }, 800);
  }, 3700);
})();

/* ──────────────────────────────────────────
   2. LOADER PARTICLES
   ────────────────────────────────────────── */
function initLoaderParticles() {
  const canvas = document.getElementById('loaderParticles');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: -Math.random() * 0.6 - 0.2,
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,182,193,${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ──────────────────────────────────────────
   3. SITE INIT
   ────────────────────────────────────────── */
function startSite() {
  initParticles();
  initTypewriters();
  initScrollObserver();
  initDotNav();
  initStatCounters();
  initBars();
  initFinale();
  showDotNavAfterScroll();
}

/* ──────────────────────────────────────────
   4. BACKGROUND PARTICLES
   ────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = window.innerWidth < 600 ? 40 : 80;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.3,
    dx: (Math.random() - 0.5) * 0.25,
    dy: -Math.random() * 0.3 - 0.1,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? '255,182,193' : '213,184,255',
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ──────────────────────────────────────────
   5. TYPEWRITER EFFECTS
   ────────────────────────────────────────── */
function initTypewriters() {
  const heroLine1 = document.getElementById('heroLine1');
  const heroLine2 = document.getElementById('heroLine2');
  const heroLine3 = document.getElementById('heroLine3');

  // Add cursor
  heroLine1.innerHTML = '<span class="cursor">|</span>';

  typeText(heroLine1, 'Hey, Angie...', 80, () => {
    setTimeout(() => {
      typeText(heroLine2, "It's officially your birthday.", 55, () => {
        setTimeout(() => {
          typeText(heroLine3, 'Level 19 Unlocked. 🎮', 50);
        }, 300);
      });
    }, 400);
  });
}

function typeText(el, text, speed, cb) {
  // Remove cursor from el if present
  el.innerHTML = '';
  let i = 0;
  function tick() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      if (el === document.getElementById('heroLine1')) {
        el.innerHTML = text.slice(0, i) + '<span class="cursor">|</span>';
      }
      i++;
      setTimeout(tick, speed + Math.random() * 30 - 15);
    } else {
      if (el === document.getElementById('heroLine1')) {
        el.innerHTML = text + '<span class="cursor">|</span>';
      }
      if (cb) cb();
    }
  }
  tick();
}

/* ──────────────────────────────────────────
   6. SCROLL OBSERVER — reveal & triggers
   ────────────────────────────────────────── */
function initScrollObserver() {
  // Reveal elements
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.dataset.delay = (i % 5) * 80;
    revealObserver.observe(el);
  });

  // Section triggers (counters, bars, finale)
  const statsSection    = document.getElementById('stats');
  const analysisSection = document.getElementById('analysis');
  const finaleSection   = document.getElementById('finale');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id === 'stats')    triggerCounters();
        if (id === 'analysis') triggerBars();
        if (id === 'finale') {
          entry.target.classList.add('in-view');
          triggerFinaleConfetti();
        }
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (statsSection)    sectionObserver.observe(statsSection);
  if (analysisSection) sectionObserver.observe(analysisSection);
  if (finaleSection)   sectionObserver.observe(finaleSection);
}

/* ──────────────────────────────────────────
   7. DOT NAVIGATION
   ────────────────────────────────────────── */
function initDotNav() {
  const sections = document.querySelectorAll('section[id]');
  const dotLinks = document.querySelectorAll('.dot-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dotLinks.forEach(d => d.classList.remove('active'));
        const active = document.querySelector(`.dot-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll on click
  dotLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function showDotNavAfterScroll() {
  const nav = document.getElementById('dotNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) nav.classList.add('visible');
    else nav.classList.remove('visible');
  }, { passive: true });
}

/* ──────────────────────────────────────────
   8. STAT COUNTERS
   ────────────────────────────────────────── */
let countersTriggered = false;
function initStatCounters() { /* placeholder */ }

function triggerCounters() {
  if (countersTriggered) return;
  countersTriggered = true;

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = el.dataset.target;
    const suffix = el.dataset.suffix || '';

    if (target === '∞') {
      let n = 0;
      const iv = setInterval(() => {
        n += 7;
        if (n >= 999) { el.textContent = '∞'; clearInterval(iv); }
        else el.textContent = n;
      }, 18);
      return;
    }

    const end = parseInt(target, 10);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ──────────────────────────────────────────
   9. PROGRESS BARS
   ────────────────────────────────────────── */
let barsTriggered = false;
function initBars() { /* placeholder */ }

function triggerBars() {
  if (barsTriggered) return;
  barsTriggered = true;

  document.querySelectorAll('.bar-fill').forEach((bar, i) => {
    const width = parseInt(bar.dataset.width, 10);
    const isOverflow = bar.dataset.overflow === 'true';
    const isHidden   = bar.classList.contains('hidden-stat');

    if (isHidden) return;

    setTimeout(() => {
      // cap visual at 100%, but overflow glows red
      bar.style.width = Math.min(width, 100) + '%';
      if (isOverflow) {
        bar.style.boxShadow = '0 0 12px rgba(255,80,100,0.5)';
      }
    }, i * 150);
  });
}

/* ──────────────────────────────────────────
   10. SCROLL HELPER
   ────────────────────────────────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ──────────────────────────────────────────
   11. CONFETTI ENGINE
   ────────────────────────────────────────── */
let confettiCtx, confettiCanvas, confettiPieces = [], confettiAnim;

function initFinale() {
  confettiCanvas = document.getElementById('confettiCanvas');
  confettiCtx    = confettiCanvas.getContext('2d');
  confettiCanvas.width  = confettiCanvas.offsetWidth  || window.innerWidth;
  confettiCanvas.height = confettiCanvas.offsetHeight || window.innerHeight;
}

function triggerFinaleConfetti() {
  if (!confettiCtx) initFinale();
  spawnConfetti(200);
}

function spawnConfetti(count) {
  const colors = ['#ffb6c1','#ff85a1','#d5b8ff','#ffd6e0','#ede4ff','#ffc2d1','#c9b1ff','#ffb3c6'];
  const shapes = ['circle','rect','star'];

  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 100,
      r: Math.random() * 6 + 3,
      dx: (Math.random() - 0.5) * 3,
      dy: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rot: Math.random() * 360,
      drot: (Math.random() - 0.5) * 8,
      alpha: 1,
      life: 1,
    });
  }

  if (!confettiAnim) animateConfetti();
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces = confettiPieces.filter(p => p.alpha > 0.01);

  confettiPieces.forEach(p => {
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot * Math.PI / 180);
    confettiCtx.globalAlpha = p.alpha;
    confettiCtx.fillStyle = p.color;

    if (p.shape === 'circle') {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.r, 0, Math.PI * 2);
      confettiCtx.fill();
    } else if (p.shape === 'rect') {
      confettiCtx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
    } else {
      // star
      drawStar(confettiCtx, 0, 0, 5, p.r, p.r / 2);
      confettiCtx.fill();
    }

    confettiCtx.restore();

    p.x += p.dx; p.y += p.dy;
    p.rot += p.drot;
    p.dy += 0.04; // gravity

    // fade out near bottom
    if (p.y > confettiCanvas.height * 0.7) p.alpha -= 0.02;
  });

  confettiAnim = requestAnimationFrame(animateConfetti);
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
}

/* ──────────────────────────────────────────
   12. CAMERA BUTTON CLICK
   ────────────────────────────────────────── */
function cameraClick() {
  const btn = document.getElementById('cameraBtn');
  const res = document.getElementById('cameraResponse');

  // Button shake animation
  btn.style.animation = 'none';
  btn.offsetHeight; // reflow
  btn.style.animation = 'cameraShake 0.5s ease';

  // Add keyframes dynamically if not present
  if (!document.querySelector('#cameraShakeStyle')) {
    const style = document.createElement('style');
    style.id = 'cameraShakeStyle';
    style.textContent = `
      @keyframes cameraShake {
        0%,100% { transform: scale(1); }
        20%      { transform: scale(0.95) rotate(-2deg); }
        40%      { transform: scale(1.05) rotate(2deg); }
        60%      { transform: scale(0.97) rotate(-1deg); }
        80%      { transform: scale(1.02) rotate(1deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Show response
  res.classList.remove('hidden');
  res.style.display = 'block';

  // Bonus confetti
  spawnConfetti(120);

  // Scroll to show response
  setTimeout(() => {
    res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 200);
}

/* ──────────────────────────────────────────
   13. WINDOW RESIZE — confetti canvas
   ────────────────────────────────────────── */
window.addEventListener('resize', () => {
  if (confettiCanvas) {
    confettiCanvas.width  = confettiCanvas.offsetWidth  || window.innerWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight || window.innerHeight;
  }
}, { passive: true });

/* ──────────────────────────────────────────
   14. WISH NOTES — stagger reveal delays
   ────────────────────────────────────────── */
document.querySelectorAll('.wish-note').forEach((note, i) => {
  note.style.transitionDelay = (i * 100) + 'ms';
});

/* ──────────────────────────────────────────
   15. PARALLAX — subtle on desktop
   ────────────────────────────────────────── */
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const blobs = document.querySelectorAll('.ambient-blob');
    blobs.forEach((b, i) => {
      b.style.transform = `translateY(${y * (i % 2 === 0 ? 0.05 : -0.04)}px)`;
    });
  }, { passive: true });
}

/* ──────────────────────────────────────────
   16. MUSEUM FRAME — click easter egg
   ────────────────────────────────────────── */
document.querySelectorAll('.museum-frame').forEach(frame => {
  frame.addEventListener('click', () => {
    const icon = frame.querySelector('.camera-off-icon');
    const original = icon.textContent;
    icon.textContent = '😂';
    setTimeout(() => { icon.textContent = original; }, 600);
  });
});