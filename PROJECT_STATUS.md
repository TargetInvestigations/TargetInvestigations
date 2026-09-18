# PROJECT_STATUS.md — Estado detallado del desarrollo

Leyenda: `[ ]` Pendiente · `[~]` En progreso · `[x]` Completado · `[!]` Bloqueado

---

## FASE 0 — Acceso y descubrimiento (Figma)

- [x] Obtener acceso al proyecto de Figma — vía API REST + Personal Access Token
- [x] Revisar todas las páginas del archivo de Figma (2 canvases: Moodboard, Page 1)
- [x] Inventariar frames y pantallas (desktop 1549px, mobile 440px — **no hay frame de tablet**)
- [x] Inventariar componentes y variantes (nav, botones/links, badges de valores, cards de servicio, acordeón FAQ, acordeón mobile, stats, social icons, footer)
- [~] Inventariar assets (imágenes identificadas por captura; exportación real de assets pendiente para Fase 1/2)
- [x] Identificar sistema de colores (muestreado de nodos reales; sin librería de Styles/Variables en el archivo)
- [x] Identificar tipografías y pesos (Fraunces + Inter)
- [ ] Identificar espaciados y grillas en detalle (pendiente, se hará al construir el design system en Fase 1/2)
- [ ] Identificar estados de botones (hover/focus/active/disabled) — no visibles vía API estática, requiere revisión manual en Figma o prototipo
- [x] Identificar formularios y su comportamiento — **no existe formulario**, contacto vía WhatsApp/teléfono/email
- [x] Identificar navegación/menús — nav de 4 items + CTA (Home/Services/About/Contact), ancla dentro de una sola página
- [x] Identificar contenido textual disponible vs. placeholder (ver `CLAUDE.md`, contenido real extraído incluyendo las 20 FAQ completas; placeholders: teléfono, email, N° de licencia)
- [x] Detectar dudas / información faltante en el diseño (ver sección "Decisiones y preguntas abiertas" en `CLAUDE.md` / reporte de Fase 0)
- [x] Documentar hallazgos en `CLAUDE.md` (sección Figma)
- [x] Presentar plan (mapa del sitio, componentes, riesgos, propuesta de stack) para aprobación — entregado y **confirmado por el usuario el 2026-09-18** (versión Moodboard vigente, sitio de una sola página con anclas, tablet interpolado con criterio propio)

**FASE 0 COMPLETADA.** Lista para iniciar Fase 1.

---

## FASE 1 — Arquitectura

- [x] Seleccionar y justificar stack tecnológico — **Astro** (confirmado por el usuario 2026-09-18)
- [x] Inicializar proyecto (scaffolding) — `create-astro` template `minimal`, TypeScript `strict`
- [x] Configurar linter/formatter — ESLint (`eslint-plugin-astro` + reglas jsx-a11y) + Prettier (`prettier-plugin-astro`)
- [x] Configurar TypeScript — `astro/tsconfigs/strict`, más `@astrojs/check` para `npm run check`
- [x] Definir estructura de carpetas — `src/{config,layouts,pages,styles}`, `src/components/` se agrega en Fase 2
- [x] Crear design tokens iniciales (a partir de Figma) — `src/styles/tokens.css`
- [x] Configurar fuentes — Fraunces + Inter autohospedadas vía `@fontsource-variable`
- [ ] Configurar manejo de assets — pendiente exportar assets reales de Figma (Fase 2/3)
- [x] Configurar SEO base (metadata, sitemap/robots scaffolding) — `Layout.astro` (title/description/OG) + `public/robots.txt`; sitemap real se agrega en Fase 6 con dominio definitivo
- [x] Crear `site.config` centralizado (empresa, contacto, redes, analytics, WhatsApp) — `src/config/site.ts`
- [x] Inicializar repositorio Git — `git init` + commit inicial (`651b2b7`) hecho

**Validado:** `npm run check` (0 errores), `npm run lint` (limpio), `npm run format:check` (limpio), `npm run build` (genera `dist/` correctamente), servidor de desarrollo probado con `curl` (sirve HTML, meta tags y fuentes correctamente).

**FASE 1 COMPLETADA.**

---

## FASE 2 — Design System

- [x] Container / layout base — `Container.astro` (default/narrow/wide), `Section.astro` (tono dark/light)
- [~] Sistema tipográfico — resuelto vía tokens CSS + estilos base en `global.css`; sin componente dedicado (no hacía falta)
- [x] Button (variantes/estados según Figma) — `Button.astro` (solid/ghost); ver nota de deviación sobre el gradiente en `CLAUDE.md`
- [x] Link — cubierto por `Button.astro` + estilos de link en Nav/Footer
- [x] Header / Navigation — `Header.astro` (logo real exportado de Figma, nav, menú mobile sin JS vía `<details>`)
- [x] Footer — `Footer.astro`
- [x] Cards — `ValueBadges.astro` (5 badges del Hero), `StatBadges.astro` (grid de About), `AccordionItem.astro`/`FaqAccordion.astro` (20 FAQs reales)
- [ ] Form controls — no aplica: el diseño no tiene formulario de contacto (confirmado en Fase 0)
- [x] Section wrappers — `Section.astro`

**Íconos exportados de Figma como SVG real** (no inventados): logo/marca (`logo-mark.svg`), 5 íconos de value badges, 4 íconos de redes sociales (Instagram/TikTok/LinkedIn/Facebook). El ícono de WhatsApp no pudo exportarse (la API no resolvió ese nodo específico); pendiente para cuando se arme el botón de WhatsApp en Fase 3.

**Deviación de diseño documentada:** la sección de FAQs en Figma existe como un tablero tipo masonry de tarjetas angostas (~196px) dentro de un componente que aparece colapsado por defecto en la página. Se implementó en su lugar como una lista vertical estándar de acordeones (mismo contenido, mejor accesibilidad/legibilidad). Ver detalle en `CLAUDE.md`.

**Validado:** `npm run check`/`lint`/`format:check` limpios, `npm run build` genera `dist/` sin errores, servidor de desarrollo probado con `curl` — los 20 ítems de FAQ, el header con menú mobile, y el footer con placeholders se renderizan correctamente. Los íconos de redes sociales correctamente NO se muestran porque las URLs aún son `null` en `site.ts`.

**FASE 2 COMPLETADA** (design system base). El ensamblado del Home real con Hero/Services/About usando fotos y contenido completo queda para la Fase 3.

---

## FASE 3 — Primera página (Home)

- [ ] Implementación desktop
- [ ] Implementación mobile
- [ ] Validación responsive intermedio (tablet)
- [ ] Revisión de fidelidad pixel-a-pixel vs. Figma
- [ ] Revisión de accesibilidad
- [ ] Revisión de performance
- [ ] Corrección de patrones antes de continuar

---

## FASE 4 — Secciones adicionales / expansión

Confirmado en Fase 0: el sitio es de **una sola página** (Home/Services/About/Contact son anclas, no rutas separadas). Esta fase, en la práctica, se fusiona con la Fase 3 (son las mismas secciones de la única página). Se deja este espacio para expansión futura si el cliente decide más adelante separar alguna sección en su propia URL (por ejemplo, una página de detalle de servicio o un blog).

- [ ] _(Sin páginas adicionales definidas por ahora)_

---

## FASE 5 — Responsive global

- [ ] Móvil pequeño
- [ ] Móvil
- [ ] Tablet
- [ ] Laptop
- [ ] Desktop
- [ ] Pantalla grande
- [ ] Corrección de overflow horizontal y problemas globales

---

## FASE 6 — SEO técnico

- [ ] Titles y descriptions por página
- [ ] Jerarquía H1-H6
- [ ] Canonical URLs
- [ ] URLs amigables
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Open Graph / metadata social
- [ ] ALT en imágenes
- [ ] JSON-LD / Schema.org donde aplique
- [ ] Enlaces internos
- [ ] Verificación de indexabilidad

---

## FASE 7 — Performance

- [ ] Auditoría de imágenes (formatos, tamaños, lazy loading)
- [ ] Auditoría de fuentes
- [ ] Auditoría de JS
- [ ] Auditoría de CSS
- [ ] LCP / CLS / INP
- [ ] Auditoría Lighthouse

---

## FASE 8 — Accesibilidad

- [ ] Navegación por teclado
- [ ] Focus visible
- [ ] Labels y ARIA donde corresponda
- [ ] Contraste de color
- [ ] Textos alternativos
- [ ] prefers-reduced-motion
- [ ] Formularios accesibles

---

## FASE 9 — Integraciones

- [ ] WhatsApp (botón, wa.me, mensaje predefinido)
- [ ] Redes sociales
- [ ] Google Analytics 4
- [ ] Google Search Console

---

## FASE 10 — CI/CD

- [ ] Inicializar repositorio Git
- [ ] `.gitignore`
- [ ] README inicial
- [ ] GitHub Actions: install + lint + typecheck + build
- [ ] Configuración de secrets/variables (GitHub Actions Secrets)

---

## FASE 11 — Hosting y dominio

- [ ] Selección de proveedor (pendiente de definir con el usuario)
- [ ] Configuración de dominio/DNS
- [ ] HTTPS
- [ ] Redirects (www / non-www)
- [ ] Canonical definitivo
- [ ] Variables de entorno de producción

---

## FASE 12 — QA final

- [ ] Links
- [ ] Responsive completo
- [ ] Navegación
- [ ] Formularios
- [ ] SEO
- [ ] Analytics
- [ ] Search Console
- [ ] Sitemap / robots
- [ ] HTTPS / redirecciones
- [ ] Performance
- [ ] Accesibilidad
- [ ] Errores de consola
- [ ] 404
- [ ] Metadata / favicon / social preview

---

## Bitácora de sesiones

- **2026-09-18 (mañana):** Sesión inicial. Se recibieron las instrucciones del proyecto. Se creó `CLAUDE.md` y este archivo. Carpeta de proyecto vacía, sin Git inicializado. **Bloqueado en Fase 0** por falta de acceso a Figma.
- **2026-09-18 (tarde):** Usuario proporcionó un Personal Access Token de Figma y el link del archivo. Se auditó el archivo completo vía API REST (estructura, contenido real, colores, tipografías, componentes) y se verificó visualmente con capturas exportadas. Se presentó el reporte de Fase 0 y el usuario confirmó las 3 decisiones abiertas (versión de referencia, sitio de una sola página, tablet interpolado). **Fase 0 completada.**
- **2026-09-18 (noche):** Usuario confirmó Astro como stack. Se instaló Node.js LTS (no estaba presente en la máquina) vía winget con autorización del usuario. Se hizo scaffolding del proyecto Astro (template `minimal`, TS strict), se configuró ESLint+Prettier+astro check, se crearon los design tokens (`src/styles/tokens.css`), el layout base con SEO/fuentes (`src/layouts/Layout.astro`), y la configuración centralizada del sitio (`src/config/site.ts`). Se validó todo el pipeline (`check`/`lint`/`format:check`/`build`/dev server). Usuario configuró su identidad de git y se hizo el commit inicial (`651b2b7`). **Fase 1 completada.**
