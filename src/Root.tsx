import React from "react";
import { Composition, continueRender, delayRender } from "remotion";
import subtitulos from "./datos/subtitulos.json";
import { cargarFuentes } from "./fuentes";
import { IntroYouTube } from "./plantillas/IntroYouTube";
import { Promo } from "./plantillas/Promo";
import { Reel } from "./plantillas/Reel";

// Espera a que carguen las fuentes antes de dibujar.
const espera = delayRender("Cargando fuentes");
cargarFuentes().then(() => continueRender(espera));

// =====================================================================
//  Acá se registran los videos del proyecto ("composiciones").
//  width x height = tamaño · fps = cuadros por segundo
//  durationInFrames = duración en cuadros (segundos x fps)
// =====================================================================
const FPS = 30;

const promoEjemplo = {
  gancho: "Tu pausa favorita del día",
  beneficios: ["Granos tostados cada semana", "Envío en 24 horas", "Suscripción flexible"],
  oferta: "20% off en tu primera bolsa",
  llamado: "Pide el tuyo",
  musicaArchivo: null,
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={FPS * 10}
      defaultProps={{
        videoArchivo: "ejemplo-vertical.mp4",
        gancho: "3 señales de un buen café ☕",
        subtitulos,
        musicaArchivo: null,
        volumenMusica: 0.12,
        llamadoFinal: "Síguenos para más",
      }}
    />
    <Composition
      id="IntroYouTube"
      component={IntroYouTube}
      width={1920}
      height={1080}
      fps={FPS}
      durationInFrames={FPS * 5}
      defaultProps={{ tituloEpisodio: "Cómo preparar café de filtro en casa", numeroEpisodio: "Episodio 1" }}
    />
    <Composition id="Promo" component={Promo} width={1920} height={1080} fps={FPS} durationInFrames={FPS * 10} defaultProps={promoEjemplo} />
    <Composition id="PromoVertical" component={Promo} width={1080} height={1920} fps={FPS} durationInFrames={FPS * 10} defaultProps={promoEjemplo} />
    <Composition id="PromoCuadrado" component={Promo} width={1080} height={1080} fps={FPS} durationInFrames={FPS * 10} defaultProps={promoEjemplo} />
  </>
);
