# CLAUDE.md

Guía de contexto para Claude Code al trabajar en este repositorio.

## Descripción del proyecto

Sitio web de currículum / portafolio profesional de **Brandol (Branjes)**, desarrollador
full-stack. El sitio se despliega como una landing page de una sola sección scrolleable
que presenta su perfil, experiencia laboral, stack tecnológico, proyectos y datos de
contacto.

- **Sitio en producción:** https://branjes-dev.vercel.app/
- **Perfil:** Desarrollador Web, 6+ años de experiencia, con sede en Fusagasugá, Colombia.
- **Propósito:** Servir como CV interactivo y portafolio de proyectos para procesos de
  reclutamiento y presentación profesional.

## Stack técnico

- **Framework:** [Astro](https://astro.build/) 5 (SSG, arquitectura de islas)
- **Estilos:** TailwindCSS + Sass (arquitectura de capas tipo ITCSS en `src/themes/`)
- **Lenguaje:** TypeScript
- **PWA:** `vite-plugin-pwa` (manifest, caché de imágenes/fuentes con Workbox)
- **SEO:** `@astrojs/sitemap` + configuración centralizada en `src/utils/seoConfig.ts`
- **Despliegue:** Vercel (ver `vercel.json`)
- **Lint/Formato:** ESLint (`eslint-plugin-astro`), Standard

## Comandos

```bash
npm run dev       # Servidor de desarrollo (localhost:8080)
npm run build     # Build de producción a ./dist/
npm run preview   # Preview local del build
npm run astro ...  # CLI de Astro (ej. astro check)
```

No hay actualmente un test runner configurado en `package.json` pese a existir una
carpeta `coverage/`; verificar antes de asumir que existen pruebas ejecutables.

## Estructura del proyecto

```
src/
├── assets/
│   └── curriculum.json   # Fuente de verdad de los datos del CV (nombre, edad,
│                          # experiencia, redes sociales, historial laboral, ubicación)
├── components/           # Componentes de UI reutilizables (Badge, CardInfo, CardProduct...)
├── layouts/
│   └── Layout.astro       # Layout base (head, meta tags, estilos globales)
├── pages/
│   ├── index.astro        # Página principal: ensambla todas las secciones
│   └── 404.astro
├── sections/              # Secciones de la landing (una por bloque de la página)
│   ├── Hero.astro          # Edad / años de experiencia
│   ├── About.astro         # Presentación y avatar
│   ├── Experience.astro    # Historial laboral (lee de curriculum.json)
│   ├── Stack.astro         # Grid de tecnologías/íconos dominados
│   ├── Projects.astro      # Tarjetas de proyectos personales con demo + stack usado
│   ├── Repository.astro    # Enlace a GitHub
│   ├── Contact.astro        # Datos de contacto
│   ├── Location.astro
│   ├── News.astro
│   ├── Acknowledgements.astro
│   └── ThemeSwitch.astro
├── shared/
│   ├── icons/              # Íconos SVG de tecnologías (Astro, React, Angular, etc.)
│   ├── content/             # Efectos visuales reutilizables (grids, glow, spotlight...)
│   └── lib/                 # Utilidades de interacción (mouse follower, spotlight border)
├── themes/                 # SCSS organizado en capas (atoms, molecules, organisms, layers)
└── utils/
    └── seoConfig.ts         # Configuración de SEO y manifest PWA
```

## Fuente de datos del CV

Toda la información personal y profesional vive en **`src/assets/curriculum.json`**.
Este archivo es la única fuente de verdad consumida por los componentes de las
secciones (`Hero`, `About`, `Experience`, etc.). Al actualizar datos del currículum
(experiencia laboral, enlaces sociales, descripción "about", edad, ubicación), el
cambio debe hacerse ahí — no hardcodear datos personales dentro de los `.astro`.

Campos principales: `name`, `age`, `experienceYears`, `about`, `social`
(`linkedin`, `github`, `email`), `curriculumPDF`, `experiences[]` (`role`, `company`,
`duration`, `link`), `location`.

## Convenciones de trabajo

- Los alias de import configurados en `tsconfig.json`: `@/*`, `@layouts/*`, `@pages/*`,
  `@shared/*`, `@components/*` (usar estos en vez de rutas relativas largas).
- Los proyectos mostrados en `Projects.astro` son proyectos personales/demo (no
  clientes reales); cada uno referencia su demo en Vercel y las tecnologías usadas
  vía `Badge`.
- Las secciones usan animaciones de entrada (`animate-fade-up`, etc.) y efectos de
  interacción vía scripts en `src/shared/lib/` (spotlight border, mouse follower) —
  mantener ese patrón al añadir nuevas secciones.
- El sitio es en inglés en el contenido visible (About, Projects), pero la
  configuración de SEO (`seoConfig.ts`) está en español — tenerlo en cuenta al tocar
  metadatos.

## Al hacer cambios

- Si se actualiza la experiencia laboral, la bio o los datos de contacto: editar
  `curriculum.json`, no los componentes `.astro`.
- Si se agrega un nuevo proyecto al portafolio: añadir una tarjeta en
  `Projects.astro` siguiendo el patrón existente (`CardProduct` + `Badge` por
  tecnología), e incluir capturas en `public/`.
- Si se agrega una nueva tecnología al stack: crear/reutilizar el ícono en
  `src/shared/icons/` y añadirlo a `Stack.astro`.
- Revisar `astro.config.mjs` antes de tocar configuración de PWA, sitemap o build,
  ya que integra varias herramientas (Tailwind, sitemap, VitePWA) con opciones
  específicas de caché.
