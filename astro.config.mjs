// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción (Hostinger). El sitio se sirve en la raíz del dominio, así que
  // no hace falta `base`. `site` se usa para la URL canónica y og:url (Layout.astro).
  site: 'https://targetinvestigationsagency.com',
});
