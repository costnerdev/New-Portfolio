/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      colors: {
        primary: {
          light: "#fef3c7",
          dark: "#374151",
          sepia: "#704214",
          solarized: "#002b36"
        }
      }
    }
  },
	plugins: [],
	darkMode: ['class', '[data-theme="dark"]']
}
