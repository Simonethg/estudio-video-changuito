import React from "react";
import { Img, staticFile } from "remotion";
import { marca } from "../marca";

export const Logo: React.FC<{ alto: number; style?: React.CSSProperties }> = ({ alto, style }) => (
  <Img src={staticFile(marca.logo)} style={{ height: alto, ...style }} />
);
