// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set default theme to dark for pixel aesthetic
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // Remove active class from all nav items and sections
      navItems.forEach(nav => nav.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked nav item and corresponding section
      this.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
    });
  });
});

// Pixel Stars Background Animation
const canvas = document.getElementById('pixel-stars');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class PixelStar {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.color = this.getThemeColor();
  }
  
  getThemeColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    const colors = theme === 'light' 
      ? ['#2c5530', '#8b4513', '#1e6091']
      : ['#e94560', '#f39c12', '#00d2d3'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  update() {
    this.y += this.speed;
    this.twinklePhase += this.twinkleSpeed;
    
    if (this.y > height + 10) {
      this.y = -10;
      this.x = Math.random() * width;
      this.color = this.getThemeColor();
    }
  }
  
  draw() {
    const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
    ctx.globalAlpha = this.opacity * twinkle;
    ctx.fillStyle = this.color;
    
    // Draw pixel star as small square
    ctx.fillRect(
      Math.floor(this.x), 
      Math.floor(this.y), 
      Math.floor(this.size), 
      Math.floor(this.size)
    );
    
    // Add glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 5;
    ctx.fillRect(
      Math.floor(this.x), 
      Math.floor(this.y), 
      Math.floor(this.size), 
      Math.floor(this.size)
    );
    ctx.shadowBlur = 0;
  }
}

// Create pixel stars
const pixelStars = [];
const maxStars = 50;

for (let i = 0; i < maxStars; i++) {
  pixelStars.push(new PixelStar());
}

// Stagger initial positions
pixelStars.forEach((star, index) => {
  star.y = -Math.random() * height;
});

function animatePixelStars() {
  ctx.clearRect(0, 0, width, height);
  
  pixelStars.forEach(star => {
    star.update();
    star.draw();
  });
  
  requestAnimationFrame(animatePixelStars);
}

animatePixelStars();

// Glitch effect for text
function addGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  glitchElements.forEach(element => {
    setInterval(() => {
      if (Math.random() < 0.1) {
        element.style.textShadow = `
          ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff00ff,
          ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #00ffff,
          ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ffff00
        `;
        
        setTimeout(() => {
          element.style.textShadow = 'var(--shadow-glow)';
        }, 100);
      }
    }, 200);
  });
}

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', addGlitchEffect);

// Music Control System
document.addEventListener('DOMContentLoaded', function() {
  const musicToggle = document.getElementById('music-toggle');
  const trackInfo = document.getElementById('track-info');
  const bgMusic = document.getElementById('bgMusic');
  
  // Create 8-bit style audio context for better control
  let isPlaying = false;
  let currentTrack = 0;
  
  // 8-bit style tracks (using Web Audio API to create retro sounds)
  const tracks = [
    { name: '8-BIT BEATS', frequency: 440 },
    { name: 'PIXEL PULSE', frequency: 523 },
    { name: 'RETRO WAVE', frequency: 659 },
    { name: 'CYBER LOOP', frequency: 784 }
  ];
  
  // Create simple 8-bit style audio using Web Audio API
  let audioContext;
  let oscillator;
  let gainNode;
  
  function createRetroAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Create oscillator for 8-bit sound
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set 8-bit style parameters
    oscillator.type = 'square'; // Classic 8-bit square wave
    oscillator.frequency.setValueAtTime(tracks[currentTrack].frequency, audioContext.currentTime);
    
    // Create a simple melody pattern
    const melody = [1, 1.25, 1.5, 1.25, 1, 0.75, 1, 1.25];
    let noteIndex = 0;
    
    function playMelody() {
      if (isPlaying && oscillator) {
        const baseFreq = tracks[currentTrack].frequency;
        oscillator.frequency.setValueAtTime(
          baseFreq * melody[noteIndex], 
          audioContext.currentTime
        );
        noteIndex = (noteIndex + 1) % melody.length;
      }
    }
    
    // Set volume (very low for background)
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    
    // Start the oscillator
    oscillator.start();
    
    // Create melody rhythm
    setInterval(playMelody, 400);
    
    return oscillator;
  }
  
  function startMusic() {
    try {
      createRetroAudio();
      isPlaying = true;
      musicToggle.classList.add('playing');
      trackInfo.textContent = tracks[currentTrack].name;
      localStorage.setItem('musicEnabled', 'true');
    } catch (error) {
      console.log('Audio not supported');
    }
  }
  
  function stopMusic() {
    if (oscillator) {
      oscillator.stop();
      oscillator = null;
    }
    isPlaying = false;
    musicToggle.classList.remove('playing');
    trackInfo.textContent = '8-BIT BEATS';
    localStorage.setItem('musicEnabled', 'false');
  }
  
  function nextTrack() {
    if (isPlaying) {
      stopMusic();
      currentTrack = (currentTrack + 1) % tracks.length;
      setTimeout(startMusic, 100);
    }
  }
  
  // Music toggle click
  musicToggle.addEventListener('click', function() {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
  
  // Double click to change track
  musicToggle.addEventListener('dblclick', function() {
    nextTrack();
  });
  
  // Load saved music preference
  const musicEnabled = localStorage.getItem('musicEnabled');
  if (musicEnabled === 'true') {
    // Delay auto-start to respect browser policies
    setTimeout(() => {
      startMusic();
    }, 1000);
  }
  
  // Update track info on hover
  musicToggle.addEventListener('mouseenter', function() {
    if (!isPlaying) {
      trackInfo.style.opacity = '0.7';
      trackInfo.textContent = 'CLICK TO PLAY';
    }
  });
  
  musicToggle.addEventListener('mouseleave', function() {
    if (!isPlaying) {
      trackInfo.style.opacity = '0';
      trackInfo.textContent = '8-BIT BEATS';
    }
  });
});

// Pixel icon hover effects
document.addEventListener('DOMContentLoaded', function() {
  const pixelIcons = document.querySelectorAll('.pixel-icon');
  
  pixelIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const pixels = this.querySelectorAll('.p.active');
      pixels.forEach((pixel, index) => {
        setTimeout(() => {
          pixel.style.boxShadow = '0 0 10px var(--pixel-active)';
        }, index * 50);
      });
    });
    
    icon.addEventListener('mouseleave', function() {
      const pixels = this.querySelectorAll('.p.active');
      pixels.forEach(pixel => {
        pixel.style.boxShadow = '0 0 5px var(--pixel-active)';
      });
    });
  });
});

// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
  const terminalLines = document.querySelectorAll('.terminal-line');
  let delay = 0;
  
  terminalLines.forEach((line, index) => {
    if (index < terminalLines.length - 1) { // Don't animate the cursor line
      setTimeout(() => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateX(0)';
        }, 100);
      }, delay);
      delay += 500;
    }
  });
});

// Skill chip animation
document.addEventListener('DOMContentLoaded', function() {
  const skillChips = document.querySelectorAll('.skill-chip');
  
  skillChips.forEach((chip, index) => {
    chip.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    chip.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Random pulse animation
    setInterval(() => {
      if (Math.random() < 0.05) {
        chip.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
          chip.style.animation = '';
        }, 500);
      }
    }, 1000);
  });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Project card 3D effect
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.style.transform = `
        translateY(-10px) 
        scale(1.05) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
  });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 10000);
    
    konamiCode = [];
  }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);