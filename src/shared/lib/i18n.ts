export type Locale = "en" | "es";

export const LOCALE_STORAGE_KEY = "brandol:lang";
const DEFAULT_LOCALE: Locale = "en";

// Static UI chrome that isn't sourced from curriculum.json (section headers,
// aria-labels, chatbot chrome, etc). Content that DOES come from
// curriculum.json (bio, experience, education...) is translated inline at
// build time instead — see the `data-i18n-en` / `data-i18n-es` attribute
// pattern applied below.
const ui = {
  en: {
    hero: { age: "Age", years: "Years", experience: "Experience" },
    experience: { title: "Experience" },
    education: { title: "Education" },
    location: { title: "Location", basedIn: "Based in", sameTime: "Same time as you" },
    acknowledgements: {
      title: "Acknowledgements",
      starsLabel: "5 stars",
      quote:
        "The beauty of programming lies in its ability to inspire and connect us. To learn from the masters is to honour tradition and innovation in equal measure!",
      thanks: "Thanks 🙏",
      altMidudev: "Master programmer with +15 years of experience",
      altLeifer: "Master programmer Leifer Mendez",
      altFernando: "Master programmer Fernando Herrera",
      altGoncy: "Master programmer Goncy",
      altNikobytes: "Master programmer Nikobytes",
      altManzdev: "Master programmer manzdev",
    },
    projects: {
      title: "Projects",
      learnNextjs:
        "I developed a Pokemon app using Next.js, integrating the PokeAPI to show Pokemon data and details. I also implemented Redux for state management.",
      findMovies:
        "I developed a movie app with Angular 18 and Signals, integrating TheMovieDB API to show trending and popular content.",
      onlyShopping:
        "I developed a shirt store web app using React, integrating WhatsApp for direct customer contact and orders.",
      movieFilm:
        "I built a movie web app using Next.js, with server-side rendering for fast performance, integrating TheMovieDB API to showcase trending and popular movies.",
      landingWarriors:
        "I built a web app with Astro, featuring dynamic Mortal Kombat characters and animations, optimized for fast performance.",
      triquiGame:
        "I developed a Tic-Tac-Toe game using React, with interactive gameplay and state management for a smooth user experience.",
    },
    contact: { linkedin: "Linkedin", mail: "Mail", curriculum: "Curriculum" },
    footer: { madeWith: "With 💖 for branjesusdev 🚀" },
    notFound: { alt: "Not found page", message: "Oops! Page not found" },
    chatbot: { genericError: "Something went wrong. Try again." },
    languageSwitch: { switchToEn: "Switch to English", switchToEs: "Switch to Spanish" },
  },
  es: {
    hero: { age: "Edad", years: "Años", experience: "Experiencia" },
    experience: { title: "Experiencia" },
    education: { title: "Educación" },
    location: { title: "Ubicación", basedIn: "Radicado en", sameTime: "Misma hora que tú" },
    acknowledgements: {
      title: "Agradecimientos",
      starsLabel: "5 estrellas",
      quote:
        "La belleza de programar está en su capacidad de inspirar y conectarnos. ¡Aprender de los maestros es honrar por igual la tradición y la innovación!",
      thanks: "Gracias 🙏",
      altMidudev: "Programador experto con más de 15 años de experiencia",
      altLeifer: "Programador experto Leifer Mendez",
      altFernando: "Programador experto Fernando Herrera",
      altGoncy: "Programador experto Goncy",
      altNikobytes: "Programador experto Nikobytes",
      altManzdev: "Programador experto manzdev",
    },
    projects: {
      title: "Proyectos",
      learnNextjs:
        "Desarrollé una app de Pokemon usando Next.js, integrando la PokeAPI para mostrar datos y detalles de Pokemon. También implementé Redux para el manejo de estado.",
      findMovies:
        "Desarrollé una app de películas con Angular 18 y Signals, integrando la API de TheMovieDB para mostrar contenido popular y en tendencia.",
      onlyShopping:
        "Desarrollé una tienda de camisetas con React, integrando WhatsApp para contacto directo y pedidos de clientes.",
      movieFilm:
        "Construí una app web de películas usando Next.js, con renderizado del lado del servidor para mejor rendimiento, integrando la API de TheMovieDB para mostrar películas populares y en tendencia.",
      landingWarriors:
        "Construí una web app con Astro, con personajes dinámicos de Mortal Kombat y animaciones, optimizada para un rendimiento rápido.",
      triquiGame:
        "Desarrollé un juego de Triqui (Tic-Tac-Toe) usando React, con jugabilidad interactiva y manejo de estado para una experiencia de usuario fluida.",
    },
    contact: { linkedin: "Linkedin", mail: "Correo", curriculum: "Currículum" },
    footer: { madeWith: "Con 💖 para branjesusdev 🚀" },
    notFound: { alt: "Página no encontrada", message: "¡Ups! Página no encontrada" },
    chatbot: { genericError: "Algo salió mal. Intenta de nuevo." },
    languageSwitch: { switchToEn: "Cambiar a inglés", switchToEs: "Cambiar a español" },
  },
} as const;

type Ui = typeof ui.en;

const getByPath = (obj: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((acc, key) => (acc as Record<string, unknown> | undefined)?.[key], obj);

export const t = (locale: Locale, key: keyof Ui | (string & {})): string => {
  const value = getByPath(ui[locale], key as string);
  return typeof value === "string" ? value : (key as string);
};

export const getStoredLocale = (): Locale | null => {
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "en" || stored === "es" ? stored : null;
};

export const setStoredLocale = (locale: Locale) => {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
};

export const getInitialLocale = (): Locale => {
  const stored = getStoredLocale();
  if (stored) return stored;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : DEFAULT_LOCALE;
};

const ATTRS = ["aria-label", "alt", "placeholder"] as const;

/**
 * Two translation mechanisms, applied together:
 * - `data-i18n="dict.path"` — looks up the key in the `ui` dictionary above.
 * - `data-i18n-en` / `data-i18n-es` (and the `-alt-`/`-placeholder-` attribute
 *   variants) — both language strings already baked into the markup at build
 *   time (used for curriculum.json-sourced content, and anywhere a string
 *   needed build-time interpolation, e.g. the visitor's first name).
 */
export const applyTranslations = (locale: Locale) => {
  document.documentElement.lang = locale;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(locale, key);
  });

  ATTRS.forEach((attr) => {
    document.querySelectorAll<HTMLElement>(`[data-i18n-${attr}]`).forEach((el) => {
      const key = el.getAttribute(`data-i18n-${attr}`);
      if (key) el.setAttribute(attr, t(locale, key));
    });
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-en]").forEach((el) => {
    const text = el.getAttribute(locale === "es" ? "data-i18n-es" : "data-i18n-en");
    if (text !== null) el.textContent = text;
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-alt-en]").forEach((el) => {
    const text = el.getAttribute(locale === "es" ? "data-i18n-alt-es" : "data-i18n-alt-en");
    if (text !== null) el.setAttribute("alt", text);
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-placeholder-en]").forEach((el) => {
    const text = el.getAttribute(locale === "es" ? "data-i18n-placeholder-es" : "data-i18n-placeholder-en");
    if (text !== null) el.setAttribute("placeholder", text);
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-aria-label-en]").forEach((el) => {
    const text = el.getAttribute(locale === "es" ? "data-i18n-aria-label-es" : "data-i18n-aria-label-en");
    if (text !== null) el.setAttribute("aria-label", text);
  });

  // For content that can't be swapped as plain text (e.g. the About section's
  // per-character reveal animation, which needs a distinct set of spans per
  // language): render both language variants at build time and toggle which
  // one is visible instead of re-rendering.
  document.querySelectorAll<HTMLElement>("[data-i18n-lang]").forEach((el) => {
    el.classList.toggle("hidden", el.getAttribute("data-i18n-lang") !== locale);
  });

  window.dispatchEvent(new CustomEvent("locale-change", { detail: locale }));
};

// Location's "Xh ahead/behind" strings are computed from a live Date at
// runtime (not known at build time), so they go through this small helper
// instead of the data-i18n dictionary above.
export const getLocationDiffLabel = (locale: Locale, diffHours: number): string => {
  if (diffHours === 0) return t(locale, "location.sameTime");

  const hours = Math.abs(diffHours);
  if (locale === "es") {
    return diffHours > 0 ? `${hours}h más tarde que tú` : `${hours}h más temprano que tú`;
  }
  return diffHours > 0 ? `${hours}h ahead of you` : `${hours}h behind you`;
};
