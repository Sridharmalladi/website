// Visitor counter using localStorage with persistence
document.addEventListener('DOMContentLoaded', function() {
  let count = parseInt(localStorage.getItem('visitorCount')) || 0;
  count++;
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitor-count').textContent = count;
});

// Scrollspy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});