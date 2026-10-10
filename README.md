# 🎬 Editor de video con IA · Plantilla del curso

Plantilla del curso **"Tu estudio de video, dirigido por Grok Bot"** (Reels, YouTube y promos animados con Cursor + Grok Bot) de **AcademiaQA**.

Con esta carpeta vas a crear tres tipos de video conversando con un agente de IA:

| Plantilla | Formato | Tamaño | Para qué sirve |
|---|---|---|---|
| **Reel** | Vertical 9:16 | 1080 × 1920 | Reels, TikTok y Shorts con gancho, subtítulos animados, música y cierre |
| **IntroYouTube** | Horizontal 16:9 | 1920 × 1080 | Intro de 5 segundos con tu logo y el título del episodio |
| **Promo** / **PromoVertical** / **PromoCuadrado** | 16:9, 9:16 y 1:1 | — | Promo animado de 10 segundos: gancho → beneficios → oferta |

La marca de ejemplo es **Café Aurora** (inventada). En el curso la cambias por la tuya en un minuto.

---

## ✅ Antes de empezar

Necesitas:
1. **Cursor** instalado y con sesión iniciada (plan Pro, USD 20/mes).
2. Una cuenta de **GitHub** (gratis).
3. Esta carpeta descargada y **descomprimida** en un lugar fácil, por ejemplo `Documentos/editor-video-ia`.

> 💡 Todo lo que dice "pídele al agente" se escribe en el chat del agente de Cursor (panel lateral). Las lecciones del Módulo 2 te muestran dónde está.

---

## Paso 1 · Abrir la carpeta en Cursor
1. Abre Cursor.
2. Menú **File → Open Folder** (en Mac también puede decir **Open…**).
3. Elige la carpeta `editor-video-ia` y presiona **Abrir / Open**.
4. A la izquierda vas a ver la lista de archivos. ¡Listo, ese es tu proyecto!

## Paso 2 · Instalar lo necesario (una sola vez)
El proyecto necesita **Node.js** (el "motor" que ejecuta Remotion) y **FFmpeg** (la navaja suiza del video).
Copia y pega este mensaje en el chat del agente:

```
Hola. No sé programar. Revisa si en esta computadora están instalados Node.js (versión 18 o más nueva) y FFmpeg.
Si falta alguno, guíame paso a paso para instalarlo en mi sistema operativo, con la opción gratuita y oficial.
Después ejecuta "npm install" en este proyecto y dime en una frase si salió bien.
```

El agente te va a mostrar comandos y te va a pedir permiso para ejecutarlos: léelos y acepta.

## Paso 3 · Ver la vista previa (Remotion Studio)
Pídele al agente:
```
Ejecuta "npm run estudio" y dime qué dirección tengo que abrir en el navegador.
```
> ⏳ La primera vez que abres el estudio o exportas, Remotion descarga un componente de unos 100 MB (un navegador interno para dibujar los cuadros). Tarda unos minutos y solo pasa una vez.

Se abre **Remotion Studio** en tu navegador (normalmente `http://localhost:3000`). A la izquierda eliges el video (Reel, IntroYouTube, Promo…) y con ▶️ lo reproduces.

## Paso 4 · Poner tu marca
Abre `src/marca.ts` y cambia los textos entre comillas, o pídele al agente:
```
Cambia la marca de ejemplo por la mía en src/marca.ts:
nombre "MI MARCA", usuario "@miusuario", web "miweb.com",
colores: principal #XXXXXX, oscuro #XXXXXX, claro #XXXXXX.
Mi logo está en public/mi-logo.png. No cambies nada más.
```

## Paso 5 · Usar tus propios clips
1. Copia tus clips a la carpeta `public` (para el reel) o a una carpeta `material-crudo` (originales).
2. Usa nombres **sin espacios ni tildes**: `toma01-producto.mp4`.
3. Pídele al agente lo que necesites. Ejemplo:
```
Usa public/toma01-producto.mp4 en la plantilla Reel. Gancho: "3 errores al preparar café".
Duración: la del clip. Muéstrame un cuadro de prueba antes de renderizar todo.
```

## Paso 6 · Exportar (render)
| Para crear… | Pídele al agente que ejecute | Archivo que obtienes |
|---|---|---|
| Reel | `npm run reel` | `salida/reel.mp4` |
| Intro YouTube | `npm run intro` | `salida/intro-youtube.mp4` |
| Promo horizontal | `npm run promo` | `salida/promo.mp4` |
| Promo vertical | `npm run promo-vertical` | `salida/promo-vertical.mp4` |
| Imagen de prueba | `npm run prueba` | `salida/prueba-reel.png` |

## Paso 7 · Subir tu proyecto a GitHub (tu copia de seguridad)
Pídele al agente:
```
Quiero guardar este proyecto en GitHub. Guíame paso a paso para crear un repositorio privado
llamado "editor-video-ia" en mi cuenta, conectar esta carpeta y subir los cambios.
Explícame cada paso en una frase.
```
Los videos de `salida/` y `material-crudo/` **no se suben** (pesan mucho): guárdalos en tu disco o en Drive.

---

## 🗺️ Qué hay en cada carpeta
```
editor-video-ia/
├── src/
│   ├── marca.ts              ← tu marca: nombre, colores, logo (¡empieza acá!)
│   ├── Root.tsx              ← la lista de videos y sus textos
│   ├── plantillas/           ← Reel, IntroYouTube y Promo
│   ├── componentes/          ← piezas reutilizables (subtítulos, logo, fondo)
│   └── datos/subtitulos.json ← subtítulos del reel
├── public/                   ← clips, música, logo y fuentes que usan los videos
├── herramientas/
│   ├── ffmpeg-recetas.md     ← 12 recetas para cortar, recortar, unir, comprimir…
│   └── srt-a-json.mjs        ← convierte subtítulos .srt al formato del reel
├── brief-plantilla.md        ← la página para planificar cada proyecto
├── AGENTS.md                 ← instrucciones para que el agente te hable simple y cuide tu plan
└── salida/                   ← aquí aparecen tus videos exportados
```

## 💸 Cuida tu plan de Cursor (USD 20/mes)
- Usa los modelos **Auto** o **Composer** para el día a día. Reserva los modelos más potentes (como Opus) para un problema puntual que no se resuelve.
- Pide **una cosa por mensaje**, con formato, duración y archivo exacto.
- Prueba primero con **un cuadro** (`npm run prueba`) y después renderiza todo.
- Abre un **chat nuevo** para cada tarea nueva: los chats muy largos consumen más.
- Revisa tu consumo en el panel de Cursor (cursor.com → Dashboard → Spending).

## 🆘 Si algo falla
Copia el mensaje de error completo y pégalo en el chat con esta frase:
```
Me apareció este error. Explícamelo en una frase simple y arréglalo con el cambio más chico posible.
```
Problemas comunes:
- **"npm no se reconoce" / "command not found: npm"** → falta Node.js o hay que cerrar y abrir Cursor después de instalarlo.
- **"ffmpeg no se reconoce"** → falta FFmpeg o no quedó en el PATH: pídele al agente que lo revise.
- **El video sale negro o sin mi clip** → revisa que el archivo esté en `public/` y que el nombre coincida exacto.
- **El puerto 3000 está ocupado** → el estudio ya está abierto en otra pestaña o el agente puede usar otro puerto.

## 📜 Licencias
- **Remotion**: gratis para personas, empresas con hasta 3 empleados y organizaciones sin fines de lucro (también para uso comercial). Empresas más grandes necesitan una licencia de empresa: https://www.remotion.dev/license
- **Poppins**: SIL Open Font License (libre). Ver `public/fuentes/LICENCIA-FUENTES.txt`.
- Los clips de ejemplo de `public/` son generados por computadora y libres de uso.
- **Música**: usa solo música propia o con licencia libre (por ejemplo, la Biblioteca de audio de YouTube). Guarda el comprobante de la licencia.

---
Hecho con 💙 por **AcademiaQA** · info@academiaqa.com
