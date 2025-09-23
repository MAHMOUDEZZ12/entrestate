
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockLeads = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'New', lastContacted: '2 hours ago' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', status: 'Contacted', lastContacted: '1 day ago' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Qualified', lastContacted: '3 days ago' },
  { id: 4, name: 'Diana Miller', email: 'diana@example.com', status: 'Proposal Sent', lastContacted: '5 days ago' },
  { id: 5, name: 'Ethan Davis', email: 'ethan@example.com', status: 'Closed', lastContacted: '1 week ago' },
  { id: 6, name: 'Fiona Garcia', email: 'fiona@example.com', status: 'New', lastContacted: '2 weeks ago' },
  { id: 7, name: 'George Rodriguez', email: 'george@example.com', status: 'Not Interested', lastContacted: '1 month ago' },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'New': 'default',
  'Contacted': 'secondary',
  'Qualified': 'default',
  'Proposal Sent': 'default',
  'Closed': 'secondary',
  'Not Interested': 'destructive',
  'default': 'outline',
};

export default function LeadsPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Leads (CRM)"
        description="Manage your client relationships and track potential sales opportunities."
        icon={<UserPlus className="h-8 w-8" />}
      >
         <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Lead
        </Button>
      </PageHeader>

      <div className="border rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Contacted</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[lead.status] || 'secondary'}>{lead.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{lead.lastContacted}</TableCell>
                <TableCell>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
