import { MeshGradient } from "@paper-design/shaders-react";
import type { ReactNode } from "react";

interface BackgroundShaderProps {
  children?: ReactNode;
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  className?: string;
}

export default function BackgroundShader({
  children,
  colors = [
    "hsl(0, 0%, 11%)",      // Dark gray (similar to #1C1C1C)
    "hsl(0, 0%, 20%)",      // Medium dark gray
    "hsl(28, 42%, 43%)",    // Accent brown (#9C7248)
    "hsl(32, 32%, 68%)",    // Tan (#CCAD8F)
  ],
  distortion = 0.8,
  swirl = 0.1,
  speed = 1,
  className = "",
}: BackgroundShaderProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          distortion={distortion}
          swirl={swirl}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={speed}
          colors={colors}
        />
      </div>

      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
