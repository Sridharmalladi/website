// ============ THEME TOGGLE ============
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
  });
});

// ============ NAVIGATION ============
document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  function activateSection(item) {
    const targetSection = item.getAttribute('data-section');
    navItems.forEach(nav => nav.classList.remove('active'));
    contentSections.forEach(section => section.classList.remove('active'));
    item.classList.add('active');
    const section = document.getElementById(targetSection);
    section.classList.add('active');
    if (targetSection === 'skills') revealSkillBars(section);
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => activateSection(item));
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateSection(item); }
    });
  });

  function revealSkillBars(section) {
    const fills = section.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
      const target = fill.style.width || getComputedStyle(fill).width;
      fill.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        fill.style.width = '';
      }));
    });
  }
});

// ============ TYPING TAGLINE ============
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('pixel-tagline');
  if (!el) return;
  const text = 'building LLM systems, RAG pipelines, and full-stack AI tools';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    el.textContent = text;
    return;
  }

  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.textContent = '_';

  let i = 0;
  function typeNext() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      el.appendChild(cursor);
      i++;
      setTimeout(typeNext, 35);
    }
  }
  typeNext();
});

// ============ SOUND EFFECTS ============
document.addEventListener('DOMContentLoaded', function () {
  const soundToggle = document.getElementById('sound-toggle');
  const soundInfo = document.getElementById('sound-info');

  let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  let audioContext;

  if (soundEnabled) {
    soundToggle.classList.add('enabled');
    soundInfo.textContent = 'SFX ON';
  } else {
    soundInfo.textContent = 'SFX OFF';
  }

  function createSoundEffect(frequency, duration = 0.1, type = 'square') {
    if (!soundEnabled) return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // audio not supported, ignore
    }
  }

  const sounds = {
    click: () => createSoundEffect(800, 0.1),
    hover: () => createSoundEffect(600, 0.05),
    nav: () => createSoundEffect(1000, 0.08),
    success: () => {
      createSoundEffect(523, 0.1);
      setTimeout(() => createSoundEffect(659, 0.1), 100);
      setTimeout(() => createSoundEffect(784, 0.15), 200);
    }
  };

  function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    if (soundEnabled) {
      soundToggle.classList.add('enabled');
      soundInfo.textContent = 'SFX ON';
      sounds.success();
    } else {
      soundToggle.classList.remove('enabled');
      soundInfo.textContent = 'SFX OFF';
    }
  }

  soundToggle.addEventListener('click', toggleSound);
  soundToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSound(); }
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', sounds.hover);
    item.addEventListener('click', sounds.nav);
  });

  document.querySelectorAll('.pixel-icon').forEach(link => {
    link.addEventListener('mouseenter', sounds.hover);
    link.addEventListener('click', sounds.click);
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', sounds.hover);
    card.addEventListener('click', sounds.click);
  });

  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('mouseenter', sounds.hover);
    btn.addEventListener('click', sounds.click);
  });

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', sounds.nav);
});

// ============ PIXEL STARS ============
(function () {
  const canvas = document.getElementById('pixel-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function getThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light'
      ? ['#2c5530', '#8b4513', '#1e6091']
      : ['#e94560', '#f39c12', '#00d2d3', '#7bed9f', '#f368e0'];
  }

  class PixelStar {
    constructor() {
      this.reset(true);
    }
    reset(initial) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -10;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.4 + 0.08;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.01;
      this.twinklePhase = Math.random() * Math.PI * 2;
      const colors = getThemeColors();
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.y += this.speed;
      this.twinklePhase += this.twinkleSpeed;
      if (this.y > height + 10) this.reset(false);
    }
    draw() {
      const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
      ctx.globalAlpha = this.opacity * twinkle;
      ctx.fillStyle = this.color;
      ctx.fillRect(Math.floor(this.x), Math.floor(this.y), Math.floor(this.size), Math.floor(this.size));
    }
  }

  const stars = Array.from({ length: 80 }, () => new PixelStar());

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => s.draw());
    ctx.globalAlpha = 1;
  }

  if (reduceMotion) {
    drawStatic();
    return;
  }

  const fps = 18;
  const frameDelay = 1000 / fps;
  let lastFrame = 0;

  function animate(timestamp) {
    if (timestamp - lastFrame >= frameDelay) {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => { s.update(); s.draw(); });
      ctx.globalAlpha = 1;
      lastFrame = timestamp;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ============ PARALLAX MOUNTAINS ============
(function () {
  const canvas = document.getElementById('bg-mountains');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Three overlapping ranges, back to front
  const ranges = [
    { peakH: 0.28, baseY: 0.62, seed: 11, offset: 0, speed: 0.15, colorsDark: ['#241b3a', '#2d2350'], colorsLight: ['#c9b8e0', '#b3a0d1'] },
    { peakH: 0.36, baseY: 0.72, seed: 42, offset: 0, speed: 0.3, colorsDark: ['#1f2b4d', '#233461'], colorsLight: ['#9fb8d6', '#88a3c4'] },
    { peakH: 0.46, baseY: 0.85, seed: 77, offset: 0, speed: 0.5, colorsDark: ['#161b2e', '#1a2038'], colorsLight: ['#6b7f9e', '#5a6f8c'] }
  ];

  function pseudoRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function drawRange(range) {
    const rand = pseudoRandom(range.seed);
    const baseY = height * range.baseY;
    const peakH = height * range.peakH;
    const step = 60;
    const points = [];
    const totalWidth = width * 2 + step * 4;

    for (let x = -step * 2; x <= totalWidth; x += step) {
      const n = rand();
      points.push({ x, y: baseY - n * peakH });
    }

    const theme = document.documentElement.getAttribute('data-theme');
    const colors = theme === 'light' ? range.colorsLight : range.colorsDark;
    const grad = ctx.createLinearGradient(0, baseY - peakH, 0, height);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);

    ctx.save();
    ctx.translate(-((range.offset) % (width + step * 4)), 0);
    ctx.beginPath();
    ctx.moveTo(points[0].x, height);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawAll() {
    ctx.clearRect(0, 0, width, height);
    ranges.forEach(drawRange);
  }

  drawAll();

  if (reduceMotion) return;

  const fps = 15;
  const frameDelay = 1000 / fps;
  let lastFrame = 0;

  function animate(timestamp) {
    if (timestamp - lastFrame >= frameDelay) {
      const dt = (timestamp - lastFrame) / 1000 || 0;
      ranges.forEach(r => { r.offset += r.speed * dt * 10; });
      drawAll();
      lastFrame = timestamp;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ============ HUD LAST DEPLOY ============
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('hud-deploy');
  if (!el) return;
  const date = new Date(document.lastModified);
  const formatted = isNaN(date) ? '--' : date.toISOString().slice(0, 10);
  el.textContent = 'LAST DEPLOY: ' + formatted;
});
