/**
 * One-shot reveal for every `.animation-timeline` element on the page.
 *
 * This used to be a native `animation-timeline: view()` CSS scroll-timeline,
 * but that keeps re-evaluating on every scroll frame for the element's whole
 * lifetime, which fights with Lenis (which moves the real scroll position via
 * script, in small steps, every frame). Triggering the same animation once
 * via IntersectionObserver gives the identical visual result without any
 * ongoing scroll-timeline work.
 */
export const initScrollReveal = () => {
  const elements = document.querySelectorAll<HTMLElement>(".animation-timeline");
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  elements.forEach((el) => observer.observe(el));
};
