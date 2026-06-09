// Smooth little reveal animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .hero-text, .hero-card").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});