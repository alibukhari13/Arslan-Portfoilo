import Image from "next/image";

export default function Photo({ src, alt = "", className = "", fill = false, sizes, priority = false }) {
  if (!src) return null;
  const remote = /^https?:/i.test(src);

  if (remote) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className={fill ? `absolute inset-0 h-full w-full object-cover ${className}` : className}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        quality={70}
        className={className}
      />
    );
  }

  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={className} />;
}
