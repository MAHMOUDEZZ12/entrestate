
'use client';

import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { doc, onSnapshot } from "firebase/firestore";
import { app, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/ui/page-header";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';

function SearchEngineUploadPreview() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("idle");
  const [importId, setImportId] = useState<string | null>(null);
  const [importDoc, setImportDoc] = useState<any>(null);
  const { user } = useAuth();

  const onChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
  };

  const startUpload = async () => {
    if (!file) return alert("Select an XML file.");
    if (!app) return alert("Firebase not initialized.");

    setStatus("requesting upload url");
    try {
      const functions = getFunctions(app);
      const createUpload = httpsCallable(functions, "createUploadUrl");
      const res: any = await createUpload({ filename: file.name, type: "search_context", contentType: file.type });
      const { uploadUrl, importId: id } = res.data;
      setImportId(id);

      setStatus("uploading file...");
      const body = await file.text();
      const r = await fetch(uploadUrl, { method: "PUT", body });
      if (!r.ok) throw new Error("upload failed");

      setStatus("uploaded; awaiting preview...");
      // In a real app, you would listen for the backend to process the file
      // and update the Firestore document. Here we'll simulate it.
      setTimeout(() => {
        const fakePreview = {
          domain: 'example.com',
          pages: [{ title: 'Sample Page 1', summary: 'This is a sample.', tags: ['sample'] }]
        };
        setImportDoc({ preview: fakePreview });
        setStatus('preview ready');
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setStatus("error: " + err.message);
    }
  };

  if (!user) {
      return <Alert><AlertTitle>Not Authenticated</AlertTitle><AlertDescription>Please log in to use the data importer.</AlertDescription></Alert>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Search Context (XML)</CardTitle>
        <CardDescription>Upload an XML file to import search context data into your project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept=".xml,application/xml" onChange={onChoose} />
        <div>Status: <Badge>{status}</Badge></div>

        {importDoc && importDoc.preview && (
          <div className="mt-4 border-t pt-4">
            <h5 className="font-semibold text-lg">Preview: domain '{importDoc.preview.domain}'</h5>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              {importDoc.preview.pages.map((p: any, i: number) => (
                <li key={i}>
                  <b>{p.title || p.url}</b>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                  {p.tags?.length > 0 && <div className="text-xs text-muted-foreground">Tags: {p.tags.join(", ")}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}
         {status.startsWith("error:") && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{status}</AlertDescription></Alert>}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
          <Button onClick={startUpload} disabled={!file || status.includes('uploading')}>Upload & Parse</Button>
      </CardFooter>
    </Card>
  );
}

export default function DataImporterPage() {
    return (
         <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Data Importer"
                description="Manage your search context by importing and exporting XML data."
                icon={<Upload />}
            >
                <Link href="/gem">
                    <Button variant="outline">Back to Gem Dashboard</Button>
                </Link>
            </PageHeader>
            <SearchEngineUploadPreview />
        </main>
    )
}
