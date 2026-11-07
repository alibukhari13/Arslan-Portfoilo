import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import LegalView from "@/components/views/LegalView";

export const metadata = { title: "Terms & Conditions" };

export default async function TermsPage() {
  const { legal, copy, hidden } = await getSite();
  if (!isShown(hidden, "terms-page")) return <main className="min-h-svh" />;
  return <LegalView page={legal.terms} updatedLabel={copy.legalUpdated} />;
}
