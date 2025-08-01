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

class ChainNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 3 + 2;
    this.energy = 0;
    this.maxEnergy = 100;
    this.connections = [];
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update() {
    // Gentle floating movement
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off edges with energy transfer
    if (this.x <= 20 || this.x >= chainWidth - 20) {
      this.vx *= -0.8;
      this.triggerReaction();
    }
    if (this.y <= 20 || this.y >= chainHeight - 20) {
      this.vy *= -0.8;
      this.triggerReaction();
    }

    // Keep within bounds
    this.x = Math.max(20, Math.min(chainWidth - 20, this.x));
    this.y = Math.max(20, Math.min(chainHeight - 20, this.y));

    // Energy decay
    if (this.energy > 0) {
      this.energy -= 2;
    }

    // Update pulse phase
    this.pulsePhase += 0.05;
  }

  triggerReaction() {
    this.energy = this.maxEnergy;
    // Spread energy to connected nodes
    this.connections.forEach(node => {
      if (node.energy < 50) {
        setTimeout(() => {
          node.energy = Math.max(node.energy, 70);
        }, Math.random() * 200);
      }
    });
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    const baseColor = theme === 'light' ? [139, 69, 19] : [78, 205, 196];
    
    // Calculate energy-based intensity
    const energyRatio = this.energy / this.maxEnergy;
    const pulseIntensity = Math.sin(this.pulsePhase) * 0.3 + 0.7;
    const intensity = Math.max(0.3, energyRatio * pulseIntensity);
    
    // Draw node with energy glow
    chainCtx.globalAlpha = intensity;
    chainCtx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${intensity})`;
    
    // Glow effect for high energy nodes
    if (this.energy > 30) {
      chainCtx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.8)`;
      chainCtx.shadowBlur = this.energy / 10;
    } else {
      chainCtx.shadowBlur = 0;
    }
    
    chainCtx.beginPath();
    chainCtx.arc(this.x, this.y, this.size + (energyRatio * 2), 0, Math.PI * 2);
    chainCtx.fill();
    
    // Reset shadow
    chainCtx.shadowBlur = 0;
  }

  drawConnections() {
    const theme = document.documentElement.getAttribute('data-theme');
    const baseColor = theme === 'light' ? [139, 69, 19] : [78, 205, 196];
    
    this.connections.forEach(other => {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        // Energy-based connection intensity
        const energyFlow = (this.energy + other.energy) / (this.maxEnergy * 2);
        const baseOpacity = (1 - distance / 150) * 0.4;
        const opacity = baseOpacity + (energyFlow * 0.6);
        
        chainCtx.globalAlpha = Math.min(opacity, 0.8);
        chainCtx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`;
        chainCtx.lineWidth = 1 + (energyFlow * 2);
        
        // Animated connection for high energy
        if (energyFlow > 0.3) {
          chainCtx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.5)`;
          chainCtx.shadowBlur = 3;
        }
        
        chainCtx.beginPath();
        chainCtx.moveTo(this.x, this.y);
        chainCtx.lineTo(other.x, other.y);
        chainCtx.stroke();
        
        chainCtx.shadowBlur = 0;
      }
    });
  }
}

const chainNodes = [];
const maxChainNodes = 25;

// Initialize chain nodes
for (let i = 0; i < maxChainNodes; i++) {
  chainNodes.push(new ChainNode(
    Math.random() * chainWidth,
    Math.random() * chainHeight
  ));
}

// Create connections between nearby nodes
chainNodes.forEach(node => {
  chainNodes.forEach(other => {
    if (node !== other) {
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200 && node.connections.length < 4) {
        node.connections.push(other);
      }
    }
  });
});

// Random energy triggers for chain reactions
setInterval(() => {
  const randomNode = chainNodes[Math.floor(Math.random() * chainNodes.length)];
  randomNode.triggerReaction();
}, 3000 + Math.random() * 2000);

function updateChainNodes() {
  chainNodes.forEach(node => {
    node.update();
  });
}

function drawChainNodes() {
  chainCtx.clearRect(0, 0, chainWidth, chainHeight);
  
  // Draw connections first
  chainNodes.forEach(node => {
    node.drawConnections();
  });
  
  // Draw nodes on top
  chainNodes.forEach(node => {
    node.draw();
  });
}

function animateChain() {
  updateChainNodes();
  drawChainNodes();
  requestAnimationFrame(animateChain);
}

animateChain();

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