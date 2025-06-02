// Visitor counter using localStorage
document.addEventListener('DOMContentLoaded', function() {
  let count = parseInt(localStorage.getItem('visitorCount')) || 0;
  count++;
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitor-count').textContent = `This page has been visited ${count} times`;
});

// Show More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenProjects = document.getElementById('hiddenProjects');
  
  if (showMoreBtn && hiddenProjects) {
    showMoreBtn.addEventListener('click', function() {
      hiddenProjects.style.display = hiddenProjects.style.display === 'none' ? 'grid' : 'none';
      showMoreBtn.textContent = hiddenProjects.style.display === 'none' ? 'Show More Projects' : 'Show Less';
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