import { getSite } from "@/lib/getSite";
import LegalView from "@/components/views/LegalView";

export const metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const { legal, copy } = await getSite();
  return <LegalView page={legal.privacy} updatedLabel={copy.legalUpdated} />;
}
