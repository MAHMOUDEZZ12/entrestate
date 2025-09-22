
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Users, Building, Linkedin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const developerContacts = [
  { name: 'Emaar Properties', office: 'Downtown Dubai', phone: '+971 4 367 3333' },
  { name: 'DAMAC Properties', office: 'Dubai Marina', phone: '+971 4 373 1000' },
  { name: 'Sobha Realty', office: 'Meydan', phone: '+971 4 449 5500' },
  { name: 'Nakheel', office: 'Palm Jumeirah', phone: '+971 4 390 3333' },
  { name: 'Meraas', office: 'City Walk', phone: '+971 4 317 3999' },
  { name: 'Aldar Properties', office: 'Yas Island, Abu Dhabi', phone: '+971 2 810 5555' },
];

const agentContacts = [
  { name: 'John Smith', agency: 'Luxe Homes Dubai', linkedin: 'https://www.linkedin.com/in/johnsmithre' },
  { name: 'Jane Doe', agency: 'Prestige Real Estate', linkedin: 'https://www.linkedin.com/in/janedoere' },
  { name: 'Michael Johnson', agency: 'The Property Group', linkedin: 'https://www.linkedin.com/in/michaeljohnsonre' },
  { name: 'Emily Williams', agency: 'Emaar Properties (Internal)', linkedin: 'https://www.linkedin.com/in/emilywilliamsre' },
  { name: 'Chris Brown', agency: 'DAMAC Properties (Internal)', linkedin: 'https://www.linkedin.com/in/chrisbrownre' },
];


export default function DirectoryPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Contacts Directory"
        description="Your private phone book of key real estate developers and agents in the market."
        icon={<Users className="h-8 w-8" />}
      />

        <Tabs defaultValue="developers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="developers"><Building className="mr-2 h-4 w-4"/>Developer Directory</TabsTrigger>
              <TabsTrigger value="agents"><Linkedin className="mr-2 h-4 w-4"/>Agent Network</TabsTrigger>
            </TabsList>
            <TabsContent value="developers" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Developer Contacts</CardTitle>
                        <CardDescription>Direct branch numbers for major developers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Developer</TableHead>
                                    <TableHead>Main Office Location</TableHead>
                                    <TableHead className="text-right">Direct Phone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {developerContacts.map(dev => (
                                    <TableRow key={dev.name}>
                                        <TableCell className="font-medium">{dev.name}</TableCell>
                                        <TableCell>{dev.office}</TableCell>
                                        <TableCell className="text-right font-mono">
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={`tel:${dev.phone}`}>
                                                    <Phone className="mr-2 h-4 w-4"/>
                                                    {dev.phone}
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="agents" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Agent Network</CardTitle>
                        <CardDescription>Connect with top-performing agents on LinkedIn.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Agent Name</TableHead>
                                    <TableHead>Agency</TableHead>
                                    <TableHead className="text-right">LinkedIn Profile</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agentContacts.map(agent => (
                                    <TableRow key={agent.name}>
                                        <TableCell className="font-medium">{agent.name}</TableCell>
                                        <TableCell>{agent.agency}</TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="outline" size="sm" asChild>
                                                <a href={agent.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin className="mr-2 h-4 w-4"/>
                                                    View Profile
                                                </a>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </main>
  );
}
