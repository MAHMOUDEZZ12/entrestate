
import { cookies } from "next/headers";
    
export type MarketKey = `${string}:${string}`; // "AE:Dubai"
export const mk = (country: string, city: string): MarketKey => `${country}:${city}`;
export const splitMK = (key: MarketKey) => {
  const [country, city] = key.split(":"); return { country, city };
};


// Server side:
export async function getMarketFromCookies() {
  const c = await cookies();
  const country = c.get("country")?.value || "AE";
  const city = c.get("city")?.value || "Dubai";
  return { country, city };
}
