const navLinks = Array.from(document.querySelectorAll('.site-header nav a[href^="#"]'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setCurrentNav = (sectionId) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if (navLinks.length && sections.length) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setCurrentNav(visible.target.id);
      }
    }, {
      rootMargin: "-28% 0px -55% 0px",
      threshold: [0.12, 0.28, 0.5]
    });

    sections.forEach((section) => observer.observe(section));
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setCurrentNav(link.getAttribute("href").slice(1)));
  });

  const hashTarget = window.location.hash && document.querySelector(window.location.hash);
  setCurrentNav(hashTarget ? hashTarget.id : sections[0].id);
}
