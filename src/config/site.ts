/**
 * Configuración centralizada del sitio. Único lugar donde deben vivir estos datos —
 * no hardcodear teléfono/WhatsApp/redes/etc. en componentes individuales.
 *
 * Campos marcados como `null` son datos reales pendientes del cliente (ver CLAUDE.md,
 * sección "Integraciones pendientes"). No inventar valores para reemplazarlos.
 */

export const siteConfig = {
  company: {
    name: 'Apex Intel Agency',
    // Eslogan del logo.
    tagline: 'Intelligence built for results',
    founder: 'Andrea Roa',
    coverageArea: 'Boca Raton, West Palm Beach, surrounding areas, and South Florida',
    // Número de licencia de investigador privado (Class A), entregado por el cliente.
    licenseNumber: 'A 3600222' as string | null,
  },

  contact: {
    // Placeholder en Figma: "(xxx) xxx-xxxx". Pendiente del cliente.
    phoneDisplay: null as string | null,
    // Número en formato E.164 para el link wa.me (sin '+' ni espacios), ej. "15551234567".
    whatsappNumber: null as string | null,
    // Email de contacto de la empresa (entregado por el cliente, 2026-11-20).
    email: 'info@apexintelagency.com' as string | null,
  },

  social: {
    // Redes confirmadas en el diseño de Figma (componente "Social Icons"). URLs pendientes del cliente.
    instagram: null as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },

  analytics: {
    // Google Analytics 4 — propiedad "apexintelagency.com" (cuenta "Apex Intel Agency"). No es
    // secreto: queda visible en el HTML. La variable de entorno PUBLIC_GA4_MEASUREMENT_ID, si
    // existe, tiene prioridad (p. ej. para probar con otra propiedad).
    ga4MeasurementId: (import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || 'G-52NRMJBP07') as string,
    // Solo se mide en el dominio oficial: así no cuentan como visitas las pruebas locales
    // (`astro preview`) ni copias del sitio en otros hosts.
    hostnames: ['apexintelagency.com'],
  },

  // Navegación principal: anclas del home. Llevan "/" delante para que también funcionen
  // desde otras páginas (p. ej. /privacy/); dentro del home siguen siendo un desplazamiento
  // suave a la sección, sin recargar.
  nav: [
    { label: 'Home', href: '/#top' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

/** Construye un link de WhatsApp con mensaje predefinido. Devuelve null si aún no hay número. */
export function getWhatsAppLink(message?: string): string | null {
  const number = siteConfig.contact.whatsappNumber;
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
