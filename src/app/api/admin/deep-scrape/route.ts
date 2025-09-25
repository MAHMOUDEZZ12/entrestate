
'use server';

import { ok, fail, getUidFromRequest } from "@/lib/api-helpers";
import { adminAuth } from "@/lib/firebaseAdmin";
import * as cheerio from 'cheerio';

async function deepScrapeSite(url: string) {
    console.log(`Starting deep scrape for: ${url}`);
    // This is a simulation. A real implementation would use Puppeteer in a Cloud Function/Run.
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('title').first().text();
        const description = $('meta[name="description"]').attr('content');
        
        const extractedData = {
            source: url,
            scrapedAt: new Date().toISOString(),
            title: title,
            metaDescription: description,
            contentLength: html.length,
        };

        console.log("Extracted Data:", extractedData);
        
        return extractedData;

    } catch (error: any) {
        console.error(`Error during deep scrape of ${url}:`, error);
        return { source: url, error: error.message };
    }
}


export async function GET(req: Request) {
  try {
    const uid = await getUidFromRequest(req);
    const decodedToken = uid ? await adminAuth.getUser(uid) : null;
    if (!decodedToken || decodedToken.email !== 'dev@entrestate.com') {
      return fail("Unauthorized: Admin access required.", 403);
    }
    
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('target');
    
    const targets: { [key: string]: string } = {
        'dxboffplan': 'https://dxboffplan.com/',
        'bayut': 'https://www.bayut.com/for-sale/property/dubai/',
        'propertyfinder': 'https://www.propertyfinder.ae/en/buy/properties-for-sale.html'
    };

    if (!target || !targets[target]) {
        return fail("A valid 'target' parameter is required (dxboffplan, bayut, or propertyfinder).", 400);
    }
    
    const result = await deepScrapeSite(targets[target]);

    return ok({ status: 'Deep scrape simulation complete.', result });
  } catch (e: any) {
    return fail(e);
  }
}
