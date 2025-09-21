
import React from 'react';
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building2, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image
} from 'lucide-react';
import type { Feature } from '@/lib/tools-client';

// THIS FILE IS DEPRECATED. The data has been moved to tools-client.tsx to create a single source of truth.
// This file is now empty and can be removed in the future.

export const tools: Omit<Feature, 'details' | 'longDescription' | 'creationFields' | 'renderResult'>[] = [];
