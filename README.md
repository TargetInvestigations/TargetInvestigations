# TARGET INVESTIGATIONS — Sitio web

Sitio web corporativo de TARGET INVESTIGATIONS, firma de investigación privada en South Florida (West Palm Beach, Boca Raton y alrededores).

> Ver [`CLAUDE.md`](./CLAUDE.md) para las reglas del proyecto, el detalle de la auditoría de Figma y las decisiones de arquitectura. Ver [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) para el estado de avance por fases.

## Stack

- [Astro](https://astro.build) (salida estática, mínimo JavaScript en cliente)
- TypeScript (modo `strict`)
- CSS con design tokens propios (sin framework de utilidades) — ver `src/styles/tokens.css`
- Fuentes autohospedadas vía [Fontsource](https://fontsource.org/) (Fraunces + Inter, sin requests a Google Fonts)

## Requisitos

- Node.js ≥ 22.12 (LTS recomendado)
- npm

## Desarrollo local

```sh
npm install
npm run dev
```

Sitio disponible en `http://localhost:4321`.

## Comandos

| Comando               | Acción                                              |
| :--------------------- | :--------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo local                          |
| `npm run build`         | Build de producción a `./dist/`                       |
| `npm run preview`       | Sirve el build de producción localmente               |
| `npm run check`         | Type-check de Astro/TypeScript                        |
| `npm run lint`          | ESLint (incluye reglas de accesibilidad para Astro)    |
| `npm run format`        | Formatea el código con Prettier                        |
| `npm run format:check`  | Verifica formato sin modificar archivos                |

## Estructura del proyecto

```text
src/
  config/       # Configuración centralizada (site.ts): contacto, WhatsApp, redes, analytics
  layouts/      # Layout base (head, meta tags, fuentes, estilos globales)
  pages/        # Rutas de Astro (el sitio es de una sola página: index.astro)
  styles/       # Design tokens (tokens.css) y estilos globales (global.css)
public/         # Assets estáticos servidos tal cual (favicon, robots.txt)
```

Los componentes reutilizables (Header, Cards, Botones, Footer, etc.) se agregan en `src/components/` a medida que se construyen en la Fase 2 (Design System).

## Variables de entorno

Ninguna es obligatoria para desarrollo local. Cuando se configure Google Analytics 4 (Fase 9), se usará:

```
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

No se versionan credenciales ni tokens en este repositorio — ver `.gitignore`.

## Datos pendientes del cliente

Teléfono, WhatsApp, email, número de licencia de investigador privado y URLs de redes sociales son placeholders en el diseño actual. Se centralizan en `src/config/site.ts` y deben reemplazarse ahí — no hardcodear en componentes. Ver la sección "Integraciones pendientes" de `CLAUDE.md`.

## Despliegue

Dominio y proveedor de hosting aún no están definidos (Fase 11). El pipeline de CI/CD (Fase 10) se configurará desacoplado del proveedor hasta entonces.
