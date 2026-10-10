import React from "react";
import {
  AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Fondo } from "../componentes/Fondo";
import { Logo } from "../componentes/Logo";
import { marca } from "../marca";

// =====================================================================
//  PROMO ANIMADO (sirve en 16:9, 9:16 o 1:1: se adapta solo)
//  3 escenas: gancho -> beneficios -> llamado a la acción
// =====================================================================
export type PropsPromo = {
  gancho: string;
  beneficios: string[];
  oferta: string;
  llamado: string;
  musicaArchivo: string | null;
};

export const Promo: React.FC<PropsPromo> = ({ gancho, beneficios, oferta, llamado, musicaArchivo }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Fondo />
      {musicaArchivo ? <Audio src={staticFile(musicaArchivo)} volume={0.5} /> : null}
      <Sequence durationInFrames={fps * 3}>
        <EscenaGancho texto={gancho} />
      </Sequence>
      <Sequence from={fps * 3} durationInFrames={fps * 4}>
        <EscenaBeneficios lista={beneficios} />
      </Sequence>
      <Sequence from={fps * 7}>
        <EscenaLlamado oferta={oferta} llamado={llamado} />
      </Sequence>
    </AbsoluteFill>
  );
};

const base = (width: number, height: number) => Math.min(width, height);

const EscenaGancho: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const b = base(width, height);
  const palabras = texto.split(" ");
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: b * 0.08 }}>
      <div style={{ fontFamily: marca.fuente, fontWeight: 800, fontSize: b * 0.1, color: marca.colores.claro, textAlign: "center", lineHeight: 1.1 }}>
        {palabras.map((p, i) => {
          const s = spring({ frame: frame - i * 4, fps, config: { damping: 13 } });
          return (
            <span key={i} style={{ display: "inline-block", opacity: s, transform: `translateY(${(1 - s) * 50}px)`, marginRight: b * 0.025 }}>
              {p}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const EscenaBeneficios: React.FC<{ lista: string[] }> = ({ lista }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const b = base(width, height);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: b * 0.045, maxWidth: width * 0.86 }}>
      {lista.map((item, i) => {
        const s = spring({ frame: frame - i * 12, fps, config: { damping: 14 } });
        return (
          <div
            key={i}
            style={{
              opacity: s,
              transform: `translateX(${(1 - s) * -120}px)`,
              display: "flex", alignItems: "center", gap: b * 0.03,
              fontFamily: marca.fuente, fontWeight: 700, fontSize: b * 0.06, lineHeight: 1.15, color: marca.colores.claro,
            }}
          >
            <span style={{ flexShrink: 0, width: b * 0.045, height: b * 0.045, borderRadius: "50%", backgroundColor: marca.colores.principal, display: "inline-block" }} />
            {item}
          </div>
        );
      })}
      </div>
    </AbsoluteFill>
  );
};

const EscenaLlamado: React.FC<{ oferta: string; llamado: string }> = ({ oferta, llamado }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const b = base(width, height);
  const s = spring({ frame, fps, config: { damping: 12 } });
  const pulso = 1 + Math.sin(frame / 6) * 0.03;
  const brillo = interpolate(frame, [0, fps], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: b * 0.05 }}>
      <div style={{ transform: `scale(${s})` }}>
        <Logo alto={b * 0.16} />
      </div>
      <div style={{ opacity: brillo, fontFamily: marca.fuente, fontWeight: 800, fontSize: b * 0.08, color: marca.colores.principal, textAlign: "center" }}>
        {oferta}
      </div>
      <div
        style={{
          transform: `scale(${pulso})`,
          backgroundColor: marca.colores.principal, color: marca.colores.oscuro,
          fontFamily: marca.fuente, fontWeight: 800, fontSize: b * 0.05,
          padding: `${b * 0.02}px ${b * 0.06}px`, borderRadius: b * 0.05,
        }}
      >
        {llamado}
      </div>
      <div style={{ fontFamily: marca.fuente, fontWeight: 400, fontSize: b * 0.035, color: marca.colores.claro }}>{marca.web}</div>
    </AbsoluteFill>
  );
};
