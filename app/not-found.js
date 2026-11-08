import Link from "next/link";
import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";

export default async function NotFound() {
  const { copy, hidden } = await getSite();
  if (!isShown(hidden, "missing-page")) return <main className="min-h-svh bg-white" />;
  return (
    <main className="grid min-h-svh place-items-center bg-white px-6 pt-24 text-center text-[#0b0b0c]">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#F9452D]">{copy.notFoundKicker}</p>
        <h1 className="studio-display mt-3 text-5xl">{copy.notFoundTitle}</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#0b0b0c] px-5 py-3 text-sm text-white">
          {copy.notFoundButton}
        </Link>
      </div>
    </main>
  );
}
