/**
 * Configuración centralizada del sitio. Único lugar donde deben vivir estos datos —
 * no hardcodear teléfono/WhatsApp/redes/etc. en componentes individuales.
 *
 * Campos marcados como `null` son datos reales pendientes del cliente (ver CLAUDE.md,
 * sección "Integraciones pendientes"). No inventar valores para reemplazarlos.
 */

export const siteConfig = {
  company: {
    name: 'TARGET INVESTIGATIONS',
    tagline: 'The truth is our target',
    founder: 'Andrea Roa',
    coverageArea: 'Boca Raton, West Palm Beach, surrounding areas, and South Florida',
    // Número de licencia de investigador privado. Placeholder en Figma ("Licensed & Insured # A------").
    licenseNumber: null as string | null,
  },

  contact: {
    // Placeholder en Figma: "(xxx) xxx-xxxx". Pendiente del cliente.
    phoneDisplay: null as string | null,
    // Número en formato E.164 para el link wa.me (sin '+' ni espacios), ej. "15551234567".
    whatsappNumber: null as string | null,
    // Placeholder en Figma: "xxx@targetinvestigations.com". Pendiente del cliente.
    email: null as string | null,
  },

  social: {
    // Redes confirmadas en el diseño de Figma (componente "Social Icons"). URLs pendientes del cliente.
    instagram: null as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },

  analytics: {
    // Google Analytics 4 Measurement ID (ej. "G-XXXXXXXXXX"). Se define vía variable de entorno
    // cuando el cliente entregue el acceso a su propia cuenta de Google. Ver CLAUDE.md.
    ga4MeasurementId: import.meta.env.PUBLIC_GA4_MEASUREMENT_ID ?? null,
  },

  // Navegación principal. El sitio es de una sola página: estos son anchors, no rutas.
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

/** Construye un link de WhatsApp con mensaje predefinido. Devuelve null si aún no hay número. */
export function getWhatsAppLink(message?: string): string | null {
  const number = siteConfig.contact.whatsappNumber;
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
