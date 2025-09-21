

import { PublicToolPageLayout } from "@/components/public-tool-page-layout";
import { tools } from "@/lib/tools-data";
import { notFound } from "next/navigation";

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = tools.find(t => t.id === params.toolId);

  if (!tool) {
    notFound();
  }

  // The 'details' property is not on the object from tools-data,
  // but PublicToolPageLayout doesn't actually use it.
  // We cast to `any` to satisfy the type checker for now.
  // A better solution would be to create a separate type for the marketing pages.
  return <PublicToolPageLayout feature={tool as any} />;
}

// Generate static pages for each tool for better SEO and performance
export async function generateStaticParams() {
    return tools.map((tool) => ({
        toolId: tool.id,
    }));
}
