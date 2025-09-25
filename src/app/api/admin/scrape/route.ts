
'use server';

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase"; // Use client-side app for functions
import { ok, fail, getUidFromRequest } from "@/lib/api-helpers";
import { adminAuth } from "@/lib/firebaseAdmin";
import * as cheerio from 'cheerio';


export async function POST(req: Request) {
    try {
        const uid = await getUidFromRequest(req);
        const decodedToken = uid ? await adminAuth.getUser(uid) : null;
        if (!decodedToken || decodedToken.email !== 'dev@entrestate.com') {
            return fail("Unauthorized: Admin access required.", 403);
        }

        if (!app) {
            return fail("Firebase client is not initialized.", 503);
        }
        const functions = getFunctions(app);
        
        const { searchParams } = new URL(req.url);
        const source = searchParams.get('source') || 'dxboffplan';
        
        const triggerScrape = httpsCallable(functions, 'triggerScrape');
        const response = await triggerScrape({ source });

        return ok(response.data);

    } catch (e: any) {
        console.error("Scrape trigger error:", e);
        return fail(e.message || 'Failed to trigger scrape job.', e.code === 'unauthenticated' ? 401 : 500);
    }
}


export async function GET(req: Request) {
    // The GET method is kept for simple, direct scraping simulation if needed,
    // but the primary interaction should be via the POST to the Cloud Function.
    try {
        const { searchParams } = new URL(req.url);
        const target = searchParams.get('target');
        
        const targets: { [key: string]: string } = {
            'dxboffplan': 'https://dxboffplan.com/developers/',
            'bayut': 'https://www.bayut.com/for-sale/property/dubai/',
            'propertyfinder': 'https://www.propertyfinder.ae/en/buy/properties-for-sale.html'
        };

        if (!target || !targets[target]) {
            return fail("A valid 'target' parameter is required (dxboffplan, bayut, or propertyfinder).", 400);
        }
        
        const response = await fetch(targets[target]);
        if (!response.ok) throw new Error(`Failed to fetch ${target}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        const title = $('title').first().text();

        return ok({ status: 'Simple scrape successful.', title, source: targets[target] });

    } catch (e: any) {
        return fail(e);
    }
}
