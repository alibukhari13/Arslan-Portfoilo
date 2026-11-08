import { loadAdminData } from "@/lib/adminLoad";

async function respond() {
  const result = await loadAdminData();
  return Response.json(result, {
    headers: { "cache-control": "no-store" },
  });
}

export function GET() {
  return respond();
}

export function POST() {
  return respond();
}
