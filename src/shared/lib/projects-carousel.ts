import { getLenisInstance } from "./smooth-scroll";

const RESIZE_DEBOUNCE_MS = 200;

/**
 * Pins the Projects section for the width of its card track and translates
 * the track horizontally in lockstep with scroll progress, giving a
 * scroll-jacked "carousel" effect (cards slide by as the user keeps
 * scrolling down, instead of the page scrolling past a static grid).
 *
 * Driven by the native `scroll` event (Lenis mirrors its animated scroll
 * position onto the real `window.scrollY` every frame, so this alone is
 * enough) plus, opportunistically, Lenis's own `scroll` event for the exact
 * sub-pixel value it's animating that frame.
 *
 * Runs regardless of `prefers-reduced-motion`, matching the smooth-scroll
 * setup: this carousel is treated as core to the site's feel, not a
 * decorative extra.
 */
export const initProjectsCarousel = () => {
  const pin = document.querySelector<HTMLElement>("[data-carousel-pin]");
  const viewport = document.querySelector<HTMLElement>(
    "[data-carousel-viewport]",
  );
  const track = document.querySelector<HTMLElement>("[data-carousel-track]");

  if (!pin || !viewport || !track) return;

  let distance = 0;
  let offsetStart = 0;

  const measure = () => {
    // `viewport.clientWidth` includes its own inline padding, but that
    // padding isn't visible card real-estate — it's the breathing room
    // reserved on each side. Skipping the subtraction here undershoots the
    // scroll distance by exactly that padding, leaving the last card's
    // trailing edge clipped by `overflow: hidden` at full scroll.
    const style = getComputedStyle(viewport);
    const visibleWidth =
      viewport.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);

    distance = Math.max(track.scrollWidth - visibleWidth, 0);

    // Read `pin`'s current position BEFORE writing its height below.
    // Setting an element's own height doesn't move its own top edge, so
    // this read doesn't need the write to happen first — but doing the
    // write first would force a synchronous layout recalculation just to
    // serve this read (a "forced reflow"), instead of letting the browser
    // batch it into its normal paint cycle.
    offsetStart = pin.getBoundingClientRect().top + window.scrollY;
    pin.style.height = `calc(100vh + ${distance}px)`;
  };

  const render = (scroll: number) => {
    if (distance === 0) return;
    const progress = Math.min(
      Math.max((scroll - offsetStart) / distance, 0),
      1,
    );

    track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
  };

  measure();
  render(window.scrollY);

  // Lenis mirrors its animated scroll value onto the real `window.scrollY`
  // every frame, so the native listener alone is already correct. Also
  // hooking Lenis's own `scroll` event (when it's ready) avoids waiting on
  // a native event to catch up and gives the exact sub-pixel value Lenis is
  // animating that frame.
  window.addEventListener("scroll", () => render(window.scrollY), {
    passive: true,
  });
  getLenisInstance()?.on("scroll", (instance) => render(instance.scroll));

  let resizeTimeout: number;
  const remeasure = () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      measure();
      render(window.scrollY);
    }, RESIZE_DEBOUNCE_MS);
  };

  window.addEventListener("resize", remeasure);

  // `offsetStart` is measured against the page's layout at that instant. If
  // anything above this section (web fonts swapping in, images finishing
  // load) reflows afterwards, that position goes stale and the whole scroll
  // mapping shifts. A resize on `window` alone won't catch that, so also
  // watch the document's own height.
  new ResizeObserver(remeasure).observe(document.body);
};
