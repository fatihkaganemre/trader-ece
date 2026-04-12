export type BrokerLocale = "tr" | "en" | "th" | "id" | "vi" | "zh";

const TICKMILL_TR_LINK =
  "https://my.qatr-tickmill.com/tr/login?utm_campaign=ib_link&utm_content=IB54180972&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.qatr-tickmill.com%2Ftr%2Fsign-up%2F";

const TICKMILL_GLOBAL_LINK =
  "https://my.tickmill.com/?utm_campaign=ib_link&utm_content=IB54180972&utm_medium=ibdashboardrlw&utm_source=link&lp=https%3A%2F%2Fwww.tickmill.com%2Fpromotions%2Fwelcome-account";

const HFM_LINKS: Record<BrokerLocale, string> = {
  tr: "https://www.hfm.com/sv/en/?refid=365189",
  en: "https://www.hfm.com/sv/en/?refid=365189",
  th: "https://www.hfm.com/sv/en/?refid=365189",
  id: "https://www.hfmtrade-ind.com/sv/en/?refid=365189",
  vi: "https://www.hfreg-vn.com/sv/en/?refid=365189",
  zh: "https://www.hfm-chn.com/sv/en/?refid=365189",
};

export function resolveBrokerLocale(language: string): BrokerLocale {
  const currentLang = language.toLowerCase();

  if (currentLang.startsWith("tr")) return "tr";
  if (currentLang.startsWith("zh")) return "zh";
  if (currentLang.startsWith("id")) return "id";
  if (currentLang.startsWith("vi")) return "vi";
  if (currentLang.startsWith("th")) return "th";

  return "en";
}

export function getBrokerLinks(language: string) {
  const locale = resolveBrokerLocale(language);

  return {
    locale,
    tickmillLink: locale === "tr" ? TICKMILL_TR_LINK : TICKMILL_GLOBAL_LINK,
    hfmLink: HFM_LINKS[locale],
  };
}
