// Visitor counter using localStorage with persistence
document.addEventListener('DOMContentLoaded', function() {
  let count = parseInt(localStorage.getItem('visitorCount')) || 0;
  count++;
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitor-count').textContent = count;
});

// Show More functionality for projects
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenProjects = document.getElementById('hiddenProjects');
  
  if (showMoreBtn && hiddenProjects) {
    showMoreBtn.addEventListener('click', function() {
      if (hiddenProjects.classList.contains('hidden')) {
        hiddenProjects.classList.remove('hidden');
        showMoreBtn.textContent = 'Show Less';
      } else {
        hiddenProjects.classList.add('hidden');
        showMoreBtn.textContent = 'Show More';
      }
    });
  }
});

// Show More functionality for certifications
document.addEventListener('DOMContentLoaded', function() {
  const showMoreCertBtn = document.getElementById('showMoreCertBtn');
  const hiddenCerts = document.getElementById('hiddenCerts');
  
  if (showMoreCertBtn && hiddenCerts) {
    showMoreCertBtn.addEventListener('click', function() {
      if (hiddenCerts.classList.contains('hidden')) {
        hiddenCerts.classList.remove('hidden');
        showMoreCertBtn.textContent = 'Show Less';
      } else {
        hiddenCerts.classList.add('hidden');
        showMoreCertBtn.textContent = 'Show More';
      }
    });
  }
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