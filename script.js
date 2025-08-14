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

// Snowfall Background Animation
class Snowflake {
  constructor() {
    this.reset();
    this.opacity = Math.random() * 0.8 + 0.3;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.rotation = 0;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.swayAmount = Math.random() * 30 + 10;
    this.swayOffset = Math.random() * Math.PI * 2;
  }

  reset() {
    this.x = Math.random() * chainWidth;
    this.y = -10;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 1 + 0.5;
    this.originalX = this.x;
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;
    
    // Gentle swaying motion
    this.x = this.originalX + Math.sin(this.y * this.swaySpeed + this.swayOffset) * this.swayAmount;
    
    // Reset when snowflake goes off screen
    if (this.y > chainHeight + 10) {
      this.reset();
      this.originalX = this.x;
    }
    
    // Keep snowflakes within screen bounds
    if (this.x < -10) this.x = chainWidth + 10;
    if (this.x > chainWidth + 10) this.x = -10;
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 69, 19' : '78, 205, 196'; // Brown for light, teal for dark
    
    chainCtx.save();
    chainCtx.globalAlpha = this.opacity;
    chainCtx.translate(this.x, this.y);
    chainCtx.rotate(this.rotation);
    
    // Draw snowflake as a simple star/cross pattern
    chainCtx.strokeStyle = `rgba(${color}, ${this.opacity})`;
    chainCtx.lineWidth = 2.5;
    chainCtx.lineCap = 'round';
    
    const size = this.size;
    
    // Main cross
    chainCtx.beginPath();
    chainCtx.moveTo(-size, 0);
    chainCtx.lineTo(size, 0);
    chainCtx.moveTo(0, -size);
    chainCtx.lineTo(0, size);
    
    // Diagonal lines
    const diagSize = size * 0.7;
    chainCtx.moveTo(-diagSize, -diagSize);
    chainCtx.lineTo(diagSize, diagSize);
    chainCtx.moveTo(-diagSize, diagSize);
    chainCtx.lineTo(diagSize, -diagSize);
    
    chainCtx.stroke();
    
    // Add small center dot
    chainCtx.fillStyle = `rgba(${color}, ${this.opacity})`;
    chainCtx.beginPath();
    chainCtx.arc(0, 0, 2, 0, Math.PI * 2);
    chainCtx.fill();
    
    chainCtx.restore();
  }
}

// Create snowflakes
const snowflakes = [];
const maxSnowflakes = 80;

for (let i = 0; i < maxSnowflakes; i++) {
  snowflakes.push(new Snowflake());
}

// Stagger initial positions for natural effect
snowflakes.forEach((flake, index) => {
  flake.y = -Math.random() * chainHeight;
});

function animateSnowfall() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  
  snowflakes.forEach(flake => {
    flake.update();
    flake.draw();
  });
  
  requestAnimationFrame(animateSnowfall);
}

animateSnowfall();

// OPTION 2: Flowing Lines (Uncomment to use instead)
/*
const flowLines = [];
const maxLines = 8;

class FlowLine {
  constructor() {
    this.points = [];
    this.maxPoints = 50;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.x = Math.random() * chainWidth;
    this.y = Math.random() * chainHeight;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    
    this.points.push({ x: this.x, y: this.y });
    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }

    // Reset if off screen
    if (this.x < -100 || this.x > chainWidth + 100 || this.y < -100 || this.y > chainHeight + 100) {
      this.x = Math.random() * chainWidth;
      this.y = Math.random() * chainHeight;
      this.angle = Math.random() * Math.PI * 2;
      this.points = [];
    }
  }

  draw() {
    if (this.points.length < 2) return;
    
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 69, 19' : '78, 205, 196';
    
    chainCtx.beginPath();
    chainCtx.moveTo(this.points[0].x, this.points[0].y);
    
    for (let i = 1; i < this.points.length; i++) {
      const alpha = (i / this.points.length) * this.opacity;
      chainCtx.strokeStyle = `rgba(${color}, ${alpha})`;
      chainCtx.lineWidth = 2;
      chainCtx.lineTo(this.points[i].x, this.points[i].y);
      chainCtx.stroke();
      chainCtx.beginPath();
      chainCtx.moveTo(this.points[i].x, this.points[i].y);
    }
  }
}

for (let i = 0; i < maxLines; i++) {
  flowLines.push(new FlowLine());
}

function animateFlowLines() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  flowLines.forEach(line => {
    line.update();
    line.draw();
  });
  requestAnimationFrame(animateFlowLines);
}

animateFlowLines();
*/

// OPTION 3: Particle Field (Uncomment to use instead)
/*
const particles = [];
const maxParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * chainWidth;
    this.y = Math.random() * chainHeight;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.connections = [];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > chainWidth) this.vx *= -1;
    if (this.y < 0 || this.y > chainHeight) this.vy *= -1;
    
    this.x = Math.max(0, Math.min(chainWidth, this.x));
    this.y = Math.max(0, Math.min(chainHeight, this.y));
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 69, 19' : '78, 205, 196';
    
    chainCtx.globalAlpha = this.opacity;
    chainCtx.fillStyle = `rgba(${color}, ${this.opacity})`;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    chainCtx.fill();
  }

  drawConnections() {
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 69, 19' : '78, 205, 196';
    
    particles.forEach(other => {
      if (other === this) return;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        const opacity = (1 - distance / 120) * 0.2;
        chainCtx.globalAlpha = opacity;
        chainCtx.strokeStyle = `rgba(${color}, ${opacity})`;
        chainCtx.lineWidth = 1;
        chainCtx.beginPath();
        chainCtx.moveTo(this.x, this.y);
        chainCtx.lineTo(other.x, other.y);
        chainCtx.stroke();
      }
    });
  }
}

for (let i = 0; i < maxParticles; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  
  particles.forEach(particle => {
    particle.drawConnections();
  });
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

animateParticles();
*/

// OPTION 4: Minimal Dots (Uncomment to use instead)
/*
const dots = [];
const maxDots = 30;

class MinimalDot {
  constructor() {
    this.x = Math.random() * chainWidth;
    this.y = Math.random() * chainHeight;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 3 + 2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulsePhase += 0.02;

    // Wrap around edges
    if (this.x < 0) this.x = chainWidth;
    if (this.x > chainWidth) this.x = 0;
    if (this.y < 0) this.y = chainHeight;
    if (this.y > chainHeight) this.y = 0;
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? '139, 69, 19' : '78, 205, 196';
    const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
    
    chainCtx.globalAlpha = this.opacity * pulse;
    chainCtx.fillStyle = `rgba(${color}, ${this.opacity * pulse})`;
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
    chainCtx.fill();
  }
}

for (let i = 0; i < maxDots; i++) {
  dots.push(new MinimalDot());
}

function animateDots() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });
  requestAnimationFrame(animateDots);
}

animateDots();
*/

// Typing effect for position and slogan
document.addEventListener('DOMContentLoaded', function() {
  const position = document.querySelector('.position');
  const slogan = document.querySelector('.slogan');
  
  const positionText = 'Data Scientist | AI & ML';
   const sloganText = 'Always Learning. Always Building.';
  
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