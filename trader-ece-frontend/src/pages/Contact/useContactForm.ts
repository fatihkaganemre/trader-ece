import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export function useContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          title: form.topic,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
    } catch {
      setError(t("form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return { form, submitted, isLoading, error, handleChange, handleSubmit };
}