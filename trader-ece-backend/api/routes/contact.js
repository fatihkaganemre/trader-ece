import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, title, message } = req.body;
  const destination = process.env.CONTACT_RECEIVER || "info@trader-ece.com";

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      replyTo: email,
      to: destination,
      subject: `${name} - ${title}`,
      text: message,
    });

    res.status(200).send({ ok: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).send({ ok: false, error: "Failed to send email" });
  }
});

export default router;