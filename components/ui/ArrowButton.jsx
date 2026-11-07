import Link from "next/link";
import { ArrowIcon } from "./Icons";

export default function ArrowButton({
  href,
  children,
  variant = "lime",
  type = "button",
  className = "",
  onClick,
}) {
  const shell =
    variant === "lime"
      ? "bg-lime text-ink"
      : variant === "solid"
        ? "bg-lime text-ink w-full justify-between"
        : variant === "line"
      ? "border border-white/40 text-white hover:border-lime"
      : "border border-white/15 text-white w-full justify-between hover:border-white/40";

  const arrowBox =
    variant === "ghost" || variant === "line" ? "bg-lime text-ink" : "bg-ink text-lime";

  const classes = `group inline-flex items-center gap-3 py-1.5 pl-4 pr-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${shell} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className={`grid h-8 w-8 place-items-center transition-transform duration-300 group-hover:translate-x-0.5 ${arrowBox}`}>
        <ArrowIcon />
      </span>
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const file = href.endsWith(".pdf");
    if (external || file) {
      return (
        <a
          href={href}
          className={classes}
          download={file ? "" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
