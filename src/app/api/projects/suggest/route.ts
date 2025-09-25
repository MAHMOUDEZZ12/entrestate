
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, bad, fail } from "@/lib/api-helpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const devs = (searchParams.get("devs") || "").split(",").filter(Boolean);
    const limit = Number(searchParams.get("limit") || 2);

    const country = req.cookies.get("country")?.value || "AE";
    const city = req.cookies.get("city")?.value || "Dubai";

    let q = adminDb.collection("projects_catalog")
      .where("country", "==", country);

    const snap = await q.get();
    let all = snap.docs.map(d => ({ id: d.id, ...d.data() as any }))
      .filter(p => p.city === city);

    if (devs.length) {
      all = all.filter((p: any) => devs.includes(p.developer));
    }

    // quick heuristic: newest first if you store createdAt; else randomize deterministically
    const pick = all.slice(0, limit);
    return ok(pick);
  } catch (e) {
    return fail(e);
  }
}
