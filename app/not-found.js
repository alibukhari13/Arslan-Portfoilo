import ArrowButton from "@/components/ui/ArrowButton";
import ScrollWords from "@/components/ui/ScrollWords";
import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";

export default async function NotFound() {
  const { copy, hidden } = await getSite();
  if (!isShown(hidden, "missing-page")) return <main className="min-h-svh" />;
  return (
    <main className="grid min-h-svh place-items-center px-6 pt-24 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-lime">{copy.notFoundKicker}</p>
        <ScrollWords as="h1" text={copy.notFoundTitle} className="mt-3 text-5xl font-medium uppercase tracking-tight" />
        <div className="mt-8 flex justify-center">
          <ArrowButton href="/">{copy.notFoundButton}</ArrowButton>
        </div>
      </div>
    </main>
  );
}
