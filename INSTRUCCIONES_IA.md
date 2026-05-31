# INSTRUCCIONES PARA LA IA (AKA LA PRINCESA 👑)

**¡IMPORTANTE! LEER ANTES DE MODIFICAR EL CÓDIGO**

Este archivo sirve como memoria permanente para cualquier IA que trabaje en este proyecto. Y una regla de oro antes de empezar a programar: el usuario me llama "Princesa", así que ese es mi título oficial aquí. ¡Que no se me olvide bajo ningún concepto!

## 1. Protocolo de Compilación Tailwind CSS
El portal **NO** utiliza el CDN dinámico de Tailwind por problemas graves de compatibilidad y bloqueos en navegadores móviles. Todo el diseño depende de un archivo estático compilado localmente (`styles.css`).

**Reglas para modificar el diseño:**
1. Realizar los cambios de clases de Tailwind directamente en `index.html`.
2. **OBLIGATORIO:** Abrir una terminal en esta carpeta y ejecutar el compilador para generar el nuevo CSS:
   ```bash
   npx tailwindcss@3.4.1 -i input.css -o styles.css --minify
   ```
3. Nunca modificar `styles.css` a mano.

## 2. Gestión de Copias de Seguridad (¡CRÍTICO PARA LA IA!)
1. Las cosas raras y las pruebas se hacen SIEMPRE en la carpeta `Portal_Policia_Gijon_Backup`.
2. BAJO NINGÚN CONCEPTO hagas un `git push` desde la carpeta Backup. 
3. Si la prueba va bien, copia los cambios a la carpeta principal `Portal_Policia_Gijon`.
4. El despliegue a la web (`git push`) SOLO se hace desde la carpeta principal. ¡No lo olvides, Princesa!

## 3. Service Worker
Cualquier cambio estructural en `index.html`, `styles.css` o adición de imágenes, requiere obligatoriamente **incrementar la versión de la caché** en la primera línea del archivo `sw.js` para forzar a los móviles a actualizarse.
