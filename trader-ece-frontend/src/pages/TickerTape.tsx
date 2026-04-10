import { useEffect } from "react";

export default function TickerTape() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="ticker-tape">
      {/* @ts-ignore */}
      <tv-ticker-tape symbols="TICKMILL:USTEC,TICKMILL:US30,TICKMILL:XAUUSD,TICKMILL:EURUSD,TICKMILL:USDJPY,TICKMILL:DE40,TICKMILL:XAGUSD,TICKMILL:BTCUSD,TICKMILL:ETHUSD" theme="dark"/>
    </div>
  );
}