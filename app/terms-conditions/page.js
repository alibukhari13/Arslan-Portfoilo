import { getSite } from "@/lib/getSite";
import LegalView from "@/components/views/LegalView";

export const metadata = { title: "Terms & Conditions" };

export default async function TermsPage() {
  const { legal, copy } = await getSite();
  return <LegalView page={legal.terms} updatedLabel={copy.legalUpdated} />;
}
