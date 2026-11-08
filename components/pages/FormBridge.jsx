"use client";

import { useEffect } from "react";

export default function FormBridge({ source }) {
  useEffect(() => {
    function onSubmit(event) {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const name = form.querySelector('input[name="Name"]');
      const email = form.querySelector('input[name="E-mail"]');
      const message = form.querySelector('textarea[name="Message"]');
      if (!name || !email || !message) return;
      if (name.value.trim().length < 2 || message.value.trim().length < 2) return;
      event.preventDefault();
      event.stopPropagation();
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
          source,
        }),
      })
        .then(async (response) => {
          if (!response.ok) return;
          form.reset();
          const note = document.createElement("p");
          note.setAttribute("role", "status");
          note.textContent = "Your message is sent.";
          note.style.cssText = "margin-top:16px;color:#fff;font:600 16px/1.4 Inter,sans-serif";
          form.appendChild(note);
        })
        .catch(() => {});
    }

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, [source]);

  return null;
}
