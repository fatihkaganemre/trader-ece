import { useEffect, useState } from "react";

export default function TickerTape() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

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
    <div className="ticker-tape">
      {ready ? (
        // @ts-ignore
        <tv-ticker-tape symbols="TICKMILL:USTEC,TICKMILL:US30,TICKMILL:XAUUSD,TICKMILL:EURUSD,TICKMILL:USDJPY,TICKMILL:DE40,TICKMILL:XAGUSD,TICKMILL:BTCUSD,TICKMILL:ETHUSD" theme="dark" />
      ) : (
        <div className="ticker-tape__placeholder" aria-hidden="true" />
      )}
    </div>
  );
}