const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

const revealItems = document.querySelectorAll('.section, .card, .timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.classList.add('reveal');
  observer.observe(item);
});

const docTabs = document.querySelectorAll('.doc-tab');
const docFrame = document.getElementById('docFrame');
const docDownload = document.getElementById('docDownload');
const docCurrentLabel = document.getElementById('docCurrentLabel');

if (docTabs.length && docFrame && docDownload) {
  docTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const src = tab.getAttribute('data-src');
      const label = tab.getAttribute('data-label') || tab.textContent;

      docTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      docFrame.src = src;
      docFrame.title = `${label} preview`;
      docDownload.href = src;
      if (docCurrentLabel) {
        docCurrentLabel.textContent = `Viewing: ${label}`;
      }
    });
  });
}

const yearNode = document.querySelector('[data-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
