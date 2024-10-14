import { $ } from "./dom-selector";

export const splotlightBorder = ({ selector }: { selector: string }) => {

  const elementCreated = document.createElement("div");
  elementCreated.setAttribute("id", `${selector}-spotlight-border`);
  elementCreated.setAttribute("class", "pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-3xl border border-blue-500 opacity-0 transition-opacity duration-500");

  const $domElement = $(`#${selector}`) as HTMLElement;
  $domElement.appendChild(elementCreated);

  const $spotlightBorder = $(`#${selector}-spotlight-border`) as HTMLElement;

  let positionBorder = { x: 0, y: 0 };
  let opacityBorder = 0;
  let isFocusedBorder = false;

  const updateBorder = () => {
    $spotlightBorder.style.opacity = `${opacityBorder}`;
    $spotlightBorder.style.maskImage = `radial-gradient(30% 30px at ${positionBorder.x}px ${positionBorder.y}px, black 45%, transparent)`;
    $spotlightBorder.style.backgroundColor = "transparent";
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isFocusedBorder) return;

    const rect = $domElement.getBoundingClientRect();
    positionBorder.x = event.clientX - rect.left;
    positionBorder.y = event.clientY - rect.top;
    updateBorder();
  }

  const handleFocus = () => {
    isFocusedBorder = true;
    opacityBorder = 1;
    updateBorder();
  }

  const handleBlur = () => {

    isFocusedBorder = false;
    opacityBorder = 0;
    updateBorder();
  }

  const handleMouseEnter = () => {

    opacityBorder = 1;
    updateBorder();
  }

  const handleMouseLeave = () => {

    if (!isFocusedBorder) {
      opacityBorder = 0;
      updateBorder();
    }
  }

  // Agregar los eventos de mouse cuando el elemento es visible
  const addEventListeners = () => {
    $domElement.addEventListener("mousemove", handleMouseMove);
    $domElement.addEventListener("focus", handleFocus);
    $domElement.addEventListener("blur", handleBlur);
    $domElement.addEventListener("mouseenter", handleMouseEnter);
    $domElement.addEventListener("mouseleave", handleMouseLeave);
  };

  // Eliminar los eventos cuando el elemento ya no es visible
  const removeEventListeners = () => {
    $domElement.removeEventListener("mousemove", handleMouseMove);
    $domElement.removeEventListener("focus", handleFocus);
    $domElement.removeEventListener("blur", handleBlur);
    $domElement.removeEventListener("mouseenter", handleMouseEnter);
    $domElement.removeEventListener("mouseleave", handleMouseLeave);
  };


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        addEventListeners();
      else
        removeEventListeners();
    });
  });

  observer.observe($domElement);
}