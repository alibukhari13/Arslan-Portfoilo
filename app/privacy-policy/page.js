import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import LegalView from "@/components/views/LegalView";

export const metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const { legal, copy, hidden } = await getSite();
  if (!isShown(hidden, "privacy-page")) return <main className="min-h-svh" />;
  return <LegalView page={legal.privacy} updatedLabel={copy.legalUpdated} />;
}
