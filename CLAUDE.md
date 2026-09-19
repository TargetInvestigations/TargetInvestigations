# CLAUDE.md — Memoria y guía permanente del proyecto

> Este archivo es la fuente de verdad sobre reglas, decisiones y estado del proyecto.
> Debe mantenerse actualizado en cada fase. Ver también `PROJECT_STATUS.md` para el checklist detallado de avance.

---

## 1. Proyecto

- **Objetivo:** Desarrollar el sitio web corporativo de **TARGET INVESTIGATIONS**, una firma de investigación privada (South Florida — West Palm Beach, Boca Raton y alrededores), sin login ni usuarios registrados.
- **Tipo de sitio:** Corporativo / institucional de una sola página (home long-scroll con anclas: Home/Services/About/Contact). Sin base de datos. Ver decisión confirmada en sección Figma.
- **Stack tecnológico:** **Astro** (confirmado por el usuario, 2026-09-18) — sitio mayoritariamente estático, sin login, con interactividad mínima (acordeones de FAQ/servicios, menú mobile, botón de WhatsApp), lo que encaja con el modelo de islands de Astro (HTML estático por defecto, JS solo donde se declare explícitamente). TypeScript en modo `strict`.
- **Arquitectura:** Sitio estático generado por Astro (`output: "static"`), una sola ruta (`src/pages/index.astro`) con secciones ancladas. Sin framework de UI (React/Vue/etc.) — no es necesario dado el bajo nivel de interactividad.
- **Estructura de carpetas:**
  ```
  src/
    config/     # site.ts — configuración centralizada (contacto, WhatsApp, redes, analytics, nav)
    layouts/    # Layout.astro — head, meta tags/SEO, fuentes, estilos globales
    pages/      # rutas de Astro (index.astro)
    styles/     # tokens.css (design tokens) + global.css (reset/base)
    components/ # Design System: Container, Section, Button, Header, Footer, ValueBadges, StatBadges, AccordionItem, FaqAccordion, SocialLink
    icons/      # SVG reales exportados de Figma (logo, value badges, redes sociales) — importados con ?raw
  public/       # assets estáticos (favicon, robots.txt)
  ```
- **Convenciones del proyecto:** ESLint (`eslint-plugin-astro` + reglas de accesibilidad jsx-a11y) + Prettier (`prettier-plugin-astro`) para formato consistente. `npm run check` para type-checking de Astro/TS. Fuentes autohospedadas vía `@fontsource-variable` (Fraunces + Inter) — sin requests externos a Google Fonts. No hardcodear datos de contacto/redes/analytics en componentes: todo pasa por `src/config/site.ts`.

---

## 2. Figma

- **Estado del acceso:** ✅ Acceso vía API REST de Figma con Personal Access Token (Opción B). Token guardado localmente en `C:\Trabajo\access token.txt` (fuera del repo, no versionado).
- **URL / referencia del proyecto:** `https://www.figma.com/design/wNuM1O9AljP8HJUpOXFFro/TARGET-investigations` (file key: `wNuM1O9AljP8HJUpOXFFro`).
- **Páginas (canvases) del archivo Figma:** `Moodboard` (id `1:8`) y `Page 1` (id `0:1`). **Importante:** estas NO son páginas del sitio — son "páginas" de Figma. El sitio real, según el diseño actual, es un **home de una sola página (long-scroll)**, con navegación por anclas (Home/Services/About/Contact). Ver sección "Decisiones y preguntas abiertas" más abajo — esto está pendiente de confirmación con el usuario.
- **Frame canónico de la página (confirmado por el usuario, 2026-09-18):** `Website` dentro de `Moodboard` (id `53:57`, 1549×7851). La versión de `Page 1` (id `233:1186`, 1549×5658) es un borrador anterior y se descarta como referencia.
- **Versión mobile:** Frame `iPhone 16 & 17 Pro Max - 1` dentro de `Moodboard` (id `341:1569`, 440×5266).
- **Breakpoints encontrados en Figma:** Desktop **1549px** y Mobile **440px**. No existe frame de tablet en el archivo; el usuario confirmó (2026-09-18) que interpolemos ese rango intermedio con buen criterio propio, documentándolo explícitamente como decisión nuestra (no como diseño aprobado por Figma).
- **Tipografías:**
  - Encabezados (display/serif): **Fraunces**, peso ~500, tracking negativo (ej. -0.5), usada en H2/headlines; incluye acentos en itálica sobre palabras clave.
  - Cuerpo / UI (sans): **Inter**, peso 400 (párrafos), 500 (nav/labels, versalitas con letter-spacing), 700 (botones). Variante óptica "Inter 28pt" usada puntualmente (teléfono en hero).
  - No hay una escala tipográfica formal documentada como Text Styles en Figma (el archivo no publica Styles — ver más abajo). Se deberá construir la escala nosotros mismos a partir de los tamaños reales medidos.
- **Colores identificados (sin librería de Styles/Variables publicada en el archivo — ver nota):**
  - Fondo oscuro principal (navy): `#0B213F`
  - Texto oscuro / variante navy secundaria: `#081420` (revisar si debe unificarse con el anterior en Fase 1)
  - Crema / blanco cálido (texto sobre oscuro, fondos claros de sección): `#FBF8F2`
  - Dorado/bronce principal (acentos, CTA): `#B8935A`
  - Dorado claro (texto secundario sobre oscuro): `#E9C37E`
  - Dorado oscuro/bronce (fondo de botón): `#6C4E1F`
  - Blanco puro (texto de navegación): `#FFFFFF`
  - Estos valores se extrajeron muestreando nodos reales (no de una librería central), ya que **el archivo no tiene Estilos ni Variables de Figma publicados** (`GET /styles` devuelve vacío; la API de Variables devuelve 403 por falta de scope en el token). Se deberá construir el design system centralizando estos valores como tokens propios en Fase 1/2, y validar con el usuario si hay más matices de color no capturados en este muestreo.
- **Design tokens:** No existen en Figma como tal (ni Styles ni Variables) — se derivarán y centralizarán durante la Fase 1/2 a partir de los valores reales medidos.
- **Componentes reutilizables detectados:** Header/Nav con logo + 4 links + CTA; botón "Link" (variantes, usado como CTA y como link de WhatsApp con ícono); tarjeta de "Value badge" (ícono + label, usado para Discretion/Integrity/Precision/Intelligence/Results); tarjeta de servicio (título + bullets + panel de imágenes, en zigzag); ítem de acordeón FAQ (variantes abierto/cerrado, 20 instancias); ítem de acordeón de servicios (mobile, 9 instancias); tarjeta de stat/trust badge (2×2 en About); Social Icon (variantes por red: Instagram, TikTok, LinkedIn, Facebook, color "Negative" para fondo oscuro); Footer.
- **Diferencias desktop vs. mobile confirmadas visualmente:**
  - Header: nav horizontal completa (desktop) vs. probablemente menú hamburguesa (mobile — ícono visible en captura, contenido del menú no explorado aún en detalle).
  - Hero: **split lateral** foto izquierda / lockup de marca derecha (desktop) → **apilado verticalmente**, lockup arriba y foto debajo (mobile).
  - Servicios: heading alineado a la izquierda + 9 bloques en **zigzag de 2 columnas** con imagen (desktop) → heading centrado + **acordeón vertical colapsado** de 9 ítems (mobile).
  - About: bio + grid de stats 2×2 en dos columnas (desktop) → apilado en una columna (mobile).
  - FAQ: barra colapsable "FAQs" de ancho completo en ambos breakpoints (mismo patrón).
- **Contenido real detectado (no inventar, ya es copy del cliente):**
  - Marca: "TARGET INVESTIGATIONS", tagline "The truth is our target" / "THE TRUTH IS OUR TARGET".
  - Fundadora: Andrea Roa, Principal Private Investigator, negocio familiar (hija abogada), con bio completa de 3 párrafos.
  - Ubicación/cobertura: South Florida, West Palm Beach, Boca Raton, Miami-Dade/Broward/Palm Beach County.
  - 9 categorías de servicios con listas de sub-servicios (Background & Due Diligence, Family & Domestic, Business & Corporate, Locate & Skip-Trace, Fraud/Asset/Financial, Forensic Accounting, Civil/Litigation/Attorney Support, Personal Injury/Accident/Insurance, Property/Professional/Specialized).
  - 20 preguntas frecuentes con respuestas completas, incluyendo **tarifas reales**: $120/hora tarifa estándar, infidelidad $1,500–$5,000, background check público desde $39.99, comprehensive desde $250, forensic accounting desde ~$1,400.
  - Redes sociales confirmadas en el diseño: **Instagram, TikTok, LinkedIn, Facebook** (no hay YouTube/X/Twitter en el diseño actual).
- **Datos placeholder detectados (NO usar como reales, faltan del cliente):** teléfono `+1 123 4567890` / `(xxx) xxx-xxxx`, email `xxx@targetinvestigations.com`, número de licencia "Class A Licensed # ___". El botón/link de contacto está construido como **link de WhatsApp** (ícono WhatsApp presente en el componente), lo cual encaja directamente con la integración de WhatsApp pendiente (sección 4 de este documento).
- **No se encontró formulario de contacto** en el diseño — el contacto se resuelve vía WhatsApp/teléfono y email. A confirmar si se requiere un formulario adicional.

**Regla:** Ningún valor visual (color, tipografía, tamaño, espaciado, breakpoint, layout) debe asumirse o inventarse más allá de lo documentado arriba. Todo lo que no esté aquí debe tratarse como "pendiente de definir con el cliente" o "propuesta sujeta a aprobación".

### Decisiones confirmadas por el usuario (2026-09-18)

1. **Versión de referencia:** el frame `Website` de la página `Moodboard` (id `53:57`) es el vigente. El de `Page 1` se descarta.
2. **Estructura del sitio:** es un sitio de **una sola página** (home long-scroll). Home/Services/About/Contact del nav son **anclas** (`#services`, `#about`, `#contact`, etc.) dentro de la misma página, no rutas/páginas separadas. Esto simplifica el enrutamiento y el SEO (un solo documento, metadata única, encabezados H2 por sección en vez de H1 por página).
3. **Breakpoint tablet:** no existe en el diseño. Se resolverá el rango intermedio con criterio propio de responsive (basado en cómo cambian los layouts entre 440px y 1549px), documentando explícitamente que es una interpretación nuestra y no un diseño aprobado por el cliente.
4. **Sección FAQ (Fase 2, 2026-09-18):** en Figma, las 20 preguntas existen como tarjetas sueltas de un tablero tipo masonry (~196px de ancho cada una, 5 filas × 4 columnas) dentro de un componente ("Group 39") que en la página real aparece colapsado por defecto (barra "FAQs"). Ese tablero de tarjetas angostas no es un patrón accesible ni legible para una lista de FAQ real (texto de respuesta muy comprimido). Se implementó en su lugar como una lista vertical estándar de acordeones (`<details>`/`<summary>`, sin JavaScript), con el mismo contenido exacto (las 20 preguntas y respuestas reales). Esto es una decisión técnica/de accesibilidad, no un cambio de contenido — a validar con el usuario si prefiere otra presentación.
5. ~~Botón CTA — color simplificado~~ **Resuelto (2026-09-18):** se extrajo el gradiente exacto del nodo `185:816` (`linear-gradient(90deg, #E9C37E 0%, #D4A95A 100%)`), ya aplicado en `Button.astro`/`tokens.css`. También se confirmó, revisando `componentProperties` del mismo nodo, que el componente del botón solo tiene la variante "Default" — no hay un estado "Hover" diseñado explícitamente en Figma para este componente.

---

## 3. Reglas críticas

1. **Figma es la fuente principal de verdad para UI/UX.** No se programa interfaz sin haber analizado el diseño correspondiente.
2. Se debe respetar fielmente tanto el diseño **desktop** como **mobile** (y tablet, si existe), incluyendo comportamientos específicos de cada breakpoint, no solo una adaptación proporcional.
3. No se deben inventar cambios visuales sin indicarlos explícitamente al usuario.
4. El sitio debe ser **completamente responsive** (móvil pequeño → pantallas grandes).
5. El **rendimiento** es prioritario (Core Web Vitals: LCP, CLS, INP).
6. El **SEO técnico** forma parte del desarrollo desde el inicio, no se agrega al final.
7. **Accesibilidad** y **HTML semántico** se consideran desde el inicio, no como parche posterior.
8. No sobrecargar el proyecto con dependencias innecesarias.
9. El **JavaScript en cliente** debe mantenerse al mínimo razonablemente necesario.
10. Todo **cambio arquitectónico importante** debe documentarse en este archivo.

**Orden de prioridades para decisiones técnicas** (de mayor a menor):
1. Fidelidad al Figma
2. UX/UI
3. Responsive
4. Accesibilidad
5. Rendimiento
6. SEO
7. Mantenibilidad
8. Seguridad
9. Facilidad de despliegue
10. Simplicidad

**Fuera de alcance inicial** (no confundir SEO técnico con marketing): investigación de keywords, estrategia SEO mensual, link building, blog editorial recurrente, SEO local avanzado, gestión de Google Business Profile, campañas pagas, gestión de redes sociales, seguimiento periódico de Analytics. El sitio debe quedar *técnicamente preparado* para que estas estrategias se implementen después, pero no se ejecutan como parte de este desarrollo.

**No sobreingeniería:** es un sitio corporativo/informativo. No se introducen por defecto microservicios, Docker, Kubernetes, bases de datos, Redis, colas, autenticación, APIs complejas ni state management global, salvo que el proyecto lo requiera explícitamente.

---

## 4. Integraciones pendientes

| Integración | Estado | Notas |
|---|---|---|
| Google Analytics 4 | Pendiente — requiere información del cliente | Debe usarse una cuenta Google **propiedad de la empresa cliente**, nunca del desarrollador. Arquitectura debe permitir agregar el ID vía configuración/env var. |
| Google Search Console | Pendiente — requiere dominio + hosting + cuenta del cliente | Se configura tras tener dominio y hosting definitivos. |
| WhatsApp | Pendiente — requiere número del cliente | No inventar número. Centralizar en configuración única (no hardcodear en múltiples archivos). |
| Redes sociales | Pendiente — requiere URLs del cliente | Centralizar en configuración. No inventar URLs. |
| Dominio | Pendiente | No definido aún. |
| Hosting | Pendiente | No definido aún. Se evaluará según necesidades técnicas del proyecto una vez exista código. |
| SSL/HTTPS | Pendiente — depende de hosting/dominio | El proyecto debe quedar listo para HTTPS. |
| GitHub | Pendiente | Repositorio aún no inicializado (carpeta local sin git). |
| GitHub Actions | Pendiente | Se configurará en Fase 10, desacoplado del proveedor de hosting hasta definirlo. |

---

## 5. Checklist general

Ver `PROJECT_STATUS.md` para el detalle completo por fases. Estado actual resumido:

- [x] Fase 0 — Acceso y descubrimiento de Figma
- [x] Fase 1 — Arquitectura
- [x] Fase 2 — Design System (componentes base)
- [x] Fase 3 — Primera página (Home) — implementación completa; QA visual pixel-a-pixel pendiente (sin navegador disponible en este entorno)
- [ ] Fase 2 — Design System
- [ ] Fase 3 — Primera página (Home)
- [ ] Fase 4 — Páginas internas
- [ ] Fase 5 — Responsive global
- [ ] Fase 6 — SEO técnico
- [ ] Fase 7 — Performance
- [ ] Fase 8 — Accesibilidad
- [ ] Fase 9 — Integraciones (GA4, GSC, WhatsApp, redes)
- [ ] Fase 10 — CI/CD (GitHub Actions)
- [ ] Fase 11 — Hosting y dominio
- [ ] Fase 12 — QA final

---

## 6. Forma de trabajo acordada

- **Antes** de cada fase: explicar qué se va a hacer, qué archivos se van a modificar, qué resultado se espera.
- **Durante**: cambios técnicos menores no requieren confirmación previa; SÍ requieren confirmación: cambios significativos de diseño, eliminar algo del Figma, agregar funcionalidades no contempladas, introducir servicios pagos o infraestructura compleja, cambios importantes de arquitectura.
- **Después** de cada fase: reporte con Completado / Archivos importantes / Validaciones / Pendientes / Siguiente paso, y actualización de `CLAUDE.md` / `PROJECT_STATUS.md`.
- No se genera contenido comercial definitivo inventado. Todo placeholder debe quedar claramente identificado como tal (real vs. de Figma vs. provisional vs. recomendación).
- No se instala nada, no se contrata hosting/dominio, ni se despliega nada sin autorización explícita del usuario.

---

## 7. Historial de decisiones

_(Se irá completando a medida que se tomen decisiones de arquitectura/diseño/stack.)_

- **2026-09-18:** Proyecto iniciado. Carpeta vacía, sin git inicializado. Se documentan reglas del proyecto. Sin acceso a Figma todavía — desarrollo de UI bloqueado hasta obtenerlo.
- **2026-09-18:** Acceso a Figma obtenido vía API REST + Personal Access Token del usuario (archivo `TARGET-investigations`, file key `wNuM1O9AljP8HJUpOXFFro`). Auditoría de Fase 0 completada (estructura, contenido real, colores, tipografías, componentes). Usuario confirmó: (1) usar la versión "Moodboard" del frame Website como vigente, (2) el sitio es de una sola página con navegación por anclas, (3) interpolar el breakpoint tablet con criterio propio ante la ausencia de un frame de tablet en Figma. Ver sección Figma para el detalle completo.
- **2026-09-18:** Fase 1 completada (Astro + TS strict, ESLint/Prettier, design tokens, site.config, layout base, git init + commit inicial). Fase 2 completada: componentes del Design System (Container, Section, Button, Header, Footer, ValueBadges, StatBadges, AccordionItem/FaqAccordion, SocialLink), con íconos reales exportados de Figma (logo, 5 value badges, 4 redes sociales). Se documentaron 2 deviaciones de diseño (ver "Decisiones confirmadas" arriba): FAQ como acordeón vertical en vez de tablero masonry, y botón CTA con color sólido en vez del gradiente exacto de Figma.
- **2026-09-18:** Usuario preguntó por las diferencias entre el acceso vía API REST+Token (actual) y Dev Mode MCP Server; se concluyó que no hay limitación real de datos con el método actual (se verificó extrayendo el gradiente exacto del botón, que sí estaba disponible), y se decidió continuar con la API REST. Se aplicó el gradiente exacto del botón (`linear-gradient(90deg, #E9C37E 0%, #D4A95A 100%)`), resolviendo esa deviación. Fase 3 completada: se exportaron las fotos reales de Figma (hero, about, y las 2 fotos reutilizadas en las 9 tarjetas de servicio — confirmado que Figma reutiliza las mismas 2 imágenes en las 9 categorías), optimizadas automáticamente a WebP responsive vía `astro:assets`. Se ensambló el Home completo (Hero, Services, About, FAQs, Contact, Footer) con contenido 100% real. **Limitación de este entorno:** no hay navegador disponible para hacer QA visual pixel-a-pixel contra Figma; la implementación se validó con `check`/`lint`/`build`/`curl`, pero la comparación visual formal (Fase 24) queda pendiente.
