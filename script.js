const sections = [...document.querySelectorAll('.snap-section')];
const dots = [...document.querySelectorAll('.dot')];

dots.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const sec = entry.target;
    const idx = Number(sec.dataset.index) - 1;
    if (entry.isIntersecting) {
      dots.forEach(d => d.classList.remove('active'));
      if (dots[idx]) dots[idx].classList.add('active');
      sec.querySelectorAll('iframe[data-src]').forEach((el) => {
        if (!el.src && el.dataset.src) {
          el.src = el.dataset.src;
          el.addEventListener('load', () => el.style.opacity = 1, { once: true });
        }
      });
    }
  });
}, { root: document.querySelector('.snap-container'), threshold: 0.6 });

sections.forEach(sec => io.observe(sec));
