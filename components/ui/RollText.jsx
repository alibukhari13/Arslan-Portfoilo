export default function RollText({ text }) {
  const chars = Array.from(text || "");

  return (
    <span className="inline-flex h-[1.5em] items-center overflow-hidden leading-[1.5em]">
      <span className="sr-only">{text}</span>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{ transitionDelay: `${index * 40}ms` }}
          aria-hidden
          className="inline-block translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [text-shadow:0_1.5em_0_currentColor] group-hover:-translate-y-[1.5em]"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
