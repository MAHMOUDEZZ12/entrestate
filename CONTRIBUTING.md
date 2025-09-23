# Contributing to Entrestate

First off, thank you for considering contributing! This project is designed to be a modular and extensible platform, and your contributions are welcome.

## Core Architecture

Before you start, please familiarize yourself with the core concepts outlined in the `README.md` and the detailed system design in `src/ai/PRODUCT_BRIEF.md`. Understanding how **Projects**, **Brand Kit**, and **Service Cards** interact is key to developing new features.

- **Frontend**: Next.js with ShadCN UI components.
- **AI Backend**: Genkit with Gemini models.
- **Database**: Firestore.

## Adding a New Service Card (AI Tool)

Adding a new tool is the most common way to contribute. The process is designed to be straightforward:

### Step 1: Create the AI Flow

- All AI logic lives in `src/ai/flows/`.
- Create a new file for your tool, e.g., `src/ai/flows/content/my-new-tool.ts`.
- Use `zod` to define the `InputSchema` and `OutputSchema` for your flow. This provides type safety and is used by the AI.
- Use `ai.defineFlow()` to wrap your logic. This is where you'll call the Gemini models.
- Export your flow function and its input/output types.

### Step 2: Define the Client-Side Tool

- Open `src/lib/tools-client.tsx`.
- Find the `toolsData` array in `src/lib/tools-data.ts` and add a new `ToolData` object. This object defines how the tool appears in the UI and what form it uses.
- **id**: A unique, URL-friendly ID for your tool.
- **title/description**: User-facing name and description.
- **iconName/color**: For styling the card in the UI. Use a valid Lucide icon name.
- **categories**: To place the tool in the correct filter groups.
- **creationFields**: This is crucial. In `tools-client.tsx`, add a `case` for your new `id` in the switch statement. Define the form fields needed for your tool's input. The `id` of each field should match a key in the Zod `InputSchema` from Step 1.
- **renderResult**: (Optional but Recommended) Add a `case` for your new `id` to define a custom React component for rendering the output from your AI flow. If you don't provide this, the output will be displayed as raw JSON.

### Step 3: Connect the Flow

- Open `src/app/api/run/route.ts`.
- Import your new flow function from `src/ai/flows/content/my-new-tool.ts`.
- Add your tool's `id` and flow function to the `flowRunnerMap` object.

That's it! The UI for the tool page (`/dashboard/tool/[toolId]`) is generated automatically from the `creationFields` you defined. When the user clicks "Generate", it will call your connected flow with the form data.

Thank you for making Entrestate even better!
