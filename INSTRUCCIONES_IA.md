# INSTRUCCIONES PARA LA IA

**¡IMPORTANTE! LEER ANTES DE MODIFICAR EL CÓDIGO**

Este archivo sirve como memoria permanente para cualquier IA que trabaje en este proyecto, asegurando que las reglas críticas se mantengan incluso si el proyecto se clona en un ordenador nuevo.

## 1. Protocolo de Compilación Tailwind CSS
El portal **NO** utiliza el CDN dinámico de Tailwind por problemas graves de compatibilidad y bloqueos en navegadores móviles. Todo el diseño depende de un archivo estático compilado localmente (`styles.css`).

**Reglas para modificar el diseño:**
1. Realizar los cambios de clases de Tailwind directamente en `index.html`.
2. **OBLIGATORIO:** Abrir una terminal en esta carpeta y ejecutar el compilador para generar el nuevo CSS:
   ```bash
   npx tailwindcss@3.4.1 -i input.css -o styles.css --minify
   ```
3. Nunca modificar `styles.css` a mano.

## 2. Gestión de Copias de Seguridad
Siempre se debe probar cualquier cambio en la carpeta `Portal_Policia_Gijon_Backup` antes de pasarlo a esta carpeta principal (Producción) y hacer el `git push` a GitHub.

## 3. Service Worker
Cualquier cambio estructural en `index.html`, `styles.css` o adición de imágenes, requiere obligatoriamente **incrementar la versión de la caché** en la primera línea del archivo `sw.js` para forzar a los móviles a actualizarse.
