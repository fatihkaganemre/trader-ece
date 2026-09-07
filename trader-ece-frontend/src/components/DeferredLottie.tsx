import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";

const Lottie = lazy(() => import("lottie-react"));

interface DeferredLottieProps {
  loadAnimation: () => Promise<{ default: object }>;
  style: CSSProperties;
}

export default function DeferredLottie({ loadAnimation, style }: DeferredLottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const loadAnimationRef = useRef(loadAnimation);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

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

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;
    void loadAnimationRef.current().then(({ default: data }) => {
      if (!cancelled) setAnimationData(data);
    });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  return (
    <div ref={ref} style={style} aria-hidden="true">
      {animationData && (
        <Suspense fallback={null}>
          <Lottie animationData={animationData} loop autoplay style={{ width: "100%", height: "100%" }} />
        </Suspense>
      )}
    </div>
  );
}