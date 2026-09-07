const accountWarnings: Record<string, string> = {
  tr: "Hesap açılış işlemleri yalnızca bizim linklerimiz üzerinden gerçekleştirilmelidir.",
  en: "Accounts must only be opened through our links.",
  th: "การเปิดบัญชีต้องทำผ่านลิงก์ของเราเท่านั้น",
  id: "Pembukaan akun hanya boleh dilakukan melalui tautan kami.",
  vi: "Việc mở tài khoản chỉ được thực hiện qua các liên kết của chúng tôi.",
  zh: "开户操作只能通过我们的链接进行。",
  ru: "Открытие счета должно выполняться только по нашим ссылкам.",
  cnr: "Otvaranje računa mora se obavljati isključivo putem naših linkova.",
};

export function getAccountWarning(language: string): string {
  const locale = language.toLowerCase().split("-")[0];
  return accountWarnings[locale] ?? accountWarnings.en;
}