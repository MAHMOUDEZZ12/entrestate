
'use client';

import React, { useState, useEffect } from 'react';
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
import { MoreHorizontal, UserPlus, FileText, Mail, Phone, Loader2, User, Building, DollarSign } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


const mockLeads = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'New', interest_level: 'High', source: 'Website Form', lastContacted: '2 hours ago', assigned_to: 'John Doe', property: 'Emaar Beachfront' },
  { id: 2, name: 'Bob Williams', email: 'bob@example.com', status: 'Contacted', interest_level: 'Medium', source: 'Instagram Ad', lastContacted: '1 day ago', assigned_to: 'Jane Smith', property: 'DAMAC Hills 2' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Qualified', interest_level: 'High', source: 'Referral', lastContacted: '3 days ago', assigned_to: 'John Doe', property: 'Sobha Hartland' },
  { id: 4, name: 'Diana Miller', email: 'diana@example.com', status: 'Proposal Sent', interest_level: 'Very High', source: 'Website Form', lastContacted: '5 days ago', assigned_to: 'Jane Smith', property: 'Emaar Beachfront' },
  { id: 5, name: 'Ethan Davis', email: 'ethan@example.com', status: 'Closed', interest_level: 'N/A', source: 'Past Client', lastContacted: '1 week ago', assigned_to: 'John Doe', property: 'Downtown Views' },
  { id: 6, name: 'Fiona Garcia', email: 'fiona@example.com', status: 'New', interest_level: 'Low', source: 'Bayut', lastContacted: '2 weeks ago', assigned_to: 'Unassigned', property: 'N/A' },
  { id: 7, name: 'George Rodriguez', email: 'george@example.com', status: 'Not Interested', interest_level: 'N/A', source: 'Instagram Ad', lastContacted: '1 month ago', assigned_to: 'Jane Smith', property: 'N/A' },
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

const interestVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Very High': 'default',
  'High': 'secondary',
  'Medium': 'outline',
  'Low': 'destructive',
  'default': 'secondary',
};

const CreateLeadForm = ({ setOpen, onLeadCreated }: { setOpen: (open: boolean) => void, onLeadCreated: () => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(res => setTimeout(res, 1000));

        toast({
            title: "Lead Created",
            description: "The new lead has been added to your CRM.",
        });
        onLeadCreated(); // This would trigger a refetch in a real app
        setIsSubmitting(false);
        setOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                 <Select defaultValue="New">
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Lead
                </Button>
            </DialogFooter>
        </form>
    );
};


export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    // Simulate fetching data from Firestore
    setIsLoading(true);
    setTimeout(() => {
        setLeads(mockLeads);
        setIsLoading(false);
    }, 1000);
  }, []);

  const handleLeadCreated = () => {
    // In a real app, we would refetch the leads from the database.
    // For this simulation, we just log it.
    console.log("Lead created, would refetch now.");
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Leads (CRM)"
        description="Manage your client relationships and track potential sales opportunities from all your sources in one place."
        icon={<UserPlus className="h-8 w-8" />}
      >
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Lead
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Lead</DialogTitle>
                    <DialogDescription>Add a new contact to your CRM manually.</DialogDescription>
                </DialogHeader>
                <CreateLeadForm setOpen={setIsFormOpen} onLeadCreated={handleLeadCreated} />
            </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardHeader>
            <CardTitle>Your Lead Pipeline</CardTitle>
            <CardDescription>A list of all your current and past leads.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                 <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <span>Loading leads...</span>
                </div>
            ) : (
                <div className="border rounded-lg w-full">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Lead</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="hidden md:table-cell">Property Interest</TableHead>
                        <TableHead className="hidden md:table-cell">Last Contacted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">
                                <div className="font-medium">{lead.name}</div>
                                <div className="text-xs text-muted-foreground">{lead.email}</div>
                            </TableCell>
                            <TableCell>
                            <Badge variant={statusVariant[lead.status] || 'secondary'}>{lead.status}</Badge>
                            </TableCell>
                            <TableCell>
                            <Badge variant={interestVariant[lead.interest_level] || 'outline'}>{lead.interest_level}</Badge>
                            </TableCell>
                            <TableCell>{lead.source}</TableCell>
                            <TableCell className="hidden md:table-cell">{lead.property}</TableCell>
                            <TableCell className="hidden md:table-cell">{lead.lastContacted}</TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem><User className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
                                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" />Send Email</DropdownMenuItem>
                                <DropdownMenuItem><Phone className="mr-2 h-4 w-4" />Log a Call</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
            )}
        </CardContent>
      </Card>
    </main>
  );
}
