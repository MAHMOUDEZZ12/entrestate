
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Save, BrainCircuit, FileText, Loader2, Trash2, CheckCircle, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/hooks/useAuth';
import { Checkbox } from '@/components/ui/checkbox';
import type { KnowledgeFile } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logoUrl: z.any().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  contactInfo: z.string().min(10, 'Contact info is required.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const StatusIcon = ({ status }: { status: KnowledgeFile['status'] }) => {
    const statusConfig = {
        uploaded: { icon: <HelpCircle className="h-4 w-4 text-amber-500" />, text: 'Ready to Train' },
        training: { icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />, text: 'Training...' },
        trained: { icon: <CheckCircle className="h-4 w-4 text-green-500" />, text: 'Trained' },
        error: { icon: <HelpCircle className="h-4 w-4 text-red-500" />, text: 'Error' },
    };
    const { icon, text } = statusConfig[status] || statusConfig.uploaded;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                        {icon}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};


export default function BrandPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
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

   const fetchKnowledgeFiles = useCallback(async () => {
    if (!user) return;
    setIsLoadingFiles(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/user/knowledge', {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const data = await response.json();
        if (data.ok) {
            setFiles(data.data);
        } else {
            throw new Error(data.error);
        }
    } catch (e: any) {
        console.error("Failed to fetch knowledge base files", e);
        toast({ title: "Error", description: `Could not load your files: ${e.message}`, variant: "destructive" });
    } finally {
        setIsLoadingFiles(false);
    }
  }, [user, toast]);

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
        fetchKnowledgeFiles();
    }
  }, [user, reset, fetchKnowledgeFiles]);


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
  
  const handleLogoUpload = async (file: File) => {
     if (!user) return;
     toast({ title: 'Uploading logo...'});
     try {
        const idToken = await user.getIdToken();
        const urlResponse = await fetch('/api/user/knowledge-upload-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ filename: file.name, contentType: file.type })
        });
        const { ok, data, error } = await urlResponse.json();
        if (!ok) throw new Error(error);
        const { uploadUrl, fileUrl } = data;

        await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type }});
        
        setLogoPreview(fileUrl);
        reset({ ...control._formValues, logoUrl: fileUrl });

        toast({ title: 'Logo uploaded successfully!' });
     } catch (e: any) {
        console.error('Logo upload failed', e);
        toast({ title: 'Logo Upload Failed', description: e.message, variant: 'destructive'});
     }
  }
  
  const handleLogoFileChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      handleLogoUpload(file);
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
      
      setFiles(prev => prev.map(f => selectedFiles.includes(f.id) ? {...f, status: 'training' as const} : f));

      // In a real application, you would send these files to be indexed in a vector database.
      await new Promise(resolve => setTimeout(resolve, 3000 + selectedFiles.length * 500));
      
      // This is a simulation of the backend process updating the status.
      setFiles(prev => prev.map(f => selectedFiles.includes(f.id) ? {...f, status: 'trained' as const} : f));

      toast({
          title: "AI Training Complete!",
          description: "The AI's knowledge base has been updated. You can now ask it questions about the content of your files.",
      });
      setIsTraining(false);
      setSelectedFiles([]);
  }
  
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        const uploadedFiles = event.target.files;
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        toast({ title: `Uploading ${uploadedFiles.length} file(s)...`});
        
        for (const file of Array.from(uploadedFiles)) {
             try {
                const idToken = await user.getIdToken();
                
                const urlResponse = await fetch('/api/user/knowledge-upload-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                    body: JSON.stringify({ filename: file.name, contentType: file.type })
                });
                const { ok, data, error } = await urlResponse.json();
                if (!ok) throw new Error(error);
                const { uploadUrl, fileUrl, fileId } = data;

                await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type }});
                
                await fetch('/api/user/knowledge-upload-url', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
                    body: JSON.stringify({ fileId, fileName: file.name, fileUrl, fileType: file.type, fileSize: file.size })
                });

            } catch (e: any) {
                console.error(`Failed to upload ${file.name}`, e);
                toast({ title: `Upload Failed for ${file.name}`, description: e.message, variant: 'destructive'});
            }
        }
        
        toast({ title: "Uploads complete!"});
        fetchKnowledgeFiles(); // Refresh the file list
    };

    const handleDeleteFile = async (fileId: string) => {
        if (!user) return;
        try {
            const idToken = await user.getIdToken();
            const response = await fetch(`/api/user/knowledge?fileId=${fileId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${idToken}` },
            });
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);

            toast({ title: 'File Deleted', description: 'The file has been removed from your knowledge base.' });
            fetchKnowledgeFiles();
        } catch(e: any) {
            toast({ title: 'Error', description: `Could not delete file: ${e.message}`, variant: 'destructive'});
        }
    }


  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Brand &amp; Assets"
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
                                <Input id="logo-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => handleLogoFileChange(e.target.files)} />
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
                            <Controller name="primaryColor" control={control} render={({ field }) => (
                               <div className="relative">
                                    <Input id="primaryColor" {...field} className="pl-12" />
                                    <input type="color" value={field.value} onChange={field.onChange} className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-8 cursor-pointer rounded-sm border-none bg-transparent p-0" />
                               </div>
                            )} />
                            {errors.primaryColor && <p className="text-destructive text-sm">{errors.primaryColor.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryColor">Accent Color</Label>
                            <Controller name="secondaryColor" control={control} render={({ field }) => (
                                <div className="relative">
                                    <Input id="secondaryColor" {...field} className="pl-12" />
                                     <input type="color" value={field.value} onChange={field.onChange} className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-8 cursor-pointer rounded-sm border-none bg-transparent p-0" />
                                </div>
                            )} />
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
                        Upload your brochures, market reports, and client lists to train your AI. This will enable it to answer questions about your specific data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoadingFiles ? (
                        <div className="flex justify-center items-center h-40"><Loader2 className="animate-spin"/></div>
                    ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {files.map(file => (
                                <div key={file.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                    <Checkbox 
                                        id={`file-${file.id}`} 
                                        onCheckedChange={(checked) => {
                                            setSelectedFiles(prev => checked ? [...prev, file.id] : prev.filter(id => id !== file.id));
                                        }}
                                        checked={selectedFiles.includes(file.id)}
                                        disabled={file.status === 'trained'}
                                    />
                                    <FileText className="h-6 w-6 text-muted-foreground" />
                                    <div className="overflow-hidden flex-1">
                                        <p className="font-semibold text-sm truncate">{file.fileName}</p>
                                        <p className="text-xs text-muted-foreground">{((file.size || 0) / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <StatusIcon status={file.status} />
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeleteFile(file.id)}><Trash2 className="h-4 w-4 text-destructive/70 hover:text-destructive" /></Button>
                                </div>
                            ))}
                            {files.length === 0 && <p className="text-center text-sm text-muted-foreground py-10">No files uploaded yet.</p>}
                        </div>
                    )}
                     <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New File(s)
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
