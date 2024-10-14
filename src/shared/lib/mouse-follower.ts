import { $ } from './dom-selector'

export const mouseFollowerRun = ({selector } : {selector: string}) => {

  const elementCreated = document.createElement("div");
  elementCreated.setAttribute("id", `${selector}-mouse-follower`);
  elementCreated.setAttribute("class", "opacity-0 pointer-events-none absolute transform-gpu -inset-px transition duration-300 rounded-3xl");
  

  const $domElement = $(`#${selector}`) as HTMLElement;
  $domElement.appendChild(elementCreated);


  const $mouseFollower = $(`#${selector}-mouse-follower`) as HTMLElement;


  let opacityRadial = 0;
  let focusedRadial = false;
  let positionRadial = { x: 0, y: 0 };

  const updateRadial = () => {
    const styleApply = `opacity: ${opacityRadial}; background-image:radial-gradient(circle 300px at ${positionRadial.x}px ${positionRadial.y}px, rgba(157, 157, 204, 0.096), transparent 100%);`
    $mouseFollower.setAttribute("style", styleApply);
  }
  

  const handleMouseEnter = () => {
    opacityRadial = 1;
    focusedRadial = true;
    updateRadial();
  }

  const handleMouseLeave = () => {
    opacityRadial = 0;
    updateRadial();
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!focusedRadial) return
    const rect = $domElement.getBoundingClientRect();

    positionRadial.x = event.clientX - rect.left;
    positionRadial.y = event.clientY - rect.top;
    updateRadial();
  }

  // Agregar los eventos de mouse cuando el elemento es visible
  const addEventListeners = () => {
    $domElement.addEventListener("mouseenter", handleMouseEnter);
    $domElement.addEventListener("mouseleave", handleMouseLeave);
    $domElement.addEventListener("mousemove", handleMouseMove);
  }

  // Eliminar los eventos cuando el elemento ya no es visible
  const removeEventListeners = () => {
    $domElement.removeEventListener("mouseenter", handleMouseEnter);
    $domElement.removeEventListener("mouseleave", handleMouseLeave);
    $domElement.removeEventListener("mousemove", handleMouseMove);
  }

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
