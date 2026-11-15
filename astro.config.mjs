// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dominio canónico. El mismo build se publica en apexintelagency.com y, temporalmente, en
  // targetinvestigationsagency.com (ver deploy.yml); en ambos la URL canónica, og:url,
  // og:image, el JSON-LD, robots.txt y sitemap.xml apuntan a este dominio. El sitio se
  // sirve en la raíz del dominio, así que no hace falta `base`.
  site: 'https://apexintelagency.com',
});
