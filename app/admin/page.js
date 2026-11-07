import AdminPanel from "@/components/admin/AdminPanel";
import { isAdmin } from "@/lib/auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdmin();
  return <AdminPanel initialAuthed={authed} />;
}
