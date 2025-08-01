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

// Lightning/Thunder Background Animation
class Lightning {
  constructor() {
    this.reset();
    this.opacity = 0;
    this.fadeSpeed = 0.02;
    this.glowIntensity = 0;
  }

  reset() {
    this.startX = Math.random() * chainWidth;
    this.startY = 0;
    this.endX = this.startX + (Math.random() - 0.5) * 400;
    this.endY = chainHeight;
    this.branches = [];
    this.active = false;
    this.life = 0;
    this.maxLife = Math.random() * 30 + 20;
    this.thickness = Math.random() * 3 + 2;
    
    // Generate lightning path with jagged segments
    this.segments = [];
    const numSegments = Math.floor(Math.random() * 8) + 6;
    
    for (let i = 0; i <= numSegments; i++) {
      const progress = i / numSegments;
      const x = this.startX + (this.endX - this.startX) * progress + (Math.random() - 0.5) * 100;
      const y = this.startY + (this.endY - this.startY) * progress;
      this.segments.push({ x, y });
    }
    
    // Create branches
    if (Math.random() < 0.7) {
      const branchPoint = Math.floor(Math.random() * (this.segments.length - 2)) + 1;
      const branch = {
        startX: this.segments[branchPoint].x,
        startY: this.segments[branchPoint].y,
        endX: this.segments[branchPoint].x + (Math.random() - 0.5) * 200,
        endY: this.segments[branchPoint].y + Math.random() * 150 + 50,
        segments: []
      };
      
      const branchSegments = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i <= branchSegments; i++) {
        const progress = i / branchSegments;
        const x = branch.startX + (branch.endX - branch.startX) * progress + (Math.random() - 0.5) * 50;
        const y = branch.startY + (branch.endY - branch.startY) * progress;
        branch.segments.push({ x, y });
      }
      
      this.branches.push(branch);
    }
  }

  trigger() {
    this.active = true;
    this.life = 0;
    this.opacity = 1;
    this.glowIntensity = 1;
  }

  update() {
    if (this.active) {
      this.life++;
      if (this.life >= this.maxLife) {
        this.active = false;
        this.opacity = 0;
        this.glowIntensity = 0;
      } else {
        // Flickering effect
        if (Math.random() < 0.3) {
          this.opacity = Math.random() * 0.8 + 0.2;
          this.glowIntensity = Math.random() * 0.8 + 0.2;
        }
      }
    }
    
    // Fade out
    if (!this.active && this.opacity > 0) {
      this.opacity -= this.fadeSpeed;
      this.glowIntensity -= this.fadeSpeed;
      if (this.opacity <= 0) {
        this.reset();
      }
    }
  }

  draw() {
    if (this.opacity <= 0) return;
    
    const theme = document.documentElement.getAttribute('data-theme');
    const baseColor = theme === 'light' ? '139, 69, 19' : '0, 255, 127'; // Brown for light, glowy green for dark
    
    chainCtx.save();
    chainCtx.globalAlpha = this.opacity;
    
    // Draw glow effect
    if (this.glowIntensity > 0) {
      chainCtx.shadowColor = `rgba(${baseColor}, ${this.glowIntensity})`;
      chainCtx.shadowBlur = 20;
      chainCtx.shadowOffsetX = 0;
      chainCtx.shadowOffsetY = 0;
    }
    
    // Draw main lightning bolt
    chainCtx.strokeStyle = `rgba(${baseColor}, ${this.opacity})`;
    chainCtx.lineWidth = this.thickness;
    chainCtx.lineCap = 'round';
    chainCtx.lineJoin = 'round';
    
    chainCtx.beginPath();
    if (this.segments.length > 0) {
      chainCtx.moveTo(this.segments[0].x, this.segments[0].y);
      for (let i = 1; i < this.segments.length; i++) {
        chainCtx.lineTo(this.segments[i].x, this.segments[i].y);
      }
    }
    chainCtx.stroke();
    
    // Draw branches
    this.branches.forEach(branch => {
      chainCtx.lineWidth = this.thickness * 0.6;
      chainCtx.beginPath();
      if (branch.segments.length > 0) {
        chainCtx.moveTo(branch.segments[0].x, branch.segments[0].y);
        for (let i = 1; i < branch.segments.length; i++) {
          chainCtx.lineTo(branch.segments[i].x, branch.segments[i].y);
        }
      }
      chainCtx.stroke();
    });
    
    chainCtx.restore();
  }
}

// Ambient electrical particles
class ElectricParticle {
  constructor() {
    this.x = Math.random() * chainWidth;
    this.y = Math.random() * chainHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.3 + 0.1;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulsePhase += this.pulseSpeed;

    // Wrap around edges
    if (this.x < 0) this.x = chainWidth;
    if (this.x > chainWidth) this.x = 0;
    if (this.y < 0) this.y = chainHeight;
    if (this.y > chainHeight) this.y = 0;
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const baseColor = theme === 'light' ? '139, 69, 19' : '0, 255, 127';
    const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
    const currentOpacity = this.opacity * pulse;
    
    chainCtx.save();
    chainCtx.globalAlpha = currentOpacity;
    chainCtx.fillStyle = `rgba(${baseColor}, ${currentOpacity})`;
    chainCtx.shadowColor = `rgba(${baseColor}, ${currentOpacity})`;
    chainCtx.shadowBlur = 8;
    
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
    chainCtx.fill();
    chainCtx.restore();
  }
}

// Initialize lightning and particles
const lightningBolts = [];
const electricParticles = [];

// Create lightning bolts
for (let i = 0; i < 3; i++) {
  lightningBolts.push(new Lightning());
}

// Create ambient particles
for (let i = 0; i < 25; i++) {
  electricParticles.push(new ElectricParticle());
}

// Lightning trigger system
let lastLightningTime = 0;
const minLightningInterval = 2000; // Minimum 2 seconds between lightning
const maxLightningInterval = 6000; // Maximum 6 seconds between lightning
let nextLightningTime = Date.now() + Math.random() * 4000 + 2000;

function triggerRandomLightning() {
  const now = Date.now();
  if (now >= nextLightningTime) {
    // Find an inactive lightning bolt to trigger
    const inactiveBolts = lightningBolts.filter(bolt => !bolt.active);
    if (inactiveBolts.length > 0) {
      const randomBolt = inactiveBolts[Math.floor(Math.random() * inactiveBolts.length)];
      randomBolt.trigger();
      
      // Sometimes trigger multiple bolts for a storm effect
      if (Math.random() < 0.3 && inactiveBolts.length > 1) {
        setTimeout(() => {
          const secondBolt = inactiveBolts.filter(b => b !== randomBolt)[0];
          if (secondBolt && !secondBolt.active) {
            secondBolt.trigger();
          }
        }, Math.random() * 200 + 50);
      }
    }
    
    // Set next lightning time
    nextLightningTime = now + Math.random() * (maxLightningInterval - minLightningInterval) + minLightningInterval;
  }
}

function animateLightning() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  
  // Update and draw ambient particles
  electricParticles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  // Update and draw lightning bolts
  lightningBolts.forEach(bolt => {
    bolt.update();
    bolt.draw();
  });
  
  // Trigger random lightning
  triggerRandomLightning();
  
  requestAnimationFrame(animateLightning);
}

animateLightning();

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