
'use server';

import { ok, fail } from "@/lib/api-helpers";

const archiveData = [
    { developer: 'Emaar Properties', website: 'emaar.com', projectsLaunched: 280, projectsDelivered: 250, reputation: 'Excellent', avgResaleRoi: 8.5, topArea: 'Downtown Dubai', topAreaRoi: 12.0 },
    { developer: 'DAMAC Properties', website: 'damacproperties.com', projectsLaunched: 150, projectsDelivered: 120, reputation: 'Good', avgResaleRoi: 7.2, topArea: 'DAMAC Hills 2', topAreaRoi: 9.5 },
    { developer: 'Nakheel', website: 'nakheel.com', projectsLaunched: 95, projectsDelivered: 90, reputation: 'Excellent', avgResaleRoi: 9.1, topArea: 'Palm Jumeirah', topAreaRoi: 15.2 },
    { developer: 'Sobha Realty', website: 'sobharealty.com', projectsLaunched: 60, projectsDelivered: 45, reputation: 'Excellent', avgResaleRoi: 8.8, topArea: 'Sobha Hartland', topAreaRoi: 11.5 },
    { developer: 'Meraas', website: 'meraas.com', projectsLaunched: 75, projectsDelivered: 70, reputation: 'Good', avgResaleRoi: 7.9, topArea: 'City Walk', topAreaRoi: 10.1 },
    { developer: 'Aldar Properties', website: 'aldar.com', projectsLaunched: 120, projectsDelivered: 110, reputation: 'Excellent', avgResaleRoi: 8.2, topArea: 'Yas Island', topAreaRoi: 11.8 },
    { developer: 'Dubai Properties', website: 'dp.ae', projectsLaunched: 110, projectsDelivered: 100, reputation: 'Good', avgResaleRoi: 7.5, topArea: 'JBR', topAreaRoi: 9.8 },
    { developer: 'Azizi Developments', website: 'azizidevelopments.com', projectsLaunched: 130, projectsDelivered: 90, reputation: 'Average', avgResaleRoi: 6.5, topArea: 'Al Furjan', topAreaRoi: 8.2 },
    { developer: 'Binghatti Developers', website: 'binghatti.com', projectsLaunched: 80, projectsDelivered: 60, reputation: 'Good', avgResaleRoi: 7.8, topArea: 'JVC', topAreaRoi: 9.9 },
    { developer: 'Omniyat', website: 'omniyat.com', projectsLaunched: 25, projectsDelivered: 22, reputation: 'Excellent', avgResaleRoi: 10.2, topArea: 'Business Bay', topAreaRoi: 13.1 },
    { developer: 'Majid Al Futtaim', website: 'majidalfuttaim.com', projectsLaunched: 40, projectsDelivered: 35, reputation: 'Excellent', avgResaleRoi: 8.4, topArea: 'Tilal Al Ghaf', topAreaRoi: 11.2 },
    { developer: 'Select Group', website: 'select-group.ae', projectsLaunched: 30, projectsDelivered: 25, reputation: 'Good', avgResaleRoi: 8.1, topArea: 'Dubai Marina', topAreaRoi: 10.5 },
    { developer: 'Deyaar Development', website: 'deyaar.ae', projectsLaunched: 55, projectsDelivered: 50, reputation: 'Average', avgResaleRoi: 6.8, topArea: 'Production City', topAreaRoi: 7.9 },
];

export async function GET(req: Request) {
  try {
    // In a real application, this data would come from a database.
    // For now, it's served from this file as the "source of truth".
    return ok(archiveData);
  } catch (e) {
    return fail(e);
  }
}
