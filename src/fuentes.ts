import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Carga las fuentes incluidas en /public/fuentes (licencia libre OFL).
export const cargarFuentes = () =>
  Promise.all([
    loadFont({ family: "Poppins", url: staticFile("fuentes/Poppins-Regular.ttf"), weight: "400" }),
    loadFont({ family: "Poppins", url: staticFile("fuentes/Poppins-Bold.ttf"), weight: "700" }),
    loadFont({ family: "Poppins", url: staticFile("fuentes/Poppins-ExtraBold.ttf"), weight: "800" }),
  ]);
