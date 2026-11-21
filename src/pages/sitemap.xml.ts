import type { APIRoute } from 'astro';

// Páginas del sitio: si se agregan más, sumarlas aquí (o pasar a @astrojs/sitemap).
// Las URLs salen de `site` (astro.config.mjs), el dominio canónico.
const pages = ['/', '/privacy/'];

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url>\n    <loc>${new URL(path, site).href}</loc>\n  </url>`).join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
