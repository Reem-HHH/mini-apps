// Select all scrollable app sections and navigation dots
const sections = Array.from(document.querySelectorAll('.snap-section'));
const dots = Array.from(document.querySelectorAll('.dot'));

// Smooth scroll when clicking dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const targetSection = document.querySelector(dot.dataset.target);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});


// Intersection Observer to highlight active dot and lazy-load iframes
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const section = entry.target;
    const index = Number(section.dataset.index) - 1;

    if (entry.isIntersecting) {
      // Highlight active dot
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');

      // Lazy-load iframes
      const iframes = section.querySelectorAll('iframe[data-src]');
      iframes.forEach(iframe => {
        if (!iframe.src && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.addEventListener('load', () => {
            iframe.style.opacity = '1';
          }, { once: true });
        }
      });
    }
  });
}, {
  root: document.querySelector('.snap-container'),
  threshold: 0.6
});

// Observe each section
sections.forEach(section => observer.observe(section));
