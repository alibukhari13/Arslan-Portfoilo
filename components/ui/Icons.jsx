export function ArrowIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <path d="M5 27 L16 5 L27 27" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M10.5 19.5 H21.5" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
