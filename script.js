// Theme initialization
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set default theme to light
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  themeToggle.checked = false;
  
  themeToggle.addEventListener('change', function(e) {
    if (!e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
});

// Email copy functionality
document.addEventListener('DOMContentLoaded', function() {
  const emailButton = document.querySelector('.email-copy');
  const toast = document.getElementById('toast');
  
  emailButton.addEventListener('click', function(e) {
    e.preventDefault();
    const email = this.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied!');
    });
  });
  
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});

// Show More functionality for projects and certifications
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenProjects = document.getElementById('hiddenProjects');
  
  if (showMoreBtn && hiddenProjects) {
    showMoreBtn.addEventListener('click', function() {
      hiddenProjects.classList.toggle('hidden');
      this.textContent = hiddenProjects.classList.contains('hidden') ? 'Show More' : 'Show Less';
    });
  }
  
  const showMoreCertBtn = document.getElementById('showMoreCertBtn');
  const hiddenCerts = document.getElementById('hiddenCerts');
  
  if (showMoreCertBtn && hiddenCerts) {
    showMoreCertBtn.addEventListener('click', function() {
      hiddenCerts.classList.toggle('hidden');
      this.textContent = hiddenCerts.classList.contains('hidden') ? 'Show More' : 'Show Less';
    });
  }
});

// Mouse trail effect with sparkles
const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const mousePos = { x: width / 2, y: height / 2 };

document.addEventListener('mousemove', (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  addParticles(3, mousePos.x, mousePos.y);
});

function addParticles(count, x, y) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      life: 1,
      color: document.documentElement.getAttribute('data-theme') === 'light' ? '#8B4513' : '#4ecdc4'
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.015;
    
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(p => {
    ctx.globalAlpha = p.life * 0.8;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

animate();

// Chain Reaction Background Animation
const chainCanvas = document.getElementById('chain-background');
const chainCtx = chainCanvas.getContext('2d');

let chainWidth = chainCanvas.width = window.innerWidth;
let chainHeight = chainCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  chainWidth = chainCanvas.width = window.innerWidth;
  chainHeight = chainCanvas.height = window.innerHeight;
});

class ChainParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.life = 1; // Always at full life
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // Removed life decay - particles stay at full opacity

    // Bounce off edges
    if (this.x <= 0 || this.x >= chainWidth) this.vx *= -1;
    if (this.y <= 0 || this.y >= chainHeight) this.vy *= -1;

    // Keep within bounds
    this.x = Math.max(0, Math.min(chainWidth, this.x));
    this.y = Math.max(0, Math.min(chainHeight, this.y));
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    // Increased brightness significantly for both themes
    const color = theme === 'light' ? 'rgba(139, 69, 19, 0.7)' : 'rgba(78, 205, 196, 0.8)';
    
    chainCtx.globalAlpha = theme === 'light' ? 0.8 : 0.9; // Much brighter
    chainCtx.fillStyle = color;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    chainCtx.fill();
  }

  drawConnections(particles) {
    const theme = document.documentElement.getAttribute('data-theme');
    // Increased brightness for connection lines
    const lineColor = theme === 'light' ? 'rgba(139, 69, 19, 0.5)' : 'rgba(78, 205, 196, 0.6)';
    
    particles.forEach(other => {
      if (other === this) return;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 180) {
        // Increased opacity for brighter connections
        const opacity = (1 - distance / 180) * (theme === 'light' ? 0.6 : 0.7);
        chainCtx.globalAlpha = opacity;
        chainCtx.strokeStyle = lineColor;
        chainCtx.lineWidth = 1;
        chainCtx.beginPath();
        chainCtx.moveTo(this.x, this.y);
        chainCtx.lineTo(other.x, other.y);
        chainCtx.stroke();
      }
    });
  }
}

const chainParticles = [];
const maxChainParticles = 40; // Reduced from 80 to 40 dots

// Initialize chain particles
for (let i = 0; i < maxChainParticles; i++) {
  chainParticles.push(new ChainParticle(
    Math.random() * chainWidth,
    Math.random() * chainHeight
  ));
}

function updateChainParticles() {
  // Simply update all particles without removing any
  chainParticles.forEach(particle => {
    particle.update();
  });
}

function drawChainParticles() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  
  // Draw connections first
  chainParticles.forEach(particle => {
    particle.drawConnections(chainParticles);
  });
  
  // Draw particles on top
  chainParticles.forEach(particle => {
    particle.draw();
  });
}

function animateChain() {
  updateChainParticles();
  drawChainParticles();
  requestAnimationFrame(animateChain);
}

animateChain();

// Typing effect for position and slogan
document.addEventListener('DOMContentLoaded', function() {
  const position = document.querySelector('.position');
  const slogan = document.querySelector('.slogan');
  
  const positionText = 'Data Scientist | AI & ML';
  const sloganText = 'Always Learning. Always Building!';
  
  let positionIndex = 0;
  let sloganIndex = 0;
  let isTypingPosition = true;
  let isTypingSlogan = false;
  let pauseTime = 0;
  
  function typeEffect() {
    if (isTypingPosition && positionIndex < positionText.length) {
      position.textContent = positionText.substring(0, positionIndex + 1);
      positionIndex++;
      setTimeout(typeEffect, 100);
    } else if (isTypingPosition && positionIndex >= positionText.length) {
      isTypingPosition = false;
      pauseTime = 0;
      setTimeout(() => {
        isTypingSlogan = true;
        typeEffect();
      }, 500);
    } else if (isTypingSlogan && sloganIndex < sloganText.length) {
      slogan.textContent = sloganText.substring(0, sloganIndex + 1);
      sloganIndex++;
      setTimeout(typeEffect, 100);
    } else if (isTypingSlogan && sloganIndex >= sloganText.length) {
      isTypingSlogan = false;
      setTimeout(() => {
        // Wait 5 seconds then restart
        setTimeout(() => {
          positionIndex = 0;
          sloganIndex = 0;
          position.textContent = '';
          slogan.textContent = '';
          isTypingPosition = true;
          typeEffect();
        }, 5000);
      }, 100);
    }
  }
  
  // Clear initial content and start typing
  position.textContent = '';
  slogan.textContent = '';
  typeEffect();
});