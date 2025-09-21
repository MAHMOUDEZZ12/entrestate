
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, MessageSquare, Upload, Send } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { fileToDataUri } from '@/lib/tools-client';

export default function WhatsappManagerPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ status: string; messageTemplate: string } | null>(null);

  const [contactsFile, setContactsFile] = useState<File | null>(null);
  const [campaignType, setCampaignType] = useState('New Listing Announcement');
  const [context, setContext] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactsFile || !context) {
      toast({ title: "All fields are required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const contactsDataUri = await fileToDataUri(contactsFile);

    // Simulate API call
    setTimeout(() => {
        const mockResult = {
            status: `Message template for '${campaignType}' is ready to send to the uploaded contact list.`,
            messageTemplate: `Hi [Name]! Just a heads-up about a great new opportunity: ${context}. Would you be interested in the details? Let me know!`
        };
        setResult(mockResult);
        setIsLoading(false);
        toast({ title: 'Campaign Ready!', description: 'Your WhatsApp message template is ready.' });
    }, 2000);
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="WhatsApp Campaign Manager"
        description="Send personalized broadcast messages or create automated drip campaigns for your leads."
        icon={<MessageSquare className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactsFile">Contacts (CSV)</Label>
                <Input id="contactsFile" type="file" accept=".csv" onChange={(e) => setContactsFile(e.target.files?.[0] || null)} required />
                <p className="text-xs text-muted-foreground">Must include 'name' and 'phone' columns.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaignType">Campaign Type</Label>
                 <Select value={campaignType} onValueChange={setCampaignType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="New Listing Announcement">New Listing Announcement</SelectItem>
                        <SelectItem value="Open House Follow-up">Open House Follow-up</SelectItem>
                        <SelectItem value="Price Drop Alert">Price Drop Alert</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="context">Context</Label>
                <Textarea id="context" value={context} onChange={e => setContext(e.target.value)} placeholder="e.g., 'Emaar Beachfront 2-bed with sea view', or 'Open house at 123 Palm Jumeirah this Saturday'" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {isLoading ? 'Drafting...' : 'Draft Message Template'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Message</CardTitle>
            <CardDescription>Your personalized message template will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : result ? (
                <div className="space-y-4">
                    <p className="text-sm font-semibold">{result.status}</p>
                    <div className="p-4 bg-muted rounded-md space-y-2">
                        <Label>Message Template</Label>
                        <Textarea value={result.messageTemplate} readOnly rows={5} />
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Your message template will be displayed here.</p>
                </div>
            )}
          </CardContent>
           {result && (
                <CardFooter>
                     <Button className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Broadcast
                    </Button>
                </CardFooter>
           )}
        </Card>
      </div>
    </main>
  );
}
