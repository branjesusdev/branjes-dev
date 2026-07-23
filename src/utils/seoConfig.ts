// Type imports
import type { ManifestOptions } from "vite-plugin-pwa"

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
	baseURL: "https://branjes-dev.vercel.app/", // Production URL.
	description:
		"Currículum de Brandol Fontecha, Frontend Developer Senior con más de 7 años de experiencia en FinTech y software B2B.",
	type: "website",
	image: {
		url: "",
		alt: "CV de Branjes",
		width: 705,
		height: 606,
	},
	siteName: "CV de Branjes",
	twitter: {
		card: "summary_large_image",
	},
}

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: "CV de Branjes",
	short_name: "CV de Branjes",
	description:
		"Currículum de Brandol Fontecha, Frontend Developer Senior con más de 7 años de experiencia en FinTech y software B2B.",
	theme_color: "#d5ff00",
	background_color: "#d5ff00",
	display: "fullscreen",
	icons: [
		{
			src: "/img/icons/favicon-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "/img/icons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
		{
			src: "/img/icons/favicon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable",
		},
	],
}
