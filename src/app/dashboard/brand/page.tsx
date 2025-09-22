
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Save, BrainCircuit, FileText, ImageIcon, FileSpreadsheet, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';
import { Checkbox } from '@/components/ui/checkbox';

const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logoUrl: z.any().optional(),
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
  const { user } = useAuth();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [files, setFiles] = useState<MockFile[]>(initialMockFiles);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      companyName: '',
      primaryColor: '#008080',
      secondaryColor: '#CC6633',
      contactInfo: '',
    },
  });

  useEffect(() => {
    if (user) {
        const fetchUserData = async () => {
            try {
                const idToken = await user.getIdToken();
                const response = await fetch('/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${idToken}` }
                });
                const data = await response.json();
                if (data.ok && data.data) {
                    const userData = data.data;
                    const contact = userData.brandKit?.contact;
                    reset({
                        companyName: userData.companyName || '',
                        primaryColor: userData.brandKit?.colors?.primary || '#008080',
                        secondaryColor: userData.brandKit?.colors?.accent || '#CC6633',
                        contactInfo: contact ? `${contact.name || ''}\n${contact.phone || ''}\n${contact.email || ''}` : '',
                        logoUrl: userData.brandKit?.logoUrl || null,
                    });
                    if (userData.brandKit?.logoUrl) {
                        setLogoPreview(userData.brandKit.logoUrl);
                    }
                }
            } catch(e) { console.error("Failed to fetch user profile", e); }
        }
        fetchUserData();
    }
  }, [user, reset]);


  const onSubmit = async (data: BrandFormValues) => {
    if (!user) {
        toast({ title: "Not Authenticated", description: "You must be logged in to save your brand.", variant: "destructive" });
        return;
    }
    try {
        const idToken = await user.getIdToken();
        const [name, phone, email] = data.contactInfo.split('\n');
        const payload = {
            companyName: data.companyName,
            brandKit: {
                logoUrl: logoPreview,
                colors: {
                    primary: data.primaryColor,
                    accent: data.secondaryColor,
                },
                contact: { name, phone, email }
            }
        };

        const response = await fetch('/api/user/profile', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
             },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save brand kit.');
        }

        toast({
          title: 'Brand Saved!',
          description: 'Your brand assets have been updated successfully.',
        });

    } catch (error: any) {
        toast({
          title: 'Error Saving Brand',
          description: error.message,
          variant: 'destructive',
        });
    }
  };
  
  const handleLogoFileChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setValue("logoUrl", reader.result as string);
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
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (uploadedFiles && uploadedFiles.length > 0) {
            const newFiles = Array.from(uploadedFiles).map((file, index) => ({
                id: Date.now() + index,
                name: file.name,
                type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
                icon: <FileText className="h-10 w-10 text-muted-foreground" />,
                size: `${(file.size / 1024).toFixed(2)} KB`,
            }));
            setFiles(prev => [...prev, ...newFiles]);
            toast({ title: `${newFiles.length} file(s) uploaded successfully.`});
        }
    };


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
                   <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Controller name="companyName" control={control} render={({ field }) => <Input id="companyName" {...field} />} />
                        {errors.companyName && <p className="text-destructive text-sm">{errors.companyName.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                         <div className="flex items-center gap-4">
                            <div className="relative flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary transition-colors">
                                <Input id="logo-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => handleLogoFileChange(e.target.files)} ref={fileInputRef} />
                                <label htmlFor="logo-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                {logoPreview ? (
                                    <Image src={logoPreview} alt="Logo preview" fill={true} className="object-contain rounded-md p-2" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                    <Upload className="mx-auto h-8 w-8 mb-1" />
                                    <p className="text-xs">Upload Logo</p>
                                    </div>
                                )}
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="primaryColor">Primary Color</Label>
                            <Controller name="primaryColor" control={control} render={({ field }) => <Input id="primaryColor" {...field} />} />
                            {errors.primaryColor && <p className="text-destructive text-sm">{errors.primaryColor.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryColor">Accent Color</Label>
                            <Controller name="secondaryColor" control={control} render={({ field }) => <Input id="secondaryColor" {...field} />} />
                             {errors.secondaryColor && <p className="text-destructive text-sm">{errors.secondaryColor.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="contactInfo">Contact Info</Label>
                        <Controller name="contactInfo" control={control} render={({ field }) => <Textarea id="contactInfo" {...field} rows={4} placeholder="Your Name&#10;Phone Number&#10;Email Address"/>} />
                        {errors.contactInfo && <p className="text-destructive text-sm">{errors.contactInfo.message}</p>}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save Brand</>}
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
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {files.map(file => (
                            <div key={file.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                                <Checkbox 
                                    id={`file-${file.id}`} 
                                    onCheckedChange={(checked) => {
                                        setSelectedFiles(prev => checked ? [...prev, file.id] : prev.filter(id => id !== file.id));
                                    }}
                                />
                                {file.icon}
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-sm truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                     <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New File
                    </Button>
                    <Input ref={fileInputRef} type="file" className="hidden" multiple onChange={handleFileUpload} />
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

    