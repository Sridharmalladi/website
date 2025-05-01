// Scrollspy active class
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

// Recommendation Tab Switcher
const tabButtons = document.querySelectorAll('.tab-button');
const recommendationSections = document.querySelectorAll('.recommendation-section');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    recommendationSections.forEach(sec => sec.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Email copy functionality
function copyEmail() {
  const email = 'sridharmalladi@gmail.com';
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      const toast = document.getElementById('emailToast');
      toast.textContent = "Copied!";
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }).catch(err => {
      alert('Failed to copy email. Please copy manually.');
    });
  } else {
    // fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      const toast = document.getElementById('emailToast');
      toast.textContent = "Copied!";
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    } catch (err) {
      alert('Failed to copy email. Please copy manually.');
    }
    document.body.removeChild(textarea);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(e) {
    const emailBtn = e.target.closest('.email-button');
    if (emailBtn && (e.target.tagName === 'IMG' || e.target.classList.contains('email-button'))) {
      e.preventDefault();
      copyEmail();
    }
  });
});

// Show More Projects functionality
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (showMoreBtn && projectsGrid) {
    // Store the extra projects as HTML
    const moreProjects = `
      <div class="project-card">
        <img src="images/projects/projectimg5.png" alt="Battery Degradation Analysis Project">
        <div class="project-content">
          <h3>Battery Degradation Analysis</h3>
          <p>Models and predicts lithium-ion battery degradation under various operating conditions to improve lifespan and performance.</p>
          <div class="tech-stack">Python, NumPy, Pandas, SciPy, Scikit-learn, Matplotlib, Seaborn, Jupyter</div>
          <a href="https://github.com/Sridharmalladi/BatteryDegradationAnalysis" target="_blank" rel="noopener">GitHub Repo →</a>
        </div>
      </div>
      <div class="project-card">
        <img src="images/projects/projectimg6.png" alt="Document Analysis System using LangChain and Hugging Face">
        <div class="project-content">
          <h3>Document Analysis System using LangChain and Hugging Face</h3>
          <p>Advanced document analysis using LLMs and state-of-the-art NLP models.</p>
          <div class="tech-stack">Python, LangChain, Hugging Face Transformers, DistilBERT, PyTorch, Pandas, python-magic</div>
          <a href="https://github.com/Sridharmalladi/LLMBased_DocAnalysis" target="_blank" rel="noopener">GitHub Repo →</a>
        </div>
      </div>
      <div class="project-card">
        <img src="images/projects/projectimg7.png" alt="Machine Learning Experiments Portfolio">
        <div class="project-content">
          <h3>Machine Learning Experiments Portfolio</h3>
          <p>A collection of diverse machine learning experiments and prototypes.</p>
          <div class="tech-stack">Python, Jupyter, Scikit-learn, Matplotlib, Pandas, NumPy</div>
          <a href="https://github.com/Sridharmalladi/Machine-Learning-Experiments" target="_blank" rel="noopener">GitHub Repo →</a>
        </div>
      </div>
      <div class="project-card">
        <img src="images/projects/projectimg8.png" alt="Walmart Customer Behavioral Analysis">
        <div class="project-content">
          <h3>Walmart Customer Behavioral Analysis</h3>
          <p>Behavioral segmentation of Walmart shoppers based on promotional response and external seasonal factors.</p>
          <div class="tech-stack">Tableau, Apache Airflow, EDA Python, Weather API, Data Modeling</div>
          <a href="https://public.tableau.com/app/profile/shridhar.malladi/viz/WalmartSaleAnalysisDashboard_17374927096300/WalmartProfitAnalysisDashboard2" target="_blank" rel="noopener">Tableau Dashboard →</a>
        </div>
      </div>
    `;
    
    showMoreBtn.addEventListener('click', function() {
      projectsGrid.insertAdjacentHTML('beforeend', moreProjects);
      showMoreBtn.style.display = 'none';
    });
  }
});
