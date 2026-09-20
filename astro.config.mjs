// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Preview temporal en GitHub Pages (gratuito, no es el dominio definitivo — ver
  // CLAUDE.md, sección Integraciones pendientes). El sitio se sirve bajo un subpath
  // (/TargetInvestigations/, no en la raíz del dominio), así que `base` es necesario
  // para que las rutas de assets (CSS/JS/imágenes) generadas por Astro resuelvan bien.
  site: 'https://targetinvestigations.github.io',
  base: '/TargetInvestigations/',
});
