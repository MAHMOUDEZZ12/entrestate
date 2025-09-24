'use client';

import React from 'react';
import { Bot, BrainCircuit, Sparkles, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssistantChat } from '@/components/assistant-chat';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-full container mx-auto px-4 md:px-6">
      <PageHeader
        title="AI Command Center"
        description="Your AI co-pilot for the entire suite. Train it, command it, and let it run campaigns for you."
        icon={<Bot className="h-6 w-6" />}
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 h-[calc(100vh-250px)] flex flex-col bg-card/50 backdrop-blur-lg border rounded-xl shadow-lg">
           <AssistantChat />
        </div>

        {/* Side Panel for Training and Info */}
        <div className="space-y-8">
          <Card className="bg-card/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Trainable Intelligence
              </CardTitle>
              <CardDescription>Your assistant's knowledge comes from your private data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The AI learns from the documents you provide in your Knowledge Base. This ensures all responses are hyper-relevant and secure.
              </p>
              <Link href="/me/brand">
                <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Manage Knowledge Base
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Example Commands
              </CardTitle>
              <CardDescription>Issue direct orders to your AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-foreground list-disc pl-5 space-y-2">
                <li>"Rebrand the Emaar Beachfront brochure with my new logo."</li>
                <li>"Find three investors for 'Downtown Views' from my client list."</li>
                <li>"Generate a 7-day Instagram plan for our latest project."</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
