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

// VERY EVIDENT Chain Reaction Background Animation
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
    this.vx = (Math.random() - 0.5) * 1.2; // Faster movement for more dynamic effect
    this.vy = (Math.random() - 0.5) * 1.2;
    this.size = Math.random() * 4 + 2; // Much larger particles
    this.life = 1;
    this.maxLife = 1;
    this.connections = [];
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.glowIntensity = Math.random() * 0.5 + 0.5; // Variable glow intensity
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.001; // Much slower fade for persistent visibility
    this.pulsePhase += 0.04; // More pronounced pulsing

    // Bounce off edges with energy
    if (this.x <= 0 || this.x >= chainWidth) {
      this.vx *= -0.9;
      this.vx += (Math.random() - 0.5) * 0.2;
    }
    if (this.y <= 0 || this.y >= chainHeight) {
      this.vy *= -0.9;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    // Keep within bounds
    this.x = Math.max(0, Math.min(chainWidth, this.x));
    this.y = Math.max(0, Math.min(chainHeight, this.y));
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    
    // Much more vibrant colors
    const baseColor = theme === 'light' ? 
      `rgba(139, 69, 19, ${0.8 * this.glowIntensity})` : 
      `rgba(78, 205, 196, ${0.8 * this.glowIntensity})`;
    
    const glowColor = theme === 'light' ? 
      `rgba(139, 69, 19, ${0.4 * this.glowIntensity})` : 
      `rgba(78, 205, 196, ${0.4 * this.glowIntensity})`;
    
    // Enhanced pulsing effect
    const pulse = Math.sin(this.pulsePhase) * 0.4 + 1;
    const alpha = this.life * 0.9 * pulse; // Much higher opacity
    
    // Main particle with strong visibility
    chainCtx.globalAlpha = alpha;
    chainCtx.fillStyle = baseColor;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
    chainCtx.fill();
    
    // Strong glow effect
    chainCtx.globalAlpha = alpha * 0.6;
    chainCtx.fillStyle = glowColor;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size * pulse * 2.5, 0, Math.PI * 2);
    chainCtx.fill();
    
    // Outer glow for maximum visibility
    chainCtx.globalAlpha = alpha * 0.3;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size * pulse * 4, 0, Math.PI * 2);
    chainCtx.fill();
  }

  drawConnections(particles) {
    const theme = document.documentElement.getAttribute('data-theme');
    
    particles.forEach(other => {
      if (other === this) return;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) { // Much larger connection distance
        const opacity = (1 - distance / 200) * this.life * other.life * 0.8; // Much stronger connections
        const lineWidth = (1 - distance / 200) * 3; // Thicker lines
        
        // Main connection line
        const lineColor = theme === 'light' ? 
          `rgba(139, 69, 19, ${opacity})` : 
          `rgba(78, 205, 196, ${opacity})`;
        
        chainCtx.globalAlpha = opacity;
        chainCtx.strokeStyle = lineColor;
        chainCtx.lineWidth = lineWidth;
        chainCtx.beginPath();
        chainCtx.moveTo(this.x, this.y);
        chainCtx.lineTo(other.x, other.y);
        chainCtx.stroke();
        
        // Glowing connection effect
        const glowGradient = chainCtx.createLinearGradient(this.x, this.y, other.x, other.y);
        glowGradient.addColorStop(0, theme === 'light' ? 
          `rgba(139, 69, 19, ${opacity * 0.8})` : 
          `rgba(78, 205, 196, ${opacity * 0.8})`);
        glowGradient.addColorStop(0.5, theme === 'light' ? 
          `rgba(139, 69, 19, ${opacity * 0.3})` : 
          `rgba(78, 205, 196, ${opacity * 0.3})`);
        glowGradient.addColorStop(1, theme === 'light' ? 
          `rgba(139, 69, 19, ${opacity * 0.8})` : 
          `rgba(78, 205, 196, ${opacity * 0.8})`);
        
        chainCtx.globalAlpha = opacity * 0.7;
        chainCtx.strokeStyle = glowGradient;
        chainCtx.lineWidth = lineWidth * 2;
        chainCtx.stroke();
        
        // Energy pulse effect along connections
        const pulsePosition = (Date.now() * 0.002 + distance * 0.01) % 1;
        const pulseX = this.x + (other.x - this.x) * pulsePosition;
        const pulseY = this.y + (other.y - this.y) * pulsePosition;
        
        chainCtx.globalAlpha = opacity * 0.8;
        chainCtx.fillStyle = theme === 'light' ? 
          `rgba(255, 165, 0, ${opacity})` : 
          `rgba(0, 255, 255, ${opacity})`;
        chainCtx.beginPath();
        chainCtx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        chainCtx.fill();
      }
    });
  }
}

const chainParticles = [];
const maxChainParticles = 100; // Significantly more particles

// Initialize chain particles
for (let i = 0; i < maxChainParticles; i++) {
  chainParticles.push(new ChainParticle(
    Math.random() * chainWidth,
    Math.random() * chainHeight
  ));
}

function updateChainParticles() {
  for (let i = chainParticles.length - 1; i >= 0; i--) {
    const particle = chainParticles[i];
    particle.update();
    
    if (particle.life <= 0) {
      chainParticles.splice(i, 1);
      // Add new particle to maintain count
      chainParticles.push(new ChainParticle(
        Math.random() * chainWidth,
        Math.random() * chainHeight
      ));
    }
  }
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