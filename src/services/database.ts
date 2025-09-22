
/**
 * @fileoverview This service acts as the database abstraction layer.
 *
 * All interactions with the underlying database (e.g., Firestore)
 * should be routed through the functions defined in this file. This allows
 * for a seamless transition between different database providers without
 * needing to refactor the entire application.
 */

'use server';

import { adminDb } from '@/lib/firebaseAdmin';
import { fail } from '@/lib/api-helpers';
import type { Project, BrandKit } from '@/types';


/**
 * Fetches a single project document from the projects_catalog collection.
 * @param projectId The ID of the project to fetch.
 * @returns The project data object or null if not found.
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  if (!adminDb) {
    console.error("Database service is unavailable because Firestore Admin is not initialized.");
    throw new Error("Database service is unavailable.");
  }
  try {
    const projectDocRef = adminDb.collection('projects_catalog').doc(projectId);
    const projectDoc = await projectDocRef.get();

    if (projectDoc.exists) {
        return { id: projectDoc.id, ...projectDoc.data() } as Project;
    } else {
        console.warn(`Project with ID "${projectId}" not found in projects_catalog.`);
        return null;
    }
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw fail(error);
  }
}

interface UserProfileData {
    companyName?: string;
    brandKit?: BrandKit;
    // Add any other user profile fields here
}

/**
 * Saves or updates a user's profile data in the 'users' collection.
 * @param userId The UID of the user.
 * @param data The data to save. This will be merged with existing data.
 * @returns A promise that resolves when the data is saved.
 */
export async function saveUserData(userId: string, data: UserProfileData): Promise<void> {
    if (!adminDb) {
        console.error("Database service is unavailable because Firestore Admin is not initialized.");
        throw new Error("Database service is unavailable.");
    }
    try {
        const userDocRef = adminDb.collection('users').doc(userId);
        await userDocRef.set(data, { merge: true });
    } catch (error) {
        console.error(`Error saving data for user ${userId}:`, error);
        throw fail(error);
    }
}
