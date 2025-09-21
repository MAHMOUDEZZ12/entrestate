
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Save, CheckCircle, BrainCircuit, FileText, ImageIcon, FileSpreadsheet, Download, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  contactInfo: z.string().min(10, 'Contact info is required.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;
type MockFile = { id: number; name: string; type: string; icon: React.ReactNode; size: string; };

const initialMockFiles: MockFile[] = [
  { id: 1, name: 'Emaar_Beachfront_Brochure.pdf', type: 'PDF', icon: <FileText className="h-10 w-10 text-destructive" />, size: '2.5 MB' },
  { id: 2, name: 'Company_Logo_White.png', type: 'PNG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '150 KB' },
  { id: 3, name: 'Investor_List_Q2.csv', type: 'CSV', icon: <FileSpreadsheet className="h-10 w-10 text-green-500" />, size: '320 KB' },
];

export default function BrandPage() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [files, setFiles] = useState<MockFile[]>(initialMockFiles);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      companyName: 'My Real Estate Agency',
      primaryColor: '#008080',
      secondaryColor: '#CC6633',
      contactInfo: 'Jane Doe\n+971 50 123 4567\njane.doe@agency.com',
    },
  });

  const onSubmit = (data: BrandFormValues) => {
    console.log(data);
    return new Promise(resolve => {
        setTimeout(() => {
            toast({
              title: 'Brand Saved!',
              description: 'Your brand assets have been updated successfully.',
            });
            resolve(true);
        }, 1000)
    });
  };
  
  const handleLogoFileChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleTrainAssistant = async () => {
      if (selectedFiles.length === 0) {
        toast({ title: "No Files Selected", description: "Please select one or more files to train the AI.", variant: "destructive" });
        return;
      }
      setIsTraining(true);
      toast({
          title: "AI Training Started",
          description: `The assistant is now analyzing ${selectedFiles.length} file(s). This may take a moment.`,
      });

      // In a real application, you would send these files to be indexed in a vector database.
      await new Promise(resolve => setTimeout(resolve, 3000 + selectedFiles.length * 500));

      toast({
          title: "AI Training Complete!",
          description: "The AI's knowledge base has been updated. You can now ask it questions about the content of your files.",
      });
      setIsTraining(false);
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Brand & Assets"
        description="Manage your brand identity and the files that form the Knowledge Base for your AI assistant."
        icon={<Palette className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Your Brand Kit</CardTitle>
                <CardDescription>
                    Provide your logo, colors, and contact information. The AI will use these assets to ensure everything it creates is perfectly on-brand.
                </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    {/* Form fields for company name, logo, colors, contact info */}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Brand</>}
                    </Button>
                </CardFooter>
                </form>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8 sticky top-24">
            <Card>
                <CardHeader>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>
                        Upload your brochures, market reports, and client lists to train your AI.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {files.map(file => (
                            <div key={file.id} className="flex items-center gap-4">
                                <Checkbox 
                                    id={`file-${file.id}`} 
                                    onCheckedChange={(checked) => {
                                        setSelectedFiles(prev => checked ? [...prev, file.id] : prev.filter(id => id !== file.id));
                                    }}
                                />
                                {file.icon}
                                <div>
                                    <p className="font-semibold">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{file.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New File
                    </Button>
                    <Input ref={fileInputRef} type="file" className="hidden" multiple />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleTrainAssistant} disabled={selectedFiles.length === 0 || isTraining} className="w-full">
                        {isTraining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                        {isTraining ? 'Training AI...' : `Train AI on ${selectedFiles.length} file(s)`}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </main>
  );
}
