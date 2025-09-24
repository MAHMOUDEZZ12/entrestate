'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Settings, Palette, User, CreditCard, Paintbrush, Text, Sun, Moon, Laptop, Bot, BrainCircuit, Network, Database, Users, Instagram, Facebook, Linkedin, Mail, MessageCircle, Twitter, Share2, Building, MousePointer, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { IntegrationCard } from '@/components/ui/integration-card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const mockBillingHistory = [
  { id: 'inv-001', date: 'Feb 20, 2024', amount: '$99.00', status: 'Paid' },
  { id: 'inv-002', date: 'Jan 20, 2024', amount: '$99.00', status: 'Paid' },
  { id: 'inv-003', date: 'Dec 20, 2023', amount: '$99.00', status: 'Paid' },
];

const themes = [
    { id: "light", name: "Light", icon: <Sun /> },
    { id: "dark", name: "Dark", icon: <Moon /> },
    { id: "system", name: "System", icon: <Laptop /> },
    { id: "theme-pinkpurple", name: "Pink/Purple", icon: <Bot /> },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [connections, setConnections] = React.useState({
    social: true,
    email: false,
    whatsapp: false,
    propertyFinder: false,
    bayut: true,
    googleDrive: false,
  });

  const [isDraggableSearch, setIsDraggableSearch] = useState(false);
  const [isBarOnTop, setIsBarOnTop] = useState(false);

  useEffect(() => {
    try {
        const draggable = localStorage.getItem('isSearchDraggable');
        const barOnTop = localStorage.getItem('isAnalogBarOnTop');
        setIsDraggableSearch(draggable === 'true');
        setIsBarOnTop(barOnTop === 'true');
    } catch (e) {
        // Handle cases where localStorage is not available
    }
  }, []);

  const handleDraggableToggle = (checked: boolean) => {
      setIsDraggableSearch(checked);
      try {
          localStorage.setItem('isSearchDraggable', String(checked));
          toast({
              title: "Search setting updated!",
              description: `The search menu is now ${checked ? 'draggable' : 'fixed'}. The change will apply on next page load.`
          });
      } catch (e) {
         toast({
              title: "Could not save setting",
              description: "Your browser does not seem to support local storage.",
              variant: "destructive"
          });
      }
  }

  const handleBarPositionToggle = (checked: boolean) => {
      setIsBarOnTop(checked);
      try {
          localStorage.setItem('isAnalogBarOnTop', String(checked));
          toast({
              title: "Analog Bar position updated!",
              description: `The bar will now be at the ${checked ? 'top' : 'bottom'}. Please reload the page to see the change.`
          });
      } catch (e) {
         toast({
              title: "Could not save setting",
              description: "Your browser does not seem to support local storage.",
              variant: "destructive"
          });
      }
  }

  const handleConnectionToggle = (key: keyof typeof connections) => {
    setConnections(prev => {
        const newState = !prev[key];
        toast({
            title: `Connection ${newState ? 'Enabled' : 'Disabled'}`,
            description: `The integration has been ${newState ? 'connected' : 'disconnected'}.`
        });
        return { ...prev, [key]: newState };
    });
  }

  const handleSaveChanges = (area: string) => {
    toast({
        title: `${area} Settings Saved`,
        description: `Your ${area.toLowerCase()} settings have been successfully updated.`
    });
  }

  return (
    <main className="p-4 md:p-10 space-y-8 container mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account, appearance, and subscription preferences."
        icon={<Settings className="h-8 w-8" />}
      />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="account"><User className="mr-2 h-4 w-4" /> Account</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="analog"><MousePointer className="mr-2 h-4 w-4" /> GemAnalog</TabsTrigger>
          <TabsTrigger value="assistant"><Bot className="mr-2 h-4 w-4" /> Assistant</TabsTrigger>
          <TabsTrigger value="connections"><Network className="mr-2 h-4 w-4" /> Connections</TabsTrigger>
          <TabsTrigger value="subscription"><CreditCard className="mr-2 h-4 w-4" /> Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your email address and manage your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => handleSaveChanges('Account')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                 <RadioGroup defaultValue="dark" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {themes.map(theme => (
                         <div key={theme.id}>
                            <RadioGroupItem value={theme.id} id={theme.id} className="peer sr-only" />
                            <Label htmlFor={theme.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                               {React.cloneElement(theme.icon, {className: "mb-3 h-6 w-6"})}
                               {theme.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="relative">
                          <Input id="primaryColor" defaultValue="#1a8a8a" className="pl-12" />
                          <input type="color" defaultValue="#1a8a8a" className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-8 cursor-pointer rounded-sm border-none bg-transparent p-0" />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="relative">
                          <Input id="accentColor" defaultValue="#f58025" className="pl-12" />
                           <input type="color" defaultValue="#f58025" className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-8 cursor-pointer rounded-sm border-none bg-transparent p-0" />
                      </div>
                  </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="100">
                    <SelectTrigger id="font-size" className="w-[180px]">
                        <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="87.5">Small (87.5%)</SelectItem>
                        <SelectItem value="100">Normal (100%)</SelectItem>
                        <SelectItem value="112.5">Large (112.5%)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={() => handleSaveChanges('Appearance')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="analog">
           <Card>
            <CardHeader>
              <CardTitle>GemAnalog Options</CardTitle>
              <CardDescription>Customize the behavior of your "Play Analog" sensitive control bar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <ArrowUp className="h-5 w-5 text-muted-foreground"/>
                    <div>
                        <Label htmlFor="bar-position">Position Analog Bar at Top</Label>
                        <p className="text-sm text-muted-foreground">
                         Move the command bar to the top of the screen, below the header.
                        </p>
                    </div>
                  </div>
                  <Switch id="bar-position" checked={isBarOnTop} onCheckedChange={handleBarPositionToggle} />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <MousePointer className="h-5 w-5 text-muted-foreground"/>
                    <div>
                        <Label htmlFor="draggable-search">Enable Draggable Search Menu</Label>
                        <p className="text-sm text-muted-foreground">
                         When enabled, the command menu becomes a movable window.
                        </p>
                    </div>
                  </div>
                  <Switch id="draggable-search" checked={isDraggableSearch} onCheckedChange={handleDraggableToggle} />
                </div>

                <div className="space-y-2">
                    <Label>Right Key Behavior</Label>
                    <Select defaultValue="smart-menu">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="smart-menu">Smart Menu (Contextual)</SelectItem>
                            <SelectItem value="analyze-page">Always Analyze Page</SelectItem>
                            <SelectItem value="copy-result">Always Copy Last Result</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Default Left Keys</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Select defaultValue="new-flow">
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new-flow">New Flow</SelectItem>
                                <SelectItem value="add-project">Add Project</SelectItem>
                                <SelectItem value="view-guide">View Guide</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="add-project">
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                               <SelectItem value="new-flow">New Flow</SelectItem>
                               <SelectItem value="add-project">Add Project</SelectItem>
                               <SelectItem value="view-guide">View Guide</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Alert className="border-primary/30 bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary font-bold">Coming Soon: AI Apps, powered by GemAnalog</AlertTitle>
                    <AlertDescription>
                        A premium workspace where you can visually map, connect, and deploy complex AI workflows like never before. The ultimate evolution of the GemAnalog concept.
                    </AlertDescription>
                </Alert>
                
            </CardContent>
             <CardFooter>
                 <Button onClick={() => handleSaveChanges('Analog')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Manage the behavior and knowledge base of your AI assistant.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Link href="/me/brand">
                    <Button variant="outline">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Go to Knowledge Base & Training
                    </Button>
                 </Link>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => handleSaveChanges('Assistant')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>External Connections</CardTitle>
              <CardDescription>
                Connect your external accounts to unlock powerful integrations and automations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">Listing Portals</h4>
                   <Separator className="my-2"/>
                   <div className="space-y-2 pt-2">
                      <IntegrationCard
                          title="Property Finder"
                          description="Connect your Property Finder account to sync listings and manage inquiries."
                          icon={<Building />}
                          connected={connections.propertyFinder}
                          onConnect={() => handleConnectionToggle('propertyFinder')}
                          onDisconnect={() => handleConnectionToggle('propertyFinder')}
                      />
                      <IntegrationCard
                          title="Bayut"
                          description="Connect your Bayut account for automated listing updates and lead management."
                          icon={<Building />}
                          connected={connections.bayut}
                          onConnect={() => handleConnectionToggle('bayut')}
                          onDisconnect={() => handleConnectionToggle('bayut')}
                      />
                   </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Communication</h4>
                  <Separator className="my-2"/>
                  <div className="space-y-2 pt-2">
                    <IntegrationCard
                        title="Social Media Accounts"
                        description="Connect Instagram, Facebook, LinkedIn, and X for automated posting and AI Page Admin."
                        icon={<Share2 />}
                        connected={connections.social}
                        onConnect={() => handleConnectionToggle('social')}
                        onDisconnect={() => handleConnectionToggle('social')}
                    />
                    <IntegrationCard
                        title="Email Account"
                        description="Connect Gmail or Outlook to send AI-generated email campaigns directly."
                        icon={<Mail />}
                        connected={connections.email}
                        onConnect={() => handleConnectionToggle('email')}
                        onDisconnect={() => handleConnectionToggle('email')}
                    />
                    <IntegrationCard
                        title="WhatsApp Business"
                        description="Enable WhatsApp campaigns and automated follow-ups."
                        icon={<MessageCircle />}
                        connected={connections.whatsapp}
                        onConnect={() => handleConnectionToggle('whatsapp')}
                        onDisconnect={() => handleConnectionToggle('whatsapp')}
                    />
                  </div>
                </div>

                 <div>
                  <h4 className="font-semibold text-lg">Storage</h4>
                   <Separator className="my-2"/>
                   <div className="space-y-2 pt-2">
                      <IntegrationCard
                          title="Google Drive"
                          description="Connect your Google Drive to allow the AI to access and learn from your documents for a smarter assistant."
                          icon={<Database />}
                          connected={connections.googleDrive}
                          onConnect={() => handleConnectionToggle('googleDrive')}
                          onDisconnect={() => handleConnectionToggle('googleDrive')}
                      />
                   </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>Manage your subscription plan and view billing history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Current Plan</h4>
                  <p className="text-muted-foreground">You are on the <span className="text-primary font-semibold">Pro Plan</span>. Your subscription renews on March 20, 2025.</p>
                </div>
                <div>
                   <h4 className="font-medium text-lg mb-2">Payment Method</h4>
                   <div className="flex items-center gap-4 rounded-md border p-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                        </div>
                        <Button variant="outline" className="ml-auto">Update</Button>
                   </div>
                </div>
                 <div>
                   <h4 className="font-medium text-lg mb-2">Billing History</h4>
                    <div className="border rounded-md">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBillingHistory.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                   </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </main>
  );
}
