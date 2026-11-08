import AdminPanel, { AdminBoundary } from "@/components/admin/AdminPanel";
import { isAdmin } from "@/lib/auth";
import { loadAdminData } from "@/lib/adminLoad";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdmin();
  let initialData = null;
  let initialError = "";
  if (authed) {
    const result = await loadAdminData();
    if (result?.ok) initialData = result.data;
    else initialError = result?.error || "Could not load the database.";
  }
  return (
    <AdminBoundary>
      <AdminPanel initialAuthed={authed} initialData={initialData} initialError={initialError} />
    </AdminBoundary>
  );
}
