
'use client';

export async function triggerScrape(source: string) {
    const response = await fetch(`/api/admin/scrape?source=${source}`, { method: 'POST' });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error);
    return data.data;
}

export async function triggerDataflow(jobType: string) {
    const response = await fetch(`/api/admin/dataflow?job=${jobType}`, { method: 'POST' });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error);
    return data.data;
}
