import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Copy, Mail, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getAccountWarning } from "../utils/accountWarning";
import "./BrokerAccountAction.css";

type Broker = "tickmill" | "hfm";

interface TickmillFieldLabels {
  accountNumber: string;
  fullName: string;
  clientId: string;
}

interface BrokerDialogLabels {
  close: string;
  chooseAction: string;
  newAccount: string;
  linkExistingAccount: string;
  linkExistingTitle: string;
  emailDescription: string;
  copyMessage: string;
  copied: string;
  openEmail: string;
}

interface BrokerAccountActionProps {
  broker: Broker;
  accountLink: string;
  className?: string;
  children: React.ReactNode;
}

const tickmillFieldLabels: Record<string, TickmillFieldLabels> = {
  tr: { accountNumber: "HESAP NUMARANIZ", fullName: "ADINIZ SOYADINIZ", clientId: "MÜŞTERİ NUMARANIZ" },
  th: { accountNumber: "หมายเลขบัญชีของคุณ", fullName: "ชื่อและนามสกุล", clientId: "รหัสลูกค้า" },
  id: { accountNumber: "NOMOR AKUN ANDA", fullName: "NAMA LENGKAP ANDA", clientId: "ID KLIEN" },
  vi: { accountNumber: "SỐ TÀI KHOẢN CỦA BẠN", fullName: "HỌ VÀ TÊN", clientId: "MÃ KHÁCH HÀNG" },
  zh: { accountNumber: "您的账户号码", fullName: "您的姓名", clientId: "客户编号" },
  ru: { accountNumber: "НОМЕР ВАШЕГО СЧЕТА", fullName: "ВАШЕ ИМЯ И ФАМИЛИЯ", clientId: "ID КЛИЕНТА" },
  cnr: { accountNumber: "BROJ VAŠEG RAČUNA", fullName: "VAŠE IME I PREZIME", clientId: "ID KLIJENTA" },
  en: { accountNumber: "YOUR ACCOUNT NUMBER", fullName: "YOUR FULL NAME", clientId: "CLIENT ID" },
};

const brokerDialogLabels: Record<string, BrokerDialogLabels> = {
  tr: { close: "Kapat", chooseAction: "Hesap işlemi seçin", newAccount: "Yeni Hesap", linkExistingAccount: "Varolan Hesabı Bağla", linkExistingTitle: "Varolan hesabınızı bağlayın", emailDescription: "Aşağıdaki metni kopyalayıp {{email}} adresine gönderin.", copyMessage: "Mesajı Kopyala", copied: "Kopyalandı", openEmail: "E-postayı Aç" },
  en: { close: "Close", chooseAction: "Choose an account action", newAccount: "New Account", linkExistingAccount: "Link Existing Account", linkExistingTitle: "Link your existing account", emailDescription: "Copy the message below and send it to {{email}}.", copyMessage: "Copy Message", copied: "Copied", openEmail: "Open Email" },
  th: { close: "ปิด", chooseAction: "เลือกการดำเนินการสำหรับบัญชี", newAccount: "บัญชีใหม่", linkExistingAccount: "เชื่อมโยงบัญชีเดิม", linkExistingTitle: "เชื่อมโยงบัญชีเดิมของคุณ", emailDescription: "คัดลอกข้อความด้านล่างและส่งไปที่ {{email}}", copyMessage: "คัดลอกข้อความ", copied: "คัดลอกแล้ว", openEmail: "เปิดอีเมล" },
  id: { close: "Tutup", chooseAction: "Pilih tindakan akun", newAccount: "Akun Baru", linkExistingAccount: "Hubungkan Akun yang Ada", linkExistingTitle: "Hubungkan akun Anda yang ada", emailDescription: "Salin pesan di bawah ini dan kirimkan ke {{email}}.", copyMessage: "Salin Pesan", copied: "Disalin", openEmail: "Buka Email" },
  vi: { close: "Đóng", chooseAction: "Chọn thao tác tài khoản", newAccount: "Tài Khoản Mới", linkExistingAccount: "Liên Kết Tài Khoản Hiện Có", linkExistingTitle: "Liên kết tài khoản hiện có của bạn", emailDescription: "Sao chép nội dung bên dưới và gửi đến {{email}}.", copyMessage: "Sao Chép Nội Dung", copied: "Đã Sao Chép", openEmail: "Mở Email" },
  zh: { close: "关闭", chooseAction: "选择账户操作", newAccount: "新账户", linkExistingAccount: "关联现有账户", linkExistingTitle: "关联您的现有账户", emailDescription: "复制以下内容并发送至 {{email}}。", copyMessage: "复制内容", copied: "已复制", openEmail: "打开邮件" },
  ru: { close: "Закрыть", chooseAction: "Выберите действие со счетом", newAccount: "Новый счет", linkExistingAccount: "Привязать существующий счет", linkExistingTitle: "Привяжите существующий счет", emailDescription: "Скопируйте текст ниже и отправьте его на {{email}}.", copyMessage: "Копировать текст", copied: "Скопировано", openEmail: "Открыть email" },
  cnr: { close: "Zatvori", chooseAction: "Izaberite radnju za račun", newAccount: "Novi račun", linkExistingAccount: "Povežite postojeći račun", linkExistingTitle: "Povežite svoj postojeći račun", emailDescription: "Kopirajte poruku ispod i pošaljite je na {{email}}.", copyMessage: "Kopiraj poruku", copied: "Kopirano", openEmail: "Otvori e-poštu" },
};

const brokerDetails = {
  hfm: {
    name: "HFM",
    email: "partners@hfm.com",
    subject: "IB 365189 account assignment request",
    message: `Hello,

I would like my account to be under IB 365189 because I will be using services of that specific IB. Please assign me under mentioned IB even in case I already have a parent IB.

Kind regards.`,
  },
  tickmill: {
    name: "Tickmill",
    email: "support@tickmill.com",
    subject: "Request to link account under IB54180972",
  },
} as const;

function getTickmillMessage(language: string): string {
  const locale = language.toLowerCase().split("-")[0];
  const labels = tickmillFieldLabels[locale] ?? tickmillFieldLabels.en;

  return `Dear Tickmill Support Team,

I would like to request my trading account [${labels.accountNumber}] to be mapped/linked under the following IB code: IB54180972.

Could you please process this change at your earliest convenience?

Best regards,

Name: [${labels.fullName}]
Client ID: [${labels.clientId}]`;
}

export default function BrokerAccountAction({ broker, accountLink, className = "", children }: BrokerAccountActionProps) {
  const { i18n } = useTranslation();
  const locale = (i18n.language || "en").toLowerCase().split("-")[0];
  const labels = brokerDialogLabels[locale] ?? brokerDialogLabels.en;
  const accountWarning = getAccountWarning(i18n.language || "en");
  const [showChoices, setShowChoices] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const details = {
    ...brokerDetails[broker],
    message: broker === "tickmill" ? getTickmillMessage(i18n.language || "en") : brokerDetails.hfm.message,
  };

  useEffect(() => {
    if (!showChoices && !showEmail) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowChoices(false);
        setShowEmail(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showChoices, showEmail]);

  const close = () => {
    setShowChoices(false);
    setShowEmail(false);
    setCopied(false);
  };

  const copyMessage = async () => {
    await navigator.clipboard.writeText(details.message);
    setCopied(true);
  };

  const mailtoUrl = `mailto:${details.email}?subject=${encodeURIComponent(details.subject)}&body=${encodeURIComponent(details.message)}`;

  return (
    <>
      <button type="button" className={className} onClick={() => setShowChoices(true)}>
        {children}
      </button>

      {showChoices && createPortal(
        <div className="broker-modal-backdrop" role="presentation" onMouseDown={close}>
          <section className="broker-modal" role="dialog" aria-modal="true" aria-labelledby={`broker-choices-${broker}`} onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="broker-modal__close" aria-label={labels.close} onClick={close}><X size={20} /></button>
            <p className="broker-modal__eyebrow">{details.name}</p>
            <h2 id={`broker-choices-${broker}`}>{labels.chooseAction}</h2>
            <div className="broker-modal__actions">
              <a className="btn btn-primary" href={accountLink} target="_blank" rel="noopener noreferrer">
                <Plus size={18} /> {labels.newAccount}
              </a>
              <button type="button" className="btn btn-outline" onClick={() => { setShowChoices(false); setShowEmail(true); }}>
                {labels.linkExistingAccount}
              </button>
            </div>
            <p className="broker-modal__warning"><AlertTriangle size={17} /> {accountWarning}</p>
          </section>
        </div>
      , document.body)}

      {showEmail && createPortal(
        <div className="broker-modal-backdrop" role="presentation" onMouseDown={close}>
          <section className="broker-modal broker-modal--email" role="dialog" aria-modal="true" aria-labelledby={`broker-email-${broker}`} onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="broker-modal__close" aria-label={labels.close} onClick={close}><X size={20} /></button>
            <p className="broker-modal__eyebrow">{details.name}</p>
            <h2 id={`broker-email-${broker}`}>{labels.linkExistingTitle}</h2>
            <p className="broker-modal__description">{labels.emailDescription.replace("{{email}}", details.email)}</p>
            <pre className="broker-modal__message">{details.message}</pre>
            <div className="broker-modal__actions">
              <button type="button" className="btn btn-primary" onClick={copyMessage}>
                <Copy size={18} /> {copied ? labels.copied : labels.copyMessage}
              </button>
              <a className="btn btn-outline" href={mailtoUrl}>
                <Mail size={18} /> {labels.openEmail}
              </a>
            </div>
            <p className="broker-modal__warning"><AlertTriangle size={17} /> {accountWarning}</p>
          </section>
        </div>
      , document.body)}
    </>
  );
}