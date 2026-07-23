/**
 * Subtle mouse-parallax: elements marked `[data-parallax]` inside `selector`
 * drift slightly toward/away from the cursor, each by its own
 * `data-depth` multiplier (closer-feeling elements use a bigger value), like
 * looking at a layered scene from a slightly shifting angle.
 *
 * Skipped on touch devices (no hover/pointer to drive it) and reset smoothly
 * via a CSS transition rather than JS easing.
 */
export const initMouseParallax = ({
  selector,
  maxOffset = 14,
}: {
  selector: string;
  maxOffset?: number;
}) => {
  const container = document.querySelector<HTMLElement>(`#${selector}`);
  const targets = container?.querySelectorAll<HTMLElement>("[data-parallax]");

  if (!container || !targets || !targets.length) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let targetX = 0;
  let targetY = 0;
  let rafId = 0;

  const render = () => {
    rafId = 0;
    targets.forEach((el) => {
      const depth = Number(el.dataset.depth ?? 1);
      const x = targetX * maxOffset * depth;
      const y = targetY * maxOffset * depth * 0.6;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const requestRender = () => {
    if (!rafId) rafId = requestAnimationFrame(render);
  };

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    requestRender();
  });

  container.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    requestRender();
  });
};
