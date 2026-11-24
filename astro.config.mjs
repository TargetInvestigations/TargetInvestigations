// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dominio canónico: de aquí salen la URL canónica, og:url, og:image, el JSON-LD, robots.txt
  // y sitemap.xml. El sitio se sirve en la raíz del dominio, así que no hace falta `base`.
  site: 'https://apexintelagency.com',
});
