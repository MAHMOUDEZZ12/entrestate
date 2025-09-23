
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import { google } from 'googleapis';

const dataflow = google.dataflow('v1b3');

async function launchDataflowJob(jobName: string, parameters: Record<string, string>) {
    // This requires Application Default Credentials to be set up in the environment.
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
        throw new Error("Google Cloud Project ID is not configured.");
    }

    // The GCS path to the Dataflow template. This would be created in a CI/CD pipeline.
    const gcsPath = `gs://dataflow-templates-us-central1/latest/flex/My_Pipeline_Template`;

    const request = {
        projectId: projectId,
        location: 'us-central1', // Or your preferred region
        resource: {
            jobName: `${jobName.replace(/_/g, '-')}-${Date.now()}`,
            parameters: parameters,
            environment: {
                // You can specify worker machine types, etc.
            },
            gcsPath: gcsPath
        }
    };

    console.log(`Launching Dataflow job with request:`, request);
    // In a real scenario, you would call the Dataflow API:
    // const response = await dataflow.projects.locations.flexTemplates.launch(request);
    // return response.data.job;

    // For this simulation, we return a mock response.
    return {
        id: `df-job-${Date.now()}`,
        name: request.resource.jobName,
        status: 'JOB_STATE_PENDING',
        parameters: parameters,
        gcsPath: gcsPath
    };
}


export async function POST(req: Request) {
  if (!adminDb) {
    return fail("Firebase Admin is not initialized. Check server environment.", 503);
  }
  try {
    const { searchParams } = new URL(req.url);
    const jobType = searchParams.get('job');
    
    if (!jobType) {
        return fail("A 'job' parameter is required (e.g., 'deep-ingestion' or 'transform-market-data').", 400);
    }
    
    let jobResult;

    if (jobType === 'deep-ingestion') {
        const targetUrl = searchParams.get('targetUrl') || 'https://www.bayut.com';
        jobResult = await launchDataflowJob('deep-ingestion', {
            target_url: targetUrl,
            output_table: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}:entrestate.layer1_listings`,
        });
    } else if (jobType === 'transform-market-data') {
         jobResult = await launchDataflowJob('transform-market-data', {
            input_gcs_path: `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/market_data/options_data.csv`,
            output_bigquery_table: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}:entrestate.transformed_market_data`,
        });
    } else {
        return fail(`Unknown job type: ${jobType}`, 400);
    }
    
    // Log the job request to Firestore for tracking
    await adminDb.collection('dataflow_jobs').add({
        jobType,
        jobId: jobResult.id,
        status: 'PENDING',
        createdAt: new Date(),
        parameters: jobResult.parameters,
    });

    return ok({ status: 'Dataflow job launch request sent.', job: jobResult });

  } catch (e: any) {
    console.error("Dataflow API error:", e);
    return fail(e);
  }
}

    
