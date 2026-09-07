import { mkdir, readFile, writeFile } from "node:fs/promises";

const CYRILLIC_TO_LATIN = {
  А: "A", а: "a", Б: "B", б: "b", В: "V", в: "v", Г: "G", г: "g", Д: "D", д: "d",
  Ђ: "Đ", ђ: "đ", Е: "E", е: "e", Ж: "Ž", ж: "ž", З: "Z", з: "z", И: "I", и: "i",
  Ј: "J", ј: "j", К: "K", к: "k", Л: "L", л: "l", Љ: "Lj", љ: "lj", М: "M", м: "m",
  Н: "N", н: "n", Њ: "Nj", њ: "nj", О: "O", о: "o", П: "P", п: "p", Р: "R", р: "r",
  С: "S", с: "s", Т: "T", т: "t", Ћ: "Ć", ћ: "ć", У: "U", у: "u", Ф: "F", ф: "f",
  Х: "H", х: "h", Ц: "C", ц: "c", Ч: "Č", ч: "č", Џ: "Dž", џ: "dž", Ш: "Š", ш: "š",
};

const PROTECTED_TERMS = [
  "{{year}}", "Trader ECE", "Tickmill", "HFM", "HF Markets", "HotForex", "Bullex",
  "Telegram", "WhatsApp", "Forex", "CFD", "IB", "Affiliate", "FCA", "CySEC", "DFSA",
  "FSC", "MT4", "MT5", "VPN", "Meta", "USD", "XAUUSD", "EURUSD", "USDJPY",
];

function protectTerms(value) {
  const replacements = [];
  const pattern = new RegExp(PROTECTED_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi");
  const text = value.replace(pattern, (term) => {
    const token = `[[TERM_${replacements.length}]]`;
    replacements.push(term);
    return token;
  });
  return { text, replacements };
}

function restoreTerms(value, replacements) {
  return value.replace(/\[\[\s*TERM_(\d+)\s*\]\]/gi, (_, index) => replacements[Number(index)] ?? _);
}

function transliterateMontenegrin(value) {
  return [...value].map((character) => CYRILLIC_TO_LATIN[character] ?? character).join("");
}

function normalizeMontenegrin(value) {
  return transliterateMontenegrin(value)
    .replace(/\{\{iear\}\}/gi, "{{year}}")
    .replace(/Tikmil/gi, "Tickmill")
    .replace(/Bulleks/gi, "Bullex")
    .replace(/VhatsApp/gi, "WhatsApp")
    .replace(/HotForek/gi, "HotForex")
    .replace(/CiSEC/gi, "CySEC")
    .replace(/\bnaloga\b/gi, "računa")
    .replace(/\bnalog\b/gi, "račun");
}

async function translate(value, target) {
  if (!value.trim() || /^[-+]?\d+(?:[.,]\d+)?(?:[A-Z+%$]|\s)*$/.test(value)) return value;
  const { text, replacements } = protectTerms(value);
  const input = target === "cnr" ? value : text;

  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", input);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation failed for ${target}: ${response.status}`);
  const data = await response.json();
  const translated = data[0].map(([text]) => text).join("");
  const restored = restoreTerms(translated, replacements);
  return target === "cnr" ? normalizeMontenegrin(translated) : restored;
}

async function translateNode(value, target) {
  if (typeof value === "string") return translate(value, target);
  if (Array.isArray(value)) return Promise.all(value.map((item) => translateNode(item, target)));

  const entries = await Promise.all(Object.entries(value).map(async ([key, nestedValue]) => [key, await translateNode(nestedValue, target)]));
  return Object.fromEntries(entries);
}

const source = JSON.parse(await readFile("src/locales/en/translation.json", "utf8"));
for (const [locale, target] of [["ru", "ru"], ["cnr", "cnr"]]) {
  const translation = await translateNode(source, target);
  await mkdir(`src/locales/${locale}`, { recursive: true });
  await writeFile(`src/locales/${locale}/translation.json`, `${JSON.stringify(translation, null, 2)}\n`);
}