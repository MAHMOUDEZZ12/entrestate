# Entrestate - To-Do & Next Steps

This document outlines the remaining tasks and areas that require senior-level attention to bring the platform to a fully-realized, production-ready state.

## High-Priority / Core Functionality

### 1. Complete the "Pilot" Execution Flows
- **Issue:** The concept of "Pilots" (e.g., `Meta Auto Pilot`, `Property Finder Pilot`) is designed but not fully implemented. Currently, they generate plans or simulate execution, but they don't perform the final action (e.g., publishing to an external API).
- **To-Do:**
    - **`meta-auto-pilot`:** Implement the final step to actually publish the generated campaign to the Meta Ads API. This involves using the user's OAuth token.
    - **`property-finder-sync` & `bayut-sync`:** These flows correctly generate the required XML/JSON payloads. The final step is to replace the mock `fetch` calls with real, authenticated API calls to the respective portals. This will require obtaining and using official API keys.
    - **Generalize the Pilot Pattern:** Create a clear, reusable pattern for all "Pilot" tools that separates plan generation from plan execution.

### 2. Implement Real-time Updates for Asynchronous Flows
- **Issue:** Long-running AI flows (like video generation or large campaign creation) currently make the user wait for the full result.
- **To-Do:**
    - Implement a real-time progress update system, likely using WebSockets or Firestore listeners.
    - The `/api/run` endpoint should immediately return a `jobId` for long-running tasks.
    - The client-side UI should use this `jobId` to subscribe to real-time status updates (e.g., "Generating audience...", "Rendering video...").
    - The `meta-auto-pilot` page simulation needs to be replaced with this real system.

### 3. Connect UI to the Database Services
- **Issue:** Many parts of the dashboard UI use mock data instead of fetching from the database via the established services in `src/services/database.ts`.
- **To-Do:**
    - **`My Projects` on Dashboard:** Replace mock data with a real-time fetch from the user's project library in Firestore (`/api/user/projects`).
    - **`Brand & Assets` Page:** Ensure the page correctly loads and saves all brand kit information (including logo upload to Firebase Storage) and the knowledge base file list.
    - **`Leads (CRM)` Page:** This is currently a full mock. It needs to be connected to a `leads` collection in Firestore.

### 4. Refine the Onboarding Flow
- **Issue:** The onboarding flow (`/dashboard/onboarding`) is a comprehensive simulation but doesn't fully save all its state to the user's profile in Firestore.
- **To-Do:**
    - Ensure every selection made during onboarding (developer focus, project shortlist, brand kit, connections) is correctly saved to the `users/{uid}` document in Firestore via the `saveUserData` service.
    - The "Connections" step needs to trigger real OAuth flows for services like Meta and Google.

## Medium-Priority / Feature Completeness

### 1. Build Out Placeholder Tool UIs
- **Issue:** Several tools in `tools-client.tsx` are placeholders and render a "Coming Soon" page.
- **To-Do:**
    - For each placeholder tool, define its `creationFields` to create the input form.
    - Implement a custom `renderResult` function to display its output in a user-friendly way.
    - **Examples:** `vm-creator`, `creative-execution-terminal`.

### 2. Implement the "Flow Builder"
- **Issue:** The Flow Builder page (`/dashboard/flows`) is a great UI simulation but is not functional. It does not save or execute the created flows.
- **To-Do:**
    - Design a JSON structure to represent a user-created flow.
    - Implement a "Save Flow" feature that stores this JSON in Firestore.
    - Create a backend service (e.g., a Cloud Function triggered by Pub/Sub) that can interpret and execute these saved flows based on their trigger condition.

### 3. Complete the Community Section
- **Issue:** Pages like `Community Notes` and `Academy` are using mock data.
- **To-Do:**
    - **`Community Notes`:** Back this page with a `notes` collection in Firestore. Implement the form submission to create new documents.
    - **`Academy`:** Design the data model for courses and curriculum and build out the page to fetch and display real course data.

## Low-Priority / Polish

### 1. Finalize Theming
- **Issue:** The theme switcher works, but the new themes (`Pink/Purple`) are not defined in `globals.css`.
- **To-Do:**
    - Add the CSS variable definitions for any new themes to `src/app/globals.css`.
    - Ensure all components look correct across all themes.

### 2. Full API Error Handling
- **Issue:** While some error handling exists, it could be more robust across the application, especially for API calls made from the client.
- **To-Do:**
    - Review all `fetch` calls and ensure they have comprehensive `.catch()` blocks that display user-friendly error messages using the `toast` component.
