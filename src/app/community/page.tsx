
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { MessageSquarePlus, User, Users2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const noteSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    type: z.enum(['Connection', 'Investor Request', 'Opinion', 'Review', 'Question', 'Self Intro']),
    content: z.string().min(10, 'Content is required.'),
    terms: z.boolean().refine(val => val === true, { message: 'You must accept the terms and conditions.' }),
    // Dynamic fields
    developerName: z.string().optional(),
    investorBudget: z.string().optional(),
    investorArea: z.string().optional(),
    notifyFirst: z.boolean().optional(),
});

type NoteFormValues = z.infer<typeof noteSchema>;


const noteTypes = ['Connection', 'Investor Request', 'Opinion', 'Review', 'Question', 'Self Intro'] as const;

const mockNotes = [
  {
    id: 1,
    title: "Looking for a direct sales contact at Emaar",
    author: "John Doe",
    type: "Connection",
    content: "Our agency is looking to establish a direct line with the sales team at Emaar for bulk deals. Can anyone provide a senior contact?",
    comments: 3,
  },
  {
    id: 2,
    title: "Investor seeking ready 2BR in Dubai Marina",
    author: "Jane Smith",
    type: "Investor Request",
    content: "Budget: AED 2.5M. Looking for a ready, tenanted 2-bedroom apartment in Dubai Marina with a high ROI. Service charges must be reasonable.",
    comments: 8,
  },
  {
    id: 3,
    title: "Opinion: Is the off-plan market overheating?",
    author: "Alex Johnson",
    type: "Opinion",
    content: "With the recent influx of new projects, are we heading towards an oversupply situation in the off-plan market by 2026? What are your thoughts?",
    comments: 15,
  },
  {
    id: 4,
    title: "Self Introduction - Michael from Prestige Properties",
    author: "Michael Chen",
    type: "Self Intro",
    content: "Hi everyone, I'm Michael, a senior broker at Prestige Properties specializing in luxury villas in Emirates Hills and Palm Jumeirah. Happy to connect with fellow real estate professionals!",
    comments: 5,
  },
  {
    id: 5,
    title: "Question: Best tool for rebranding brochures?",
    author: "Sarah Lee",
    type: "Question",
    content: "I have a bunch of old brochures I need to update with my new logo and contact info. Which app is the best for this? Automated Rebranding or the PDF Editor?",
    comments: 4,
  }
];

const NewNoteForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: '',
            content: '',
            terms: false,
            notifyFirst: false,
        }
    });

    const selectedType = watch('type');

    const handleGenerateIntro = () => {
        setValue('content', 'As a seasoned real estate professional based in Dubai, I specialize in luxury waterfront properties. With over 10 years of experience, I have a deep understanding of the market trends and a strong network of clients and developers. I am passionate about helping investors find the perfect opportunities. Looking forward to connecting with you all.');
        toast({ title: "AI Introduction Generated!", description: "Your self-introduction has been drafted." });
    }

    const onSubmit = async (data: NoteFormValues) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
        toast({
            title: "Note Published!",
            description: "Your note has been successfully added to the community board."
        });
        setOpen(false);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller name="title" control={control} render={({ field }) => (
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="A clear and concise title for your note" {...field} />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>
            )} />
            
            <Controller name="type" control={control} render={({ field }) => (
                <div className="space-y-2">
                    <Label htmlFor="type">Type of Note</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select a note type..." /></SelectTrigger>
                        <SelectContent>
                            {noteTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
                </div>
            )} />

            {selectedType === 'Connection' && (
                <Controller name="developerName" control={control} render={({ field }) => (
                    <div className="p-4 bg-muted/50 rounded-lg border space-y-2">
                        <Label htmlFor="developerName">Developer Name</Label>
                        <Input id="developerName" placeholder="e.g., Emaar, DAMAC" {...field} />
                        <p className="text-xs text-muted-foreground">Our team will be notified and will assist you in finding a contact.</p>
                    </div>
                )} />
            )}
            
            {selectedType === 'Investor Request' && (
                <div className="p-4 bg-muted/50 rounded-lg border space-y-4">
                    <Controller name="investorBudget" control={control} render={({ field }) => (
                        <div className="space-y-2">
                            <Label htmlFor="investorBudget">Budget (AED)</Label>
                            <Input id="investorBudget" placeholder="e.g., 5,000,000" {...field} />
                        </div>
                    )} />
                    <Controller name="investorArea" control={control} render={({ field }) => (
                         <div className="space-y-2">
                            <Label htmlFor="investorArea">Area of Interest</Label>
                            <Input id="investorArea" placeholder="e.g., Dubai Marina, Downtown" {...field} />
                        </div>
                    )} />
                </div>
            )}

            {selectedType === 'Self Intro' && (
                <Button type="button" variant="outline" onClick={handleGenerateIntro}>Generate with AI</Button>
            )}
             <Controller name="content" control={control} render={({ field }) => (
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Share your thoughts, questions, or requests..." rows={6} {...field} />
                    {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
                </div>
            )} />
            
             {selectedType === 'Review' && (
                <Controller name="notifyFirst" control={control} render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Checkbox id="notifyFirst" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="notifyFirst">Notify Entrestate team privately before posting</Label>
                    </div>
                )} />
            )}

            <Controller name="terms" control={control} render={({ field }) => (
                 <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="terms" className="text-xs">
                        I agree that my name will be displayed publicly with this post.
                    </Label>
                    {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
                </div>
            )} />
            
            <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Publish Note
                </Button>
            </DialogFooter>
        </form>
    );
};


export default function CommunityPage() {
    const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <PageHeader
          title="Community Notes"
          description="Connect, learn, and grow with a network of forward-thinking real estate professionals."
          icon={<Users2 className="h-8 w-8" />}
        >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button><MessageSquarePlus className="mr-2 h-4 w-4" /> Create a Note</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Create a New Note</DialogTitle>
                        <DialogDescription>Share your thoughts with the community. Select a type to get started.</DialogDescription>
                    </DialogHeader>
                    <NewNoteForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </PageHeader>
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Connection">Connections</TabsTrigger>
                    <TabsTrigger value="Investor Request">Investors</TabsTrigger>
                    <TabsTrigger value="Opinion">Opinions</TabsTrigger>
                    <TabsTrigger value="Review">Reviews</TabsTrigger>
                    <TabsTrigger value="Question">Questions</TabsTrigger>
                    <TabsTrigger value="Self Intro">Intros</TabsTrigger>
                </TabsList>
                
                {(['all', ...noteTypes] as const).map(tab => (
                     <TabsContent key={tab} value={tab.replace(/\s/g, '')}>
                        <div className="space-y-6">
                            {mockNotes.filter(note => tab === 'all' || note.type === tab).map((note) => (
                            <Card key={note.id} className="bg-card/80 backdrop-blur-lg">
                                <CardHeader>
                                <div className="flex items-center justify-between">
                                    <Badge>{note.type}</Badge>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <User className="h-4 w-4" /> {note.author}
                                    </div>
                                </div>
                                <CardTitle className="pt-2">{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <p className="text-muted-foreground">{note.content}</p>
                                </CardContent>
                                <CardFooter>
                                <Button variant="outline" size="sm">View Note & Comments ({note.comments})</Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
