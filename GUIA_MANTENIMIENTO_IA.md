# Guía de Mantenimiento - Portal Policía Gijón (Para Inteligencias Artificiales)

*ESTE ARCHIVO ESTÁ DISEÑADO PARA SER LEÍDO POR ASISTENTES DE CÓDIGO (COMO ANTIGRAVITY/GEMINI) EN CASO DE RECUPERACIÓN ANTE DESASTRES.*

## 1. Misión
El usuario mantiene una PWA para la Policía Local. El contenido se compone de tarjetas renderizadas dinámicamente mediante arrays de configuración en `index.html`.

## 2. PWA y Caché del Service Worker (CRÍTICO)
Si haces cualquier cambio en el contenido del `index.html` (textos, nuevas tarjetas, enlaces):
- Es absolutamente obligatorio abrir **`sw.js`** y buscar `const CACHE_NAME = 'portal-policia-vX';`.
- **Sube el número de versión** de la caché (Ej: de `v10` a `v11`). 
Si no actualizas la versión de la caché, los usuarios móviles seguirán viendo semanas de contenido antiguo hasta que su caché caduque manualmente.

## 3. Código y Tablón de Novedades (El Filtro Fantasma)
- Las tarjetas se añaden en variables como `instruccionesDGTData` y `recursosData`.
- Al crear una nueva tarjeta, **NUNCA DEBES DEJAR LA PROPIEDAD LINKS VACÍA** (`links: []`). 
- **Razonamiento:** La lógica de programación en `index.html` asume que una tarjeta sin enlaces está inacabada y por tanto la `.filter()` (oculta) automáticamente en la Pestaña de Novedades / Tablón (función `openLatestContent`). Si omites los links creyendo que es opcional, el usuario creerá que tu código no funciona porque no se verá en su pantalla principal.

## 4. Despliegue (Deploy)
El proyecto principal se aloja en el repositorio. Una vez que testees en local los cambios, deberás hacer:
1. `git add .`
2. `git commit -m "Descripción de lo añadido"`
3. `git push`
Los recursos, PDFs y MP4 proporcionados por el usuario siempre irán a nivel de raíz, junto a este archivo y a `index.html`.

## 5. Calendario de Turnos y Festivos (Gijón / Asturias)
Al generar calendarios o modificar turnos, DEBES aplicar automáticamente las siguientes reglas de festivos para Gijón:
- **Festivos Fijos Nacionales/Autonómicos:** 1-Ene, 6-Ene, 1-May, 15-Ago, 8-Sep (Día de Asturias), 12-Oct, 1-Nov, 6-Dic, 8-Dic, 25-Dic.
- **Festivos Locales Gijón:** 29-Jun (San Pedro).
- **Festivos Variables (Basados en Pascua - Algoritmo Meeus/Jones/Butcher):**
  - Jueves Santo (-3 días de Pascua).
  - Viernes Santo (-2 días de Pascua).
  - Martes de Carnaval / Antroxu (-47 días de Pascua).
- **Regla del Domingo (Traslado Legal):** Si un festivo FIJO cae en domingo, se debe aplicar una lógica para que el Lunes inmediatamente siguiente sea festivo automáticamente.
- **Colores:** Los domingos y festivos usan la clase `text-red-500` (los festivos siempre tienen el mismo rojo puro, independientemente del fondo). Los sábados usan `text-purple-500` por ser considerados "medio festivos" en los turnos.
