
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import type { Project } from "@/types";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  if (!adminDb) {
    return fail("Firebase Admin is not initialized. Check server environment.", 503);
  }
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 50);
    const query = (searchParams.get("q") || "").toLowerCase().trim();

    // Query the entire catalog for more robust searching.
    // In a production app with millions of records, we'd use a dedicated search service
    // like Algolia or Elasticsearch, but for this scale, a collection scan is acceptable.
    let q = adminDb.collection("projects_catalog");

    const snap = await q.get();
    let allProjects = snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));

    if (query) {
      allProjects = allProjects.filter((p: Project) => 
        (p.name || '').toLowerCase().includes(query) ||
        (p.developer || '').toLowerCase().includes(query) ||
        (p.area || '').toLowerCase().includes(query) ||
        (p.city || '').toLowerCase().includes(query) || // Added city to search fields
        (p.status || '').toLowerCase().includes(query) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(query))) || // Search tags as well
        (p.unitTypes && p.unitTypes.some(u => u.toLowerCase().includes(query)))
      );
    }

    return ok(allProjects.slice(0, limit));
  } catch (e) {
    return fail(e);
  }
}
