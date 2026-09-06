import { useEffect, useRef, useState } from "react";

interface DeferredBackgroundVideoProps {
  src: string;
  className: string;
}

export default function DeferredBackgroundVideo({ src, className }: DeferredBackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
