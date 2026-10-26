import { useEffect, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/** Lightweight Count Up animation inspired by React Bits Count Up. */
export default function CountUp({
  to,
  from = 0,
  duration = 700,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      duration <= 0
    ) {
      setValue(to);
      return;
    }

    let frame = 0;
    let timeout = 0;
    const startedAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startedAt) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delay, duration, from, to]);

  return (
    <span className={className}>
      {prefix}
      {Math.round(value).toLocaleString("en-GH")}
      {suffix}
    </span>
  );
}
