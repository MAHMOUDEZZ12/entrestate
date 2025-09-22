
'use client';

import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { PageHeader } from "@/components/ui/page-header";
import { Upload, Loader2, Download, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

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
    if (!auth) return alert("Firebase not initialized.");

    setStatus("requesting upload url");
    try {
      const functions = getFunctions(auth.app);
      const createUpload = httpsCallable(functions, "createUploadUrl");
      const res: any = await createUpload({ filename: file.name, type: "search_context" });
      const { uploadUrl, importId: id } = res.data;
      setImportId(id);

      // upload
      setStatus("uploading file...");
      const body = await file.text();
      const r = await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": "application/xml" }, body });
      if (!r.ok) throw new Error("upload failed");

      setStatus("uploaded; waiting for preview...");
      // listen to xmlImports doc for preview
      if (!db) return;
      const impRef = doc(db, "xmlImports", id);
      const unsub = onSnapshot(impRef, snap => {
        if (!snap.exists()) return;
        const d = snap.data(); setImportDoc(d);
        if (d.status === "pending_preview") setStatus("preview ready");
        else if (d.status === "processing") setStatus("processing");
        else if (d.status === "error") setStatus("error: " + JSON.stringify(d.errors || d.error));
        else if (d.status === "done") { setStatus("done"); unsub(); }
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error: " + err.message);
    }
  };

  const confirm = async (mergePolicy = "skip") => {
    if (!importId || !auth) return;
    setStatus("confirming import...");
    try {
      const functions = getFunctions(auth.app);
      const confirmFn = httpsCallable(functions, "confirmImport");
      const res: any = await confirmFn({ importId, mergePolicy });
      const data = res.data;
      setStatus("import committed: " + (data.committed || 0) + " pages");
    } catch (err: any) {
      setStatus("confirm error: " + err.message);
    }
  };

  if (!user) {
      return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Authentication Required</AlertTitle><AlertDescription>Please log in to use the data importer.</AlertDescription></Alert>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Search Context (XML)</CardTitle>
        <CardDescription>Upload an XML file to import search context data into your project.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept=".xml" onChange={onChoose} />
        <div>Status: <Badge>{status}</Badge></div>

        {importDoc && importDoc.preview && (
          <div className="mt-4 border-t pt-4">
            <h5 className="font-semibold text-lg">Preview: domain '{importDoc.preview.domain}'</h5>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              {importDoc.preview.pages.map((p: any, i: number) => (
                <li key={i}>
                  <b>{p.title || p.url}</b>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                  {p.tags.length > 0 && <div className="text-xs text-muted-foreground">Tags: {p.tags.join(", ")}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}
         {status.startsWith("error:") && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{status}</AlertDescription></Alert>}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
          <Button onClick={startUpload} disabled={!file || status.includes('uploading') || status.includes('processing')}>
              { (status.includes('uploading') || status.includes('processing')) && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Upload & Parse
          </Button>
          {status === 'preview ready' && (
              <div className="flex gap-2">
                <Button onClick={() => confirm("skip")}>Confirm & Import (Merge/Skip Duplicates)</Button>
                <Button variant="destructive" onClick={() => confirm("overwrite")}>Confirm & Overwrite</Button>
              </div>
          )}
      </CardFooter>
    </Card>
  );
}

function SearchContextExport() {
    const { user } = useAuth();
    const [domain, setDomain] = useState('');
    const [status, setStatus] = useState('idle');

    const handleExport = async () => {
        if (!domain) return alert("Please enter a domain to export.");
        if (!auth) return alert("Firebase not initialized.");
        setStatus('exporting...');
        try {
            const functions = getFunctions(auth.app);
            const exportFn = httpsCallable(functions, "exportSearchContext");
            const res: any = await exportFn({ domain });
            const { downloadUrl } = res.data;
            window.open(downloadUrl, '_blank');
            setStatus('exported');
        } catch (err: any) {
            console.error(err);
            setStatus('error: ' + err.message);
        }
    };
    
    if (!user) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Export Search Context (XML)</CardTitle>
                <CardDescription>Export your Firestore search context data for a specific domain as an XML file.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="domain">Domain to Export</Label>
                    <Input id="domain" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g., example.com" />
                </div>
                 <div>Status: <Badge>{status}</Badge></div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleExport} disabled={!domain || status === 'exporting'}>
                    {status === 'exporting' && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    <Download className="mr-2 h-4 w-4" />
                    Export XML
                </Button>
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
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SearchEngineUploadPreview />
                <SearchContextExport />
            </div>
        </main>
    )
}

    