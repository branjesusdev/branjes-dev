import Lenis from "lenis";

let lenis: Lenis | null = null;
let animationFrame: number;

/**
 * Initializes Lenis smooth-scrolling for the whole page, driven by its own
 * requestAnimationFrame loop (rather than the `autoRaf` option) so it keeps
 * ticking in lockstep with the rest of the page's animations.
 *
 * Runs regardless of the visitor's `prefers-reduced-motion` setting: this is
 * a deliberate choice for this portfolio (smooth scrolling is treated as a
 * core part of the site's feel, not a decorative extra).
 */
export const initSmoothScroll = () => {
  if (lenis) return lenis;

  lenis = new Lenis();

  const raf = (time: number) => {
    lenis?.raf(time);
    animationFrame = requestAnimationFrame(raf);
  };

  animationFrame = requestAnimationFrame(raf);

  return lenis;
};

export const getLenisInstance = () => lenis;

export const destroySmoothScroll = () => {
  lenis?.destroy();
  cancelAnimationFrame(animationFrame);
  lenis = null;
};
