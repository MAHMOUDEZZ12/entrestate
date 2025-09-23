
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Cpu, Component, Wind, BrainCircuit, Network } from 'lucide-react';
import { tools } from '@/lib/tools-data';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/code-block';
import { PageHeader } from '@/components/ui/page-header';


const technologies = [
  {
    name: 'Next.js',
    description: 'The application is built using the Next.js App Router for optimal performance, server-side rendering, and a modern React framework.',
    icon: <Component className="h-8 w-8" />,
  },
  {
    name: 'Tailwind CSS & ShadCN UI',
    description: 'Styling is handled by Tailwind CSS for utility-first design, with a component library built on top of ShadCN UI for a consistent and professional look and feel. The app is fully themable via CSS variables.',
    icon: <Wind className="h-8 w-8" />,
  },
  {
    name: 'Genkit & Google AI',
    description: 'All AI capabilities are powered by Genkit, an open-source framework from Google that simplifies building production-ready AI flows, integrated with Gemini models.',
    icon: <BrainCircuit className="h-8 w-8" />,
  },
];

const SchemaDisplay = ({ tool }: { tool: any }) => {
    // In a real app, we would dynamically import or fetch schemas.
    // For now, this is a placeholder.
    const inputExample = `{\n  "example_input": "..."\n}`;
    const outputExample = `{\n  "result": "..." // Output varies by tool\n}`;

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-base mb-2">Input Schema (from UI)</h4>
                <CodeBlock>{inputExample}</CodeBlock>
            </div>
             <div>
                <h4 className="font-semibold text-base mb-2">Generic Output Schema</h4>
                <CodeBlock>{outputExample}</CodeBlock>
            </div>
        </div>
    );
};


export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
            <PageHeader 
                icon={<GitBranch className="h-8 w-8" />}
                title="Entrestate Documentation"
                description="A technical overview of the technologies and AI flows that power the Entrestate platform."
            />

            <section className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {technologies.map((tech) => (
                <Card key={tech.name} className="bg-card/50 backdrop-blur-lg border-primary/10">
                    <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">{tech.icon}</div>
                    <CardTitle className="text-2xl">{tech.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-foreground/80">{tech.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
            </section>

            <section>
            <h2 className="text-3xl font-bold mb-8 text-center">AI Flows &amp; Features</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Each tool in the Entrestate suite is powered by a dedicated Genkit AI flow located in `src/ai/flows`. These server-side functions define the AI's logic, its inputs, and its outputs. The frontend UI, defined in `src/lib/tools-client.tsx`, provides a user-friendly interface to interact with these flows.
            </p>
            <div className="space-y-12">
                {tools.map((tool) => (
                <Card key={tool.id} className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                        <GitBranch />
                        Flow: {tool.id}
                    </CardTitle>
                    <p className="text-foreground/70 pt-2">{tool.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <SchemaDisplay tool={tool} />
                    </CardContent>
                </Card>
                ))}
            </div>
            </section>

            <section className="mt-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Connections &amp; Integrations</h2>
                <Card className="bg-card/50 backdrop-blur-lg border-primary/10 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                            <Network />
                            External Service Connections
                        </CardTitle>
                        <p className="text-foreground/70 pt-2">
                            Entrestate connects to various external services to automate your workflow. Here's how they work.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6 prose prose-lg dark:prose-invert max-w-none">
                        <h3>Authentication-Based Connections (OAuth)</h3>
                        <p>
                            For services like <strong>Meta (Facebook &amp; Instagram)</strong> and <strong>Google (Gmail &amp; YouTube)</strong>, we use OAuth 2.0. This is the industry standard for secure authorization. When you connect these accounts, you will be redirected to their official login page. You grant our application specific, limited permissions (e.g., "post on my behalf" or "read my DMs"). We never see or store your password. This method is highly secure and gives you full control to revoke access at any time from your Google or Facebook account settings.
                        </p>
                        
                        <h3>API Key-Based Connections</h3>
                        <p>
                            For some specialized services, you may need to provide an API key. An API key is a unique string of characters that you get from the service provider, which you then save in your Entrestate settings.
                        </p>
                        <ul>
                            <li><strong>Google AI (Gemini):</strong> To power all AI features, the application requires a <code>GEMINI_API_KEY</code>. You obtain this from Google AI Studio and set it up once in your local environment file or server configuration.</li>
                            <li><strong>Portal APIs (Bayut, Property Finder):</strong> To use the automated listing pilots, you need an enterprise API key from each portal, which can be configured in the Developer Admin section.</li>
                        </ul>
                        <p>
                            We securely encrypt and store all API keys you provide. This method is used when a direct user-based authentication flow like OAuth is not suitable for the type of integration.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </main>
    </div>
  );
}
