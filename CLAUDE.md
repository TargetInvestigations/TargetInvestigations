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
4. ~~Sección FAQ (Fase 2, 2026-09-18)~~ **Revertido (2026-09-19):** en Figma, las 20 preguntas existen como tarjetas sueltas de un tablero tipo masonry (~196px de ancho cada una, 5 filas × 4 columnas) dentro de un componente ("Group 39") que en la página real aparece colapsado por defecto (barra "FAQs"). Inicialmente se había reemplazado por una lista vertical estándar de acordeones por accesibilidad/legibilidad. El usuario pidió explícitamente que el tablero real (colapsable + hover por tarjeta) se implemente tal cual el diseño, así que se revirtió esa deviación y se reconstruyó fiel al Figma — ver decisión del 2026-09-19 en el historial para el detalle completo (`FaqPanel.astro`).
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
- [x] Fase 3 — Primera página (Home) — implementación completa; QA visual pixel-a-pixel en curso con el usuario
- [ ] Fase 4 — Páginas internas (no aplica como páginas separadas, ver decisión de sitio de una sola página)
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
- **2026-09-18:** Se instaló Playwright de forma aislada (fuera del proyecto, en el scratchpad de la sesión) para poder tomar capturas del `localhost:4321` y compararlas directamente contra las capturas de Figma. Esto permitió detectar y corregir 3 bugs reales de fidelidad visual:
  1. **Bug de `<details>`/`::details-content` en Chromium moderno:** el truco CSS-only para forzar "abierto" el Header nav y el zigzag de Services en desktop (`display:flex` en el hijo) no funcionaba, porque los navegadores actuales ocultan el contenido cerrado de `<details>` vía `content-visibility` en el pseudo-elemento `::details-content`, no solo con `display:none`. El nav del header y el contenido de las tarjetas de servicio literalmente no se veían en desktop. **Fix:** anular `::details-content { content-visibility: visible; block-size: auto; }` en el breakpoint desktop, en `Header.astro` y `ServiceItem.astro`.
  2. **Foto del Hero incorrecta:** se había usado el nodo de Figma equivocado (`53:61`, solo el skyline) en vez del nodo con la foto compuesta real (`174:113`, mujer + skyline con fondo transparente). Corregido en `src/images/hero.png`.
  3. **Orden mobile incorrecto en Hero y About:** en Figma mobile, el Hero muestra el lockup/tagline/botón ANTES de la foto (no después), y la sección About muestra el grid de stats ANTES de la bio y **sin foto visible** (la foto de About es solo para desktop). Corregido con reordenamiento de DOM + `order`/`grid-template-areas` en `Hero.astro` y `About.astro`. También se corrigió `ValueBadges.astro` para mostrar los 5 íconos en una sola fila también en mobile (antes era grid de 2 columnas).

  Ninguno de estos bugs era evidente sin comparación visual real — quedaron documentados aquí porque confirman el valor de tener acceso a navegador para QA, más allá de lo que decía el JSON de Figma.
- **2026-09-18:** El usuario comparó visualmente el Header contra Figma y reportó 3 diferencias puntuales. Se verificaron los 3 puntos contra los nodos exactos de Figma (nodo `53:490`, componente `48:831`, variante "Default" para el botón; nodo `53:481` para el contenedor del header) antes de corregir:
  1. **Botón "Confidential Consultation" del header:** en Figma este botón (distinto del CTA sólido del Hero, nodo `185:816`) es un componente separado sin relleno (`fills: []`), con borde de 1px `#B8935A` (dorado) y texto del mismo dorado, peso 500, 13px, mayúsculas, `letter-spacing` 0.78px — es decir, un botón "outline" navy/dorado, no el botón sólido dorado/navy que se estaba usando. **Fix:** se reutilizó la variante `ghost` de `Button.astro` (no usada hasta ahora en el proyecto) redefiniéndola exactamente con estos valores, y se cambió `Header.astro` de `variant="solid"` a `variant="ghost"`.
  2. **Links del nav (HOME/SERVICES/ABOUT/CONTACT) se veían "en negrita"/más pesados que en Figma:** el peso (500), tamaño (13px) y letter-spacing ya eran correctos (verificado contra el nodo real). La causa real es que en Figma el relleno de texto es blanco al **75% de opacidad**, no blanco puro — el contraste más alto de blanco 100% sobre navy hace que el mismo peso se perciba más grueso. **Fix:** `color: rgba(255,255,255,0.75)` en `.header__nav-link` (hover/focus siguen en dorado 100% opaco).
  3. **Barra dorada debajo del header:** no existe en Figma (`strokes: []` en el nodo del contenedor). Además, ese contenedor tiene un fondo navy semitransparente (86% opacidad) con `BACKGROUND_BLUR` de 7.6px — es un header "glass" sticky, no un panel navy sólido con borde. **Fix:** se quitó el `border-bottom` y se reemplazó `background-color: var(--color-bg)` por `rgba(11, 33, 63, 0.86)` + `backdrop-filter: blur(8px)` en `.header`.

  Verificado con captura de Playwright tras el fix (nav dorado outline, sin barra inferior, texto nav visualmente más liviano) y con `check`/`lint`/`build` limpios.
- **2026-09-18:** Se agregaron los estados hover definidos como interacciones de prototipo en Figma (no visibles en el JSON estático de nodos, solo en el campo `interactions` de cada instancia — hubo que consultarlos explícitamente):
  1. **Links del nav (nodos `53:486/487/489/142:233` → `CHANGE_TO` nodo `53:14`):** en hover el texto pasa a blanco 100% (no dorado) y aparece una barra `#E9C37E` de 2px debajo que crece de izquierda a derecha (`Smart Animate`, 0.3s). Implementado con un `::after` que anima `width` 0%→100%.
  2. **Botón "Confidential Consultation" del header (nodo `48:831` → `CHANGE_TO` nodo `48:833`):** en hover el fondo se rellena de dorado sólido (`--color-gold`) y el texto pasa a **blanco** (no navy). Corregido en `.button--ghost:hover`.
- **2026-09-18:** Revisión a fondo del Hero (nodo `53:60`) contra Figma — el usuario señaló que "el fondo, el logo/slogan, el botón y los value badges" se veían distintos. Se investigó cada nodo real antes de tocar código:
  1. **Fondo de ciudad:** el PNG usado (nodo `174:113`, `src/images/hero.png`) **ya es** un recorte ancho (1672×941, fondo transparente) pensado para ir de fondo a lo ancho de TODA la sección (incluida la fila de ValueBadges) — no para ir contenido en una columna de 50%. Estaba mal implementado, no mal exportado. **Fix:** en desktop (`min-width:1024px`) `.hero__photo` pasa a `position:absolute; inset:0` detrás de todo `.hero` (que envuelve Hero + ValueBadges), con `object-fit:cover; object-position:left center`, más un degradado oscuro inferior (aproximación de los nodos `53:62`/`187:844`, gradientes lineales navy que se desvanecen hacia arriba) para legibilidad de la fila de badges. En mobile se mantiene la imagen contenida en flujo normal (el frame mobile de Figma no tiene este bleed).
  2. **Lockup de marca:** medí los `absoluteBoundingBox` de cada nodo (ícono, "TARGET", "INVESTIGATIONS", línea, tagline, subtítulo, botón dentro del frame "Logo" `175:759`) y confirmé que **todo está centrado internamente** (offsets izquierda/derecha simétricos en cada uno) — no alineado a la izquierda como estaba implementado. También se descubrió que "TARGET"/el tagline usan la fuente **Cinzel** (no Fraunces) y "INVESTIGATIONS"/el subtítulo usan **Instrument Sans** (no Inter) — confirmado leyendo `style.fontFamily` de los nodos de texto reales. Se instalaron `@fontsource-variable/cinzel` y `@fontsource-variable/instrument-sans` (nuevas variables `--font-cinzel`/`--font-instrument` en `tokens.css`, sin reemplazar `--font-display`/`--font-body` porque el resto del sitio sigue en Fraunces/Inter). Se agregó el gradiente dorado vertical de "TARGET" (`background-clip:text`), la línea blanca difuminada bajo "INVESTIGATIONS", las 2 líneas doradas difuminadas a los lados del tagline, y los separadores de punto reales en el subtítulo (nodos `175:784/785`). *Omitido por alcance:* los 2 acentos decorativos tipo "sparkle" sobre la "A" y la "E" de TARGET (nodo `175:777`) y la textura de cielo secundaria (`179:813`, opacity 0.46) — decorativos y de bajo impacto frente al esfuerzo de replicarlos con precisión.
  3. **Botón CTA → WhatsApp en hover:** confirmado como interacción real de Figma (nodo `399:561` → `CHANGE_TO` `53:41`, no `185:816` que está `visible:false`/sin usar). Fondo pasa a `--color-gold-dark` (`#6C4E1F`, exacto), aparece ícono de WhatsApp + "+1 123 4567890" (placeholder real de Figma, mismo criterio que otros placeholders pendientes del cliente) en `--color-gold-light`, texto default desliza fuera. Implementado sin JS: un solo `<a>` con dos "caras" superpuestas (`opacity`/`transform` en `:hover`/`:focus-visible`) y `aria-label` estable para lectores de pantalla (evita que anuncien el texto oculto). Ícono exportado de Figma a `src/icons/whatsapp.svg`.
  4. **ValueBadges — línea conectora + reveal en hover:** confirmado en Figma (nodo `175:730 "Ellipse 4"`, línea con gradiente que se difumina en ambos extremos) y interacciones de hover por cada ícono (`175:694→175:640` y equivalentes) donde el círculo pasa de contorno a relleno sólido dorado + ícono blanco, la etiqueta se oculta (`opacity:0`) y la descripción aparece (era `opacity:0` por defecto en el propio Figma, no un truco nuestro). Se exportaron los 5 íconos "hover" reales (`value-*-hover.svg`) en vez de intentar invertir colores por CSS. También se corrigió el color de la etiqueta (`Discretion`, etc.) de `--color-cream` a `--color-gold-light`, que es el fill real del nodo (bug preexistente, no reportado por el usuario pero detectado al verificar el nodo). Solo aplica en desktop (hover no existe en mobile; el frame mobile de Figma no muestra descripciones).

  **Nota de proceso:** un primer intento agregó `overflow:hidden` a `.hero` en desktop para contener el fondo absoluto; esto recortaba el tooltip de descripción de ValueBadges (que necesita desbordar hacia abajo). Detectado con Playwright antes de reportar al usuario y corregido quitando esa propiedad (no hacía falta: el fondo `inset:0` ya queda contenido sin `overflow:hidden`).

  Todo verificado con Playwright (desktop + mobile + hover de botón + hover de badge) y `check`/`lint`/`build` limpios. **Pendiente de aprobación del usuario antes de comitear** (instrucción explícita: no comitear hasta confirmar que los cambios están bien hechos).
- **2026-09-18:** El primer intento de fondo a sangre (`object-fit:cover` + `object-position:left center` en `.hero__photo`, absolutamente posicionado a `inset:0` de todo `.hero`) tenía 3 problemas reales que el usuario detectó comparando en su propio navegador:
  1. **Cabeza recortada / posición horizontal distinta a Figma:** `object-fit:cover` recorta la imagen para llenar un contenedor cuyo aspect-ratio no coincide con el de la foto. Revisando los números reales de Figma (`Backgound 2` 174:113: 1549×871.78 dentro de una Section de 1549×1000) se confirmó que en Figma la imagen **no está recortada en absoluto** — solo escalada a ~0.93x (1672→1549) para caber en el ancho de la sección. **Fix:** se quitó `object-fit:cover`/`object-position` por completo; ahora la foto se muestra a `width:100%;height:auto` (su propio aspect-ratio, igual que en mobile), nunca se recorta.
  2. **Falta el aspecto "difuminado":** el nodo `174:113` tiene `opacity:0.7` en Figma (no 100%), y la propia `Section:53:60` tiene un fondo `GRADIENT_RADIAL` (`#35566f`→`#12243c`→`#000f26`) detrás de todas las capas. Al renderizar la foto al 100% de opacidad sin ese fondo detrás, se veía más plana/saturada que en el diseño. **Fix:** `.hero__photo` (contenedor) lleva ahora ese radial-gradient como `background`, y la `<img>` se pinta a `opacity:0.7` encima, dejando traslucir el degradado — reproduce el efecto de "luz difusa" del diseño.
  3. **Corte duro a azul plano debajo de los badges:** al forzar la foto a `position:absolute;inset:0` de `.hero` completo, la altura de `.hero` quedaba definida únicamente por el contenido en flujo normal (lockup + fila de badges), que es más corta que lo que el tooltip de descripción de ValueBadges necesita al desplegarse — el tooltip quedaba por fuera del área cubierta por la foto, sobre navy plano. **Fix de arquitectura:** se abandonó el fondo absoluto de sección completa. Ahora, en desktop, la foto vuelve a estar **en flujo normal** (define su propia altura vía su aspect-ratio real, sin recortes) y el lockup se superpone encima con `position:absolute` (anclado arriba, `.hero > .container:first-of-type`); la fila de ValueBadges queda **después** de la foto en el flujo, subida con `margin-top:-7rem` para solaparse con el borde inferior de la foto (donde está el degradado oscuro), tal como en Figma (el propio `Group 38` de badges se solapa con la parte baja de la imagen en los números reales). Esto también obligó a restaurar el orden de DOM correcto en mobile (lockup → foto → badges, que se había perdido sin querer al reescribir el componente esta misma sesión) — regresión detectada y corregida antes de que el usuario la notara.

  Verificado de nuevo con Playwright (desktop, mobile, hover de botón y de badge) y `check`/`lint`/`build` limpios. Seguía sin comitear a la espera de aprobación del usuario.
- **2026-09-18:** El enfoque "foto en flujo normal + `margin-top:-7rem` en ValueBadges" seguía sin cubrir el 100% de `.hero`: el usuario reportó que arriba no se distingue bien dónde empieza la foto respecto al navy de fondo, y abajo la foto seguía sin llegar al borde real de la sección (el `margin-top` negativo podía dejar la altura total de `.hero` por debajo de la altura de la foto, según cuánto midiera el propio contenido de ValueBadges). Pidió explícitamente: que la foto empiece en el borde superior del div y llegue exactamente hasta el borde inferior. **Fix de arquitectura (definitivo):** en vez de que el contenido determine la altura de `.hero`, ahora `.hero` tiene un `min-height: clamp(38rem, 52vw, 48rem)` explícito en desktop, y los 3 elementos (lockup, foto, ValueBadges) son `position:absolute` dentro de esa caja — la foto con `inset:0` (cubre exactamente el 100% de la altura, sin excepción), el lockup anclado arriba (`inset-block-start:0`), ValueBadges anclado abajo (`inset-block-end:2.5rem`). Como ninguno de los tres aporta altura al flujo, `.hero` mide exactamente lo que dice su `min-height`, y la foto (ahora sí con `object-fit:cover`) cubre esa caja de borde a borde siempre, sin depender de cuánto mida el contenido. Para evitar reintroducir el bug de "cabeza cortada" de la vez anterior, el recorte de `cover` usa `object-position: left top` (no `center`): el recorte, cuando hace falta, siempre sale por abajo/derecha (agua, cielo — contenido no crítico), nunca por arriba/izquierda (la cabeza). Verificado midiendo con Playwright que `.hero` y la foto miden exactamente lo mismo (728px en un viewport de 1400px de ancho) y que el hover del botón/badges sigue funcionando. `check`/`lint`/`build` limpios. Seguía sin comitear.
- **2026-09-18:** Sección de Servicios corregida contra Figma. El usuario mostró una captura de referencia (fondo navy, texto blanco, contenido con más margen lateral) vs. la implementación actual (fondo crema, pegada a los bordes). Verificado contra el nodo real de la Section de servicios (`53:138`): tiene un fill `GRADIENT_RADIAL` navy (`#0C2342`→`#02111F`), no crema — la sección se había armado con `tone="light"` por error. **Fix:** `tone="dark"` en `index.astro` (el resto de estilos de `ServiceItem`/`Services` ya heredan color por CSS custom properties, no hacía falta tocarlos). También se verificó el ancho real del contenido: el `Container` interno de esa sección en Figma (`53:140`) mide 1167px, no 1485px — se estaba usando `size="wide"` (92.8125rem) cuando el valor real está mucho más cerca de `size="default"` (75rem/1200px, el mismo que ya usan Hero/About/Footer). Cambiado a `size="default"`, lo que da el margen lateral extra que el usuario pedía ("no está tan pegado a los bordes"). De paso se encontró y agregó la línea divisoria dorada sólida entre Hero y Services (nodo `185:815`, rectángulo de 1549×3.5px, fill `#E9C37E`), visible en la captura de referencia del usuario y que no estaba implementada — agregada como `border-top` en `#services` (estilo scoped de `index.astro`). *Nota para el futuro:* hay un divisor con un estilo distinto (gradiente navy→dorado→navy) entre Services y About (nodo `227:1136`) — no se tocó todavía porque no era parte de este pedido, pero queda pendiente revisar cuando lleguemos a esa sección. Verificado con Playwright en desktop y mobile (el acordeón mobile no se vio afectado) y `check`/`lint`/`build` limpios. Sin comitear, a la espera de aprobación.
- **2026-09-18:** Tipografía y divisores de Servicios ajustados con medidas reales de Figma (nodos `53:145` kicker, `53:147` heading, `447:783` título de categoría, `447:786` descripción, `447:789` fila de bullet, `447:863` línea entre categorías):
  - Kicker "INVESTIGATIVE SERVICES": 19px (no 12.8px), `letter-spacing:0.23em` (no 0.08em), peso 700 — antes mucho más chico y menos tracked.
  - Heading "What situation are you facing?": 49px/peso 600 (no 28px) — en Figma el salto de línea no es manual, es que la caja de texto mide ~342px de ancho y el texto envuelve solo; se replicó con `max-width:22rem` en el contenedor a partir de 1024px.
  - Título de cada categoría (`service-item__title`): peso 600 explícito (Fraunces SemiBold), antes heredaba el peso normal.
  - Descripción de cada categoría: 14px (no 16px) a 77% de opacidad (no 85%) con `line-height:1.8` — de ahí el aspecto "más delgado y elegante" que notó el usuario; el tamaño más chico, no el peso (Figma usa Inter Regular 400 en ambos casos).
  - Bullets: se agregó `border-bottom: 1px solid rgba(255,255,255,0.06)` por ítem (línea delgada casi imperceptible entre renglones, tal como en el nodo real — Figma la tiene como stroke al 6% de opacidad).
  - Línea entre categorías de servicio: reemplazado el `border-bottom` sólido uniforme por un degradado de 3 paradas `navy→dorado(#E9C37E) al 52%→navy`, replicando el nodo `Vector` real (no es un borde de color/ancho uniforme, es un degradado que se "apaga" hacia los extremos).

  Verificado con Playwright (desktop y mobile) y `check`/`lint`/`build` limpios. Comiteado en `328904a`/`04a0664`/(commits de esta tanda) tras aprobación explícita del usuario ("Lo veo mucho mejor, commitea hasta este momento").
- **2026-09-19:** Sección About corregida contra 2 capturas de referencia del usuario (colapsada y expandida) más el nodo real de Figma (`322:1221`):
  1. **Fondo:** tiene su propio `GRADIENT_RADIAL` (`#0D2743`→`#021124`), distinto del navy plano `--color-bg` que usan Hero/Services — antes usaba el mismo tono plano de todas las secciones "dark". Aplicado como `background` en `#about` (ver nota técnica abajo).
  2. **"Show more" también debe revelar la foto:** en Figma el click en "Show More" (`ON_CLICK → CHANGE_TO` nodo `322:1096`) trae de vuelta tanto los párrafos extra del bio COMO la foto de Andrea — nuestra implementación ya tenía el `<details>` para el texto (de una fase anterior), pero la foto se mostraba siempre, sin depender del estado. **Fix:** `.about__photo{display:none}` por defecto en desktop, revelada con `.about__grid:has(.about__more[open]) .about__photo{display:block}` (CSS puro, sin JS, usando `:has()`). De paso se cambió la etiqueta del toggle para que diga "Show less" cuando está abierto (dos spans, se alterna por CSS con `[open]`).
  3. **Cita faltante:** la captura de referencia muestra una cita ("Our goal is simple...") con borde izquierdo dorado, siempre visible (no depende del acordeón), que no estaba implementada — agregada como `<blockquote class="about__quote">`.
  4. **Línea entre Services y About:** ver nota técnica abajo — nodo `227:1136`, degradado navy→dorado(`--color-gold`, no `--color-gold-light`)→navy.

  **Nota técnica importante (bug de scoping de Astro):** al intentar aplicar los estilos de `#services`/`#about` (fondo, bordes) desde un `<style>` en `index.astro`, el CSS compilado NO se aplicaba a pesar de verse sintácticamente correcto — `check`/`lint`/`build` no lo detectan porque es válido, solo falla en tiempo de ejecución. Diagnosticado inspeccionando los atributos `data-astro-cid-*` reales del DOM: el `<section>` que renderiza `<Section>` lleva el hash de scope de **Section.astro**, no el de `index.astro` — el scoping de Astro NO se propaga al elemento raíz devuelto por un componente hijo invocado en la plantilla. Esto significa que el fix de la línea `#services` aplicado en el commit anterior (`d9c2599`/`04a0664`, sección "línea divisoria dorada sólida entre Hero y Services") **nunca llegó a renderizar** — pasó desapercibido porque no rompía nada (`check`/`lint`/`build` no verifican esto). **Fix:** usar `:global(#services)`/`:global(#about)` en el `<style>` de `index.astro`. **Regla para el futuro:** cualquier selector en el `<style>` de una página/componente que apunte al elemento raíz devuelto por OTRO componente (vía `id`/`class` pasado como prop, no maquetado directo en ese archivo) necesita `:global()`; si no, Astro lo compila igual (sin error) pero nunca hace match en el DOM real. Guardado también en memoria persistente para futuras sesiones.

  Verificado con Playwright (desktop y mobile, colapsado y expandido) y `check`/`lint`/`build` limpios. Sin comitear, a la espera de aprobación — y pendiente re-confirmar visualmente que la línea `#services` (que ahora sí renderiza por primera vez) se vea bien, ya que antes nunca se había visto realmente.
- **2026-09-19:** El usuario dio una segunda ronda de correcciones sobre About comparando 2 capturas más (colapsada/actual una al lado de la otra). Se verificaron todos los puntos contra el nodo real (`I322:1221;322:1337` contenedor de texto, `I322:1221;322:1347` panel de stats, `322:1343` heading, `322:1341` kicker):
  1. **Heading y kicker deben ir a la izquierda, heading mucho más grande (44px, no 28px), sin cursiva/dorado parcial:** el texto completo "Built on one simple principle: the truth doesn't negotiate." tiene un solo fill blanco sólido en Figma — el `<em>` dorado-cursiva que teníamos era una invención de una fase anterior nunca verificada contra este nodo específico. Quitado el `<em>`, texto plano, `text-align:left`, `font-size:2.75rem`.
  2. **"Meet Andrea Roa" en dorado:** confirmado — `.about__lead` (compartida con "More Than an Investigation"/"Our Commitment") pasó de `--color-cream` a `--color-gold`.
  3. **Columnas del grid ~iguales, no 2fr/1fr:** medido en Figma — contenedor de texto y contenedor de stats miden **560px cada uno** dentro de un contenedor de 1200px (80px de gap) — prácticamente 1:1. Cambiado a `grid-template-columns: 1fr 1fr; gap: 1.5rem 5rem;`.
  4. **Panel de stats mal:** faltaba el mapa de Florida y el contenido/orden real. Se exportó de Figma el contorno real (unión de los 67 condados, nodo `Union` dentro de `I322:1221;322:1374`) a `src/icons/florida-map.svg`. Reescrito `StatBadges.astro` con los 4 valores reales y su jerarquía tipográfica exacta: valor grande (Fraunces 600, dorado), etiqueta (Inter 28pt SemiBold 14px, crema), leyenda en cursiva dorada al 60% opacidad — antes solo había value+label genéricos sin leyenda ni mapa. Nuevo token `--color-navy-card:#163155` para el fondo de cada celda (antes usaban `--color-bg`, mismo tono que el resto de la página).
  5. **"Our goal is simple..." (la cita) va en la columna derecha, debajo del panel de stats — no en la columna de texto:** reordenado el grid a `grid-template-areas: 'text stats' 'text quote' 'text photo'`.
  6. **"Andrea understands..." debe ser visible por defecto, no parte de "Show more":** estaba como primer párrafo DENTRO del `<details>` desde una fase anterior. Movido fuera, como tercer párrafo siempre visible; el `<details>` ahora solo envuelve "More Than an Investigation" en adelante (+ la foto, vía el `:has()` ya implementado).
  7. **`siteConfig.company.coverageArea`** actualizado al texto real y completo de Figma ("Boca Raton, West Palm Beach, surrounding areas, and South Florida" — antes era una paráfrasis reordenada); esto también mejora la meta description y el Footer, que reutilizan el mismo campo.

  **Nota técnica (recurrencia del bug de caché de Vite/Astro):** el nuevo CSS de `StatBadges.astro` (un `display:flex` que nunca aparecía en `document.styleSheets`) resultó ser el MISMO tipo de problema que la nota técnica anterior, pero esta vez es un bug de caché del servidor de dev (`node_modules/.vite`/`.astro` desincronizados tras muchas ediciones seguidas en una sesión larga), no un error de scoping — el archivo en disco era correcto. Se resolvió matando el proceso de `astro dev`, borrando `node_modules/.vite`, `.astro` y `dist`, y reiniciando. Ya pasó 2 veces en esta sesión (antes con `index.astro`/`#about`, ahora con `StatBadges.astro`) — documentado en memoria persistente como algo a probar primero si un cambio que se ve bien en el código fuente no aparece al verificar con Playwright.

  Verificado con Playwright (desktop, mobile, colapsado, expandido) y `check`/`lint`/`build` limpios. Aprobado por el usuario y comiteado en `01f1e91`.
- **2026-09-19:** Sección FAQs reconstruida desde cero para que coincida exactamente con Figma (el usuario pidió explícitamente "quiero que quede exacto como el diseño original", revirtiendo la deviación de accesibilidad documentada en la decisión del 2026-09-18 sección 4, que había reemplazado el tablero real por una lista de acordeón vertical). Se investigó el nodo real completo (`200:876` instancia cerrada / `200:872` variante abierta, dentro de "Group 39" en el Website frame) antes de tocar código:
  1. **Estructura real:** no es un acordeón vertical — es un panel colapsable (barra dorada "FAQs" + flecha) que al hacer click (`ON_CLICK → CHANGE_TO`, Smart Animate 0.3s) despliega un tablero de **20 preguntas en 5 filas × 4 columnas**, cada fila una barra navy independiente con separadores verticales dorados de 1px entre columnas, todo sobre un fondo dorado.
  2. **Dos tonos de dorado distintos:** la barra cerrada usa `--color-gold-light` (`#E9C37E`); al abrirse, el fondo de TODO el panel (barra + tablero) cambia a `--color-gold` (`#B8935A`, más oscuro) — confirmado comparando los `fills` de ambas variantes del componente. No es el mismo color en los dos estados, aunque a simple vista en una captura pequeña podían confundirse.
  3. **Revelado de respuesta = hover real por tarjeta, no un acordeón:** cada una de las 20 tarjetas (`216:384` y análogos) tiene una interacción `ON_HOVER → CHANGE_TO` hacia una variante donde el texto de respuesta (Inter Medium Italic 13px, blanco) pasa de `opacity:0` a `opacity:1` y la tarjeta crece de alto (ej. 44px → 172px) — confirmado inspeccionando ambas variantes del componente (`216:384` cerrado vs `216:351` abierto) nodo por nodo. Implementado 100% en CSS (sin JS) con la técnica `grid-template-rows: 0fr → 1fr` + `opacity`, activada en `:hover` y `:focus-within` (mismo patrón que ya usa `ValueBadges.astro`); se usó un `<button>` real (no `<details>` anidado) para la pregunta, evitando así el bug ya documentado de `::details-content` con `content-visibility` en Chromium.
  4. **"FAQs" (título):** Fraunces SemiBold 44px, color navy (`--color-bg`), no el tamaño/centrado genérico que tenía antes. Flecha: rotación real medida en Figma es exactamente 180° entre cerrado (▽) y abierto (△), confirmado leyendo el campo `rotation` de ambas variantes del vector (`-π` vs `~0`).
  5. **Ancho de contenido real:** las filas del tablero miden 1090px dentro de un frame de 1549px (¬234px de inset cada lado) — no coincide con ningún `Container` existente del design system (`default`=1200px, `narrow`=800px, `wide`=1485px), así que se definió localmente en `FaqPanel.astro` (`max-width:68.125rem`) en vez de agregar una variante de `Container` de un solo uso.
  6. **Mobile:** Figma no define un estado "abierto" para el frame mobile (440px) — solo existe la barra cerrada (mismo patrón gold-light/navy/Fraunces, ya replicado a escala). Se decidió apilar las 4 preguntas de cada fila en una sola columna (en vez de 4 columnas ilegibles a 440px), conservando la agrupación visual en bloques navy con separador dorado entre bloques — decisión de responsive propia, no un diseño aprobado por el cliente, documentada aquí como tal (mismo criterio que la interpolación de tablet).
  7. **Limpieza:** `AccordionItem.astro` y `FaqAccordion.astro` quedaron sin uso tras este cambio (nada más los importaba) y se eliminaron en vez de dejarlos huérfanos.

  Verificado con Playwright (desktop: colapsado/expandido/hover de una tarjeta; mobile: colapsado/expandido) y `check`/`lint`/`build` limpios. Sin comitear, a la espera de aprobación.
