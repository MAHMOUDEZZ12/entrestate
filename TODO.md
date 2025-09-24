
# Entrestate - To-Do & Next Steps

This document outlines the remaining tasks and areas that require senior-level attention to bring the platform to a fully-realized, production-ready state.

---

## High-Priority / Core Functionality

### 1. Connect Workspace UI to Database Services
- **Issue:** Many parts of the authenticated workspace (`/me` pages) use mock data instead of fetching from the database via the established services in `src/services/database.ts`.
- **To-Do:**
    - **`My Projects` on Workspace Home:** Replace mock data with a real-time fetch from the user's project library in Firestore (`/api/user/projects`).
    - **`Brand & Assets` Page:** Ensure the page correctly loads and saves all brand kit information (including logo upload to Firebase Storage) and the knowledge base file list.
    - **`Leads (CRM)` Page:** This is currently a full mock. It needs to be connected to a `leads` collection in Firestore.

### 2. Implement Real-time Updates for Asynchronous Flows
- **Issue:** Long-running AI flows (like video generation or large campaign creation) currently make the user wait for the full result.
- **To-Do:**
    - Implement a real-time progress update system, likely using WebSockets or Firestore listeners.
    - The `/api/run` endpoint should immediately return a `jobId` for long-running tasks.
    - The client-side UI should use this `jobId` to subscribe to real-time status updates (e.g., "Generating audience...", "Rendering video...").
    - The `meta-auto-pilot` page simulation needs to be replaced with this real system.

---
## Medium-Priority / Feature Completeness

### 1. Build Out Placeholder Tool UIs
- **Issue:** Several tools in `tools-client.tsx` are placeholders and render a "Coming Soon" page.
- **To-Do:**
    - For each placeholder tool, define its `creationFields` to create the input form.
    - Implement a custom `renderResult` function to display its output in a user-friendly way.
    - **Examples:** `vm-creator`, `creative-execution-terminal`.

### 2. Implement the "Flow Builder"
- **Issue:** The Flow Builder page (`/me/flows`) is a great UI simulation but is not functional. It does not save or execute the created flows.
- **To-Do:**
    - Design a JSON structure to represent a user-created flow.
    - Implement a "Save Flow" feature that stores this JSON in Firestore.
    - Create a backend service (e.g., a Cloud Function triggered by Pub/Sub) that can interpret and execute these saved flows based on their trigger condition.

### 3. Complete the Community Section
- **Issue:** Pages like `Community Notes` and `Academy` are using mock data.
- **To-Do:**
    - **`Community Notes`:** Back this page with a `notes` collection in Firestore. Implement the form submission to create new documents.
    - **`Academy`:** Design the data model for courses and curriculum and build out the page to fetch and display real course data.

---
## Completed Tasks (For Reference)

-   **[Done]** Complete the "Pilot" Execution Flows: The core logic for `meta-auto-pilot`, `property-finder-sync`, and `bayut-sync` now correctly generates payloads. The final step of making live API calls is pending credentials but the planning phase is complete.
-   **[Done]** Refine the Onboarding Flow: The onboarding flow now correctly saves all user data (developer focus, project shortlist, brand kit, connections) to Firestore via the `saveUserData` service. OAuth connections are simulated and ready for production keys.
-   **[Done]** Finalize Theming: The theme switcher now correctly applies multiple themes defined in `globals.css`.
-   **[Done]** Full API Error Handling: A comprehensive review and implementation of error handling has been completed across the client-side API calls, using `toast` for user-friendly messages.
-   **[Done]** Code Cleaning and Refactoring: A major pass was done to centralize types, clean up imports, and resolve architectural issues causing build failures.
