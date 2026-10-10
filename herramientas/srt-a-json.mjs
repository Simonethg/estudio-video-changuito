// Convierte un archivo de subtítulos .srt (por ejemplo, el que genera Whisper)
// al formato que usa la plantilla Reel (src/datos/subtitulos.json).
// Uso:  node herramientas/srt-a-json.mjs material/mi-video.srt
import fs from "node:fs";

const archivo = process.argv[2];
if (!archivo) {
  console.log("Uso: node herramientas/srt-a-json.mjs ruta/al/archivo.srt");
  process.exit(1);
}
const aSegundos = (t) => {
  const [h, m, resto] = t.trim().replace(",", ".").split(":");
  return Number(h) * 3600 + Number(m) * 60 + Number(resto);
};
const bloques = fs.readFileSync(archivo, "utf8").replace(/\r/g, "").split(/\n\n+/);
const lista = [];
for (const b of bloques) {
  const lineas = b.split("\n").filter(Boolean);
  const i = lineas.findIndex((l) => l.includes("-->"));
  if (i === -1) continue;
  const [desde, hasta] = lineas[i].split("-->").map(aSegundos);
  const texto = lineas.slice(i + 1).join(" ").trim();
  if (texto) lista.push({ desde: +desde.toFixed(2), hasta: +hasta.toFixed(2), texto });
}
fs.writeFileSync("src/datos/subtitulos.json", JSON.stringify(lista, null, 2) + "\n");
console.log(`Listo: ${lista.length} subtítulos guardados en src/datos/subtitulos.json`);
