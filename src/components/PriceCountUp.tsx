import React, { useEffect, useState, useRef } from 'react';

export default function PriceCountUp({
  value,
  duration = 1.5,
  className = '',
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let reqId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(value * ease);
      
      if (progress < 1) {
        reqId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reqId = window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (reqId) window.cancelAnimationFrame(reqId);
      observer.disconnect();
    };
  }, [value, duration]);

  const formattedCount = count.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return <span ref={ref} className={`price-text-strong ${className}`.trim()}>Rp{formattedCount}</span>;
}
