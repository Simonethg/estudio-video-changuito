import React from "react";
import {
  AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Fondo } from "../componentes/Fondo";
import { Logo } from "../componentes/Logo";
import { Subtitulo, Subtitulos } from "../componentes/Subtitulos";
import { marca } from "../marca";

// =====================================================================
//  REEL / SHORT VERTICAL 9:16 (1080 x 1920)
//  - videoArchivo: nombre de tu clip dentro de /public (o null para fondo animado)
//  - gancho: frase grande de los primeros segundos
//  - subtitulos: lista con { desde, hasta, texto } en segundos
//  - musicaArchivo: nombre del audio dentro de /public (o null)
// =====================================================================
export type PropsReel = {
  videoArchivo: string | null;
  gancho: string;
  subtitulos: Subtitulo[];
  musicaArchivo: string | null;
  volumenMusica: number; // 0 a 1. Con voz, usa 0.08 a 0.15
  llamadoFinal: string;
};

export const Reel: React.FC<PropsReel> = ({
  videoArchivo, gancho, subtitulos, musicaArchivo, volumenMusica, llamadoFinal,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14 } });
  const salidaGancho = interpolate(frame, [fps * 2.2, fps * 2.6], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const inicioCierre = durationInFrames - fps * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: marca.colores.oscuro }}>
      {videoArchivo ? (
        <OffthreadVideo src={staticFile(videoArchivo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Fondo />
      )}
      {musicaArchivo ? <Audio src={staticFile(musicaArchivo)} volume={volumenMusica} /> : null}

      {/* Gancho de los primeros 2,5 segundos */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: width * 0.28 }}>
        <div
          style={{
            opacity: salidaGancho,
            transform: `translateY(${(1 - entrada) * 60}px)`,
            backgroundColor: marca.colores.principal,
            color: marca.colores.oscuro,
            fontFamily: marca.fuente,
            fontWeight: 800,
            fontSize: width * 0.07,
            padding: `${width * 0.02}px ${width * 0.045}px`,
            borderRadius: width * 0.03,
            maxWidth: width * 0.85,
            textAlign: "center",
          }}
        >
          {gancho}
        </div>
      </AbsoluteFill>

      <Subtitulos lista={subtitulos} />

      {/* Usuario fijo abajo */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: width * 0.12 }}>
        <div style={{ fontFamily: marca.fuente, fontWeight: 700, fontSize: width * 0.04, color: marca.colores.claro, opacity: 0.9 }}>
          {marca.usuario}
        </div>
      </AbsoluteFill>

      {/* Cierre con llamado a la acción */}
      <Sequence from={inicioCierre}>
        <Cierre texto={llamadoFinal} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Cierre: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const aparece = spring({ frame, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: marca.colores.oscuro,
        opacity: aparece,
        justifyContent: "center",
        alignItems: "center",
        gap: width * 0.05,
      }}
    >
      <Logo alto={width * 0.16} />
      <div style={{ fontFamily: marca.fuente, fontWeight: 800, fontSize: width * 0.07, color: marca.colores.principal, textAlign: "center", maxWidth: width * 0.85 }}>
        {texto}
      </div>
    </AbsoluteFill>
  );
};
