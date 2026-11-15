import type { APIRoute } from 'astro';

// Sitio de una sola página: si se agregan páginas, sumarlas aquí (o pasar a @astrojs/sitemap).
// La URL sale de `site` (astro.config.mjs), el dominio canónico.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${new URL('/', site).href}</loc>
  </url>
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
