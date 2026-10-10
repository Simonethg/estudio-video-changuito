// Configuración de render. Si no sabes qué es esto, no lo toques :)
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Calidad: un número más bajo = mejor calidad y archivo más pesado (18 a 23 es un buen rango).
Config.setCrf(20);
