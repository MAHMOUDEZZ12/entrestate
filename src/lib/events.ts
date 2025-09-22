import { auth } from "@/lib/firebase";

export async function track(event: string, props: Record<string, any> = {}) {
  try {
    // This function will now call our API endpoint
    const uid = auth?.currentUser?.uid;

    await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, uid, props }),
    });

  } catch (e) {
    console.error("Failed to track event:", e);
    // optional fallback to dataLayer for environments where fetch might fail
    if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event, ...props, ts: Date.now() });
    }
  }
}
