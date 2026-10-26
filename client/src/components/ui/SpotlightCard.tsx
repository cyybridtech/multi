import type { PointerEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/** A CSS-only spotlight surface with pointer-positioned highlight. */
export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <div
      className={`spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
