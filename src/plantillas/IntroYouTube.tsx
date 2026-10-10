import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fondo } from "../componentes/Fondo";
import { Logo } from "../componentes/Logo";
import { marca } from "../marca";

// =====================================================================
//  INTRO DE YOUTUBE 16:9 (1920 x 1080), 5 segundos
//  Cambia "tituloEpisodio" y "numeroEpisodio" en cada video.
// =====================================================================
export type PropsIntro = { tituloEpisodio: string; numeroEpisodio: string };

export const IntroYouTube: React.FC<PropsIntro> = ({ tituloEpisodio, numeroEpisodio }) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 12 } });
  const barra = interpolate(frame, [fps * 0.6, fps * 1.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titulo = spring({ frame: frame - fps * 1.1, fps, config: { damping: 16 } });
  const salida = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: salida }}>
      <Fondo />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: width * 0.02 }}>
        <div style={{ transform: `scale(${logo})` }}>
          <Logo alto={width * 0.07} />
        </div>
        <div style={{ height: 8, width: width * 0.4 * barra, backgroundColor: marca.colores.principal, borderRadius: 4 }} />
        <div
          style={{
            opacity: titulo,
            transform: `translateY(${(1 - titulo) * 40}px)`,
            fontFamily: marca.fuente,
            fontWeight: 800,
            fontSize: width * 0.042,
            color: marca.colores.claro,
            textAlign: "center",
            maxWidth: width * 0.75,
          }}
        >
          {tituloEpisodio}
        </div>
        <div style={{ opacity: titulo, fontFamily: marca.fuente, fontWeight: 400, fontSize: width * 0.018, color: marca.colores.principal, letterSpacing: 4 }}>
          {numeroEpisodio.toUpperCase()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
