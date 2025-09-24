
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Check, Zap, ArrowRight } from 'lucide-react';
import type { ToolData } from '@/lib/tools-data';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


// Re-map the imported icon name to the actual icon component
import {
    Bot, BrainCircuit, CheckCircle, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube, Edit, CreditCard, Library, Facebook, Wrench, Briefcase, Languages, LinkIcon, Sparkle
} from 'lucide-react';


const icons: { [key: string]: React.ReactElement } = {
    Bot: <Bot />, BrainCircuit: <BrainCircuit />, CheckCircle: <CheckCircle />, Plus: <Plus />, Sparkles: <Sparkles />,
    Upload: <Upload />, Megaphone: <Megaphone />, User: <User />, ShieldQuestion: <ShieldQuestion />, Search: <Search />,
    MessageCircle: <MessageCircle />, PenTool: <PenTool />, Clock2: <Clock2 />, Wallet: <Wallet />, BadgeCheck: <BadgeCheck />,
    ClipboardList: <ClipboardList />, Target: <Target />, LineChart: <LineChart />, Users2: <Users2 />, Network: <Network />,
    LayoutTemplate: <LayoutTemplate />, Video: <Video />, Instagram: <Instagram />, FileText: <FileText />, Globe: <Globe />,
    FileSearch: <FileSearch />, KeyRound: <KeyRound />, BarChart3: <BarChart3 />, Newspaper: <Newspaper />,
    Handshake: <Handshake />, Filter: <Filter />, ListChecks: <ListChecks />, Container: <Container />,
    BotMessageSquare: <BotMessageSquare />, Terminal: <Terminal />, FileCheck: <FileCheck />, Palette: <Palette />,
    Map: <Map />, LandPlot: <LandPlot />, Building: <Building />, Camera: <Camera />, Calculator: <Calculator />,
    Album: <Album />, Wand2: <Wand2 />, Database: <Database />, BarChart: <BarChart />, FileJson: <FileJson />,
    ImageIcon: <ImageIcon />, Youtube: <Youtube />, Edit: <Edit />, CreditCard: <CreditCard />, Library: <Library />,
    Facebook: <Facebook />, Languages: <Languages />, LinkIcon: <LinkIcon />, Briefcase: <Briefcase />, Wrench: <Wrench />, Sparkle: <Sparkle />
};


interface DashboardServiceCardProps {
    tool: ToolData;
    isAdded: boolean;
    setIsAdded: (isAdded: boolean) => void;
    connectionRequired?: string;
    paymentRequired?: boolean;
}

export const DashboardServiceCard = ({ tool, isAdded, setIsAdded, connectionRequired, paymentRequired }: DashboardServiceCardProps) => {
  const { toast } = useToast();
  const icon = icons[tool.iconName] || <Sparkles />;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    toast({
      title: `${tool.title} Added!`,
      description: `The "${tool.title}" app is now available in your workspace.`,
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(false);
    toast({
      title: `${tool.title} Removed`,
      description: `The app has been removed from your workspace.`,
      variant: 'destructive',
    });
  };

  const actionButton = isAdded ? (
    <Button variant="outline" size="sm" onClick={handleRemove} className="w-full">
      <Check className="mr-2 h-4 w-4" /> Added
    </Button>
  ) : (
    <Button size="sm" onClick={handleAdd} className="w-full">
      <Plus className="mr-2 h-4 w-4" /> Add to Workspace
    </Button>
  );

  return (
    <Dialog>
        <DialogTrigger asChild>
            <div className="block group cursor-pointer">
                <Card 
                    className="h-full flex flex-col hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-b-4"
                    style={{'--card-border-color': tool.color, borderBottomColor: 'var(--card-border-color)'} as React.CSSProperties}
                >
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div className="p-3 rounded-lg text-white mb-4" style={{ backgroundColor: tool.color }}>
                                {React.cloneElement(icon, { className: 'h-6 w-6' })}
                            </div>
                            {tool.badge && <Badge variant={tool.badge === 'DEPRECATED' ? 'destructive' : 'default'}>{tool.badge}</Badge>}
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                         <div className="w-full space-y-2">
                            {connectionRequired && (
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Zap className="h-3 w-3 text-amber-500" />
                                    Requires {connectionRequired} connection
                                </div>
                            )}
                            {/* The button text is now just 'Details' since clicking opens the dialog */}
                            <Button variant="outline" className="w-full" size="sm" asChild>
                                <div>Details</div>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-lg text-white" style={{ backgroundColor: tool.color }}>
                        {React.cloneElement(icon, { className: 'h-6 w-6' })}
                    </div>
                    <div>
                        <DialogTitle className="text-2xl">{tool.title}</DialogTitle>
                         {tool.badge && <Badge variant={tool.badge === 'DEPRECATED' ? 'destructive' : 'default'} className="mt-1">{tool.badge}</Badge>}
                    </div>
                </div>
                <DialogDescription className="text-base text-foreground/80">
                  {tool.longDescription}
                </DialogDescription>
            </DialogHeader>
             <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
                {actionButton}
                 <Link href={`/me/tool/${tool.id}`} className="w-full">
                    <Button variant="secondary" className="w-full">
                       Go to Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
