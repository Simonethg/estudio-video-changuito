import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { marca } from "../marca";

export type Subtitulo = { desde: number; hasta: number; texto: string };

// Subtítulos estilo reel: aparecen con un pequeño "salto" y
// resaltan la palabra que se está diciendo.
export const Subtitulos: React.FC<{ lista: Subtitulo[]; posicion?: "abajo" | "centro" }> = ({
  lista,
  posicion = "abajo",
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const segundo = frame / fps;
  const actual = lista.find((s) => segundo >= s.desde && segundo < s.hasta);
  if (!actual) return null;

  const inicio = Math.round(actual.desde * fps);
  const salto = spring({ frame: frame - inicio, fps, config: { damping: 12 } });
  const palabras = actual.texto.split(" ");
  const avance = (segundo - actual.desde) / (actual.hasta - actual.desde);
  const activa = Math.min(palabras.length - 1, Math.floor(avance * palabras.length));

  return (
    <AbsoluteFill
      style={{
        justifyContent: posicion === "abajo" ? "flex-end" : "center",
        alignItems: "center",
        paddingBottom: posicion === "abajo" ? width * 0.42 : 0,
      }}
    >
      <div
        style={{
          transform: `scale(${0.85 + salto * 0.15})`,
          fontFamily: marca.fuente,
          fontWeight: 800,
          fontSize: width * 0.075,
          lineHeight: 1.15,
          textAlign: "center",
          maxWidth: width * 0.86,
          color: marca.colores.claro,
          textShadow: "0 6px 24px rgba(0,0,0,0.55)",
          WebkitTextStroke: `${width * 0.002}px rgba(0,0,0,0.6)`,
        }}
      >
        {palabras.map((p, i) => (
          <span key={i} style={{ color: i === activa ? marca.colores.principal : undefined }}>
            {p}{" "}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
