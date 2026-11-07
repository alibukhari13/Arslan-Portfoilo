"use client";

import { useState } from "react";
import ArrowButton from "./ArrowButton";

export default function ContactForm({ compact = false, page = false, source = "Home", email = "marslansabir3322@gmail.com", text = {} }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const from = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: from, message, source }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setError(result.error || "The message could not be sent.");
        return;
      }
      setSent(true);
    } catch {
      setError("The message could not be sent. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-white/10 bg-panel p-6">
        <p className="text-lg font-medium">{text.formSentTitle || "Message received."}</p>
        <p className="mt-2 text-sm leading-6 text-mist">
          {text.formSentBody || "It is saved in the studio admin. Arslan will reply to the email you entered."}
        </p>
      </div>
    );
  }

  const fields = [
    { name: "name", label: text.formName || "Name*", type: "text", placeholder: text.formNamePlaceholder || "Your name" },
    { name: "email", label: text.formEmail || "Email*", type: "email", placeholder: text.formEmailPlaceholder || "you@company.com" },
  ];
  const labelClass = page
    ? "mb-3 block text-base font-medium text-white"
    : "mb-2 block text-xs uppercase tracking-[0.16em] text-mist";
  const controlClass = page
    ? "w-full border-0 bg-panel px-5 text-base text-white outline-none placeholder:text-[#dbd7d7]"
    : "w-full border border-white/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-lime";

  return (
    <form onSubmit={onSubmit} className={page ? "space-y-5" : "space-y-4"}>
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className={labelClass}>{field.label}</span>
          <input
            required
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className={`${controlClass} ${page ? "h-16" : ""}`}
          />
        </label>
      ))}
      <label className="block">
        <span className={labelClass}>{text.formMessage || "Message"}</span>
        <textarea
          required
          name="message"
          rows={page ? 6 : compact ? 4 : 6}
          placeholder={page ? text.formMessagePagePlaceholder || "Enter your message here" : text.formMessagePlaceholder || "Tell me about the product"}
          className={`${controlClass} resize-none ${page ? "h-[180px] py-5" : ""}`}
        />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className={page ? "flex justify-center pt-4" : ""}>
        <ArrowButton type="submit" disabled={busy} variant={compact || page ? "lime" : "solid"}>
          {busy ? "Sending" : text.formSend || "Send message"}
        </ArrowButton>
      </div>
      <p className="text-xs leading-5 text-white/40">
        The message is saved for Arslan. If this form fails, write to{" "}
        <a className="text-lime" href={`mailto:${email}`}>{email}</a>.
      </p>
    </form>
  );
}
