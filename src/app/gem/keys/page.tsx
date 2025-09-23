
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Key, CheckCircle, AlertTriangle, Link as LinkIcon, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const apiKeys = [
    { name: 'GEMINI_API_KEY', service: 'Google AI', status: 'Configured', note: 'Powers all generative AI features.' },
    { name: 'FIREBASE_SERVICE_ACCOUNT', service: 'Firebase Admin', status: 'Configured', note: 'For backend database and auth operations.' },
    { name: 'PAYPAL_CLIENT_ID / SECRET', service: 'PayPal', status: 'Configured', note: 'For processing payments and transaction lookups.' },
    { name: 'BAYUT_API_KEY', service: 'Bayut Portal', status: 'Missing', note: 'Required for the Bayut Listing Pilot.' },
    { name: 'PROPERTY_FINDER_API_KEY', service: 'Property Finder Portal', status: 'Missing', note: 'Required for the Property Finder Listing Pilot.' },
];

const oauthConnections = [
    { service: 'Meta (Facebook/Instagram)', status: 'Connected', note: 'For ad management and social posting.' },
    { service: 'Google (Gmail/YouTube)', status: 'Connected', note: 'For email campaigns and video management.' },
    { service: 'WhatsApp Business', status: 'Disconnected', note: 'For sending messages via WhatsApp campaigns.' },
];


export default function KeysAndApisPage() {

    const getStatus = (status: string) => {
        if (status === 'Configured' || status === 'Connected') {
            return <Badge className="bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30"><CheckCircle className="mr-2 h-4 w-4" />{status}</Badge>
        }
        return <Badge variant="destructive"><AlertTriangle className="mr-2 h-4 w-4" />{status}</Badge>
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Keys & API Monitoring"
                description="A centralized view of the status and configuration of all external API keys and connections."
                icon={<Key className="h-8 w-8" />}
            >
                 <Link href="/gem">
                    <Button variant="outline">Back to Gem Dashboard</Button>
                </Link>
            </PageHeader>
            
            <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                    This is a simulation. For security, actual key values are never displayed. Status is determined by checking for the presence of environment variables on the server.
                </AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader>
                    <CardTitle>API Key Status</CardTitle>
                    <CardDescription>Status of environment variables required for core functionality.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Environment Variable</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Note</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {apiKeys.map(key => (
                                   <TableRow key={key.name}>
                                       <TableCell className="font-mono">{key.name}</TableCell>
                                       <TableCell>{key.service}</TableCell>
                                       <TableCell>{getStatus(key.status)}</TableCell>
                                       <TableCell>{key.note}</TableCell>
                                   </TableRow>
                               ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>OAuth Connections</CardTitle>
                    <CardDescription>Status of user-level connections to external platforms.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Note</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {oauthConnections.map(conn => (
                                   <TableRow key={conn.service}>
                                       <TableCell>{conn.service}</TableCell>
                                       <TableCell>{getStatus(conn.status)}</TableCell>
                                       <TableCell>{conn.note}</TableCell>
                                       <TableCell className="text-right">
                                           <Link href="/dashboard/settings?tab=connections">
                                             <Button variant="outline" size="sm">
                                                <LinkIcon className="mr-2 h-4 w-4" /> Manage
                                             </Button>
                                           </Link>
                                       </TableCell>
                                   </TableRow>
                               ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
