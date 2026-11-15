import type { APIRoute } from 'astro';

// Se genera en el build a partir de `site` (astro.config.mjs) para que el dominio viva en
// un solo lugar. El mismo archivo se sube a todos los dominios del deploy: la línea
// Sitemap apunta siempre al dominio canónico.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
