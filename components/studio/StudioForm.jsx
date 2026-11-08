"use client";

import { useState } from "react";

export default function StudioForm({ source = "Contact page", email, text = {} }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          message: String(data.get("message") || "").trim(),
          source,
        }),
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
      <div className="border border-black/10 p-6">
        <p className="text-2xl font-semibold tracking-[-0.04em]">{text.formSentTitle || "Your message is sent."}</p>
        <p className="mt-2 text-sm leading-6 text-[#666]">{text.formSentBody || "Thank you for writing. Arslan will reply soon."}</p>
      </div>
    );
  }

  const field = "w-full border-b border-black/15 bg-transparent py-4 text-base outline-none placeholder:text-black/35";

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input required name="name" placeholder={text.formName || "Name *"} className={field} />
      <input required type="email" name="email" placeholder={text.formEmail || "E-mail *"} className={field} />
      <textarea
        required
        name="message"
        rows={5}
        placeholder={text.formMessagePagePlaceholder || "Tell me about your app, website, or product idea."}
        className={`${field} resize-none`}
      />
      <button type="submit" disabled={busy} className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0b0b0c] px-6 py-3 text-sm text-white disabled:opacity-50">
        {busy ? "Sending" : text.projectFormButton || "Get in touch"} <span aria-hidden>→</span>
      </button>
      {error ? <p className="text-sm text-[#F9452D]">{error}</p> : null}
      <p className="pt-3 text-xs text-[#888]">
        If this form does not send, write to <a className="underline" href={`mailto:${email}`}>{email}</a>.
      </p>
    </form>
  );
}
