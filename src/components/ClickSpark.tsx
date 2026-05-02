import React, { useState, useEffect, useRef } from "react";

interface Sparkle {
  id: string;
  x: number;
  y: number;
  angle: number;
  scale: number;
  velocity: number;
}

export default function ClickSpark({
  sparkColor = "#f59e0b",
  sparkSize = 8,
  sparkRadius = 30,
  sparkCount = 8,
  duration = 500,
}: {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const timeoutId = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const newSparkles = Array.from({ length: sparkCount }).map((_, i) => ({
        id: Math.random().toString(),
        x: clientX,
        y: clientY,
        angle: (360 / sparkCount) * i,
        scale: Math.random() * 0.5 + 0.5,
        velocity: Math.random() * 0.5 + 0.5,
      }));
      setSparkles(newSparkles);

      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => setSparkles([]), duration);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [sparkCount, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {sparkles.map((sparkle) => {
        const rad = (sparkle.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * sparkRadius * sparkle.velocity;
        const ty = Math.sin(rad) * sparkRadius * sparkle.velocity;

        return (
          <span
            key={sparkle.id}
            className="absolute block rounded-full"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkSize,
              height: sparkSize,
              backgroundColor: sparkColor,
              transform: `translate(-50%, -50%) scale(${sparkle.scale})`,
              animation: `click-spark-anim ${duration}ms cubic-bezier(0, 0, 0.2, 1) forwards`,
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
            } as React.CSSProperties}
          />
        );
      })}
      <style>{`
        @keyframes click-spark-anim {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
