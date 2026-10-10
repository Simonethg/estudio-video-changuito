import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { marca } from "../marca";

// Fondo animado suave: se usa cuando no hay video de fondo.
export const Fondo: React.FC = () => {
  const frame = useCurrentFrame();
  const angulo = interpolate(frame, [0, 300], [135, 225]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angulo}deg, ${marca.colores.oscuro} 0%, ${marca.colores.secundario} 100%)`,
      }}
    />
  );
};
