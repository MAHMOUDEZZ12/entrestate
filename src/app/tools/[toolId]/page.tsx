import { PublicToolPageLayout } from "@/components/public-tool-page-layout";
import { tools } from "@/lib/tools-client";
import { notFound } from "next/navigation";

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = tools.find(t => t.id === params.toolId);

  if (!tool) {
    notFound();
  }

  return <PublicToolPageLayout feature={tool} />;
}

// Generate static pages for each tool for better SEO and performance
export async function generateStaticParams() {
    return tools.map((tool) => ({
        toolId: tool.id,
    }));
}
