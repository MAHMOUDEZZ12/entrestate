
'use server';

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
    const limit = Number(searchParams.get("limit") || 20);
    const query = (searchParams.get("q") || "").toLowerCase().trim();

    const cookieStore = cookies();
    const country = cookieStore.get("country")?.value || "AE";
    const city = cookieStore.get("city")?.value || "Dubai";
    
    let q = adminDb.collection("projects_catalog")
      .where("country", "==", country);

    const snap = await q.get();
    let all = snap.docs.map(d => ({ id: d.id, ...d.data() as any }))
      .filter((p: Project) => p.city === city);

    if (query) {
      all = all.filter((p: Project) => 
        (p.name || '').toLowerCase().includes(query) ||
        (p.developer || '').toLowerCase().includes(query) ||
        (p.area || '').toLowerCase().includes(query) ||
        (p.status || '').toLowerCase().includes(query) ||
        (p.unitTypes && p.unitTypes.some(u => u.toLowerCase().includes(query)))
      );
    }

    return ok(all.slice(0, limit));
  } catch (e) {
    return fail(e);
  }
}
