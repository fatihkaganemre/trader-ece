import { useEffect, useRef, useState } from "react";

export default function TickerTape() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;
    const timer = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(timer);
  }, [isNearViewport]);

  useEffect(() => {
    if (!ready) return;
    if (document.getElementById("tv-ticker-tape-script")) return;

    const script = document.createElement("script");
    script.id = "tv-ticker-tape-script";
    script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [ready]);

  return (
    <div ref={ref} className="ticker-tape">
      {ready ? (
        // @ts-ignore
        <tv-ticker-tape symbols="TICKMILL:USTEC,TICKMILL:US30,TICKMILL:XAUUSD,TICKMILL:EURUSD,TICKMILL:USDJPY,TICKMILL:DE40,TICKMILL:XAGUSD,TICKMILL:BTCUSD,TICKMILL:ETHUSD" theme="dark" />
      ) : (
        <div className="ticker-tape__placeholder" aria-hidden="true" />
      )}
    </div>
  );
}