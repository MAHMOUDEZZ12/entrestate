
'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Library, Search, Mic, FileText, ImageIcon, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { promptLibrary, PromptCardProps } from '@/lib/prompt-library';
import { PromptCard } from '@/components/ui/prompt-card';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const mediaTypes = ['All', 'Audio', 'Document', 'Image', 'Text', 'Video'];

export default function PromptLibraryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMediaType, setActiveMediaType] = useState('All');
    
    const filteredPrompts = useMemo(() => {
        return promptLibrary.filter(prompt => {
            const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMedia = activeMediaType === 'All' || prompt.mediaType === activeMediaType;
            return matchesSearch && matchesMedia;
        });
    }, [searchTerm, activeMediaType]);

    const getMediaTypeIcon = (type: string) => {
        switch(type) {
            case 'Audio': return <Mic className="h-4 w-4" />;
            case 'Document': return <FileText className="h-4 w-4" />;
            case 'Image': return <ImageIcon className="h-4 w-4" />;
            case 'Text': return <span className="font-bold text-lg leading-none">=</span>;
            case 'Video': return <Video className="h-4 w-4" />;
            default: return null;
        }
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Prompt Library"
                description="Browse prompts across media types and models to help you get started."
                icon={<Library className="h-8 w-8" />}
            />

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search sample prompts..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                 <div className="flex gap-2">
                     <div className="flex-grow md:flex-grow-0">
                        <Select defaultValue="All">
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Tasks" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Tasks</SelectItem>
                                <SelectItem value="summarization">Summarization</SelectItem>
                                <SelectItem value="generation">Content Generation</SelectItem>
                                <SelectItem value="qna">Q&A</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                      <div className="flex-grow md:flex-grow-0">
                         <Select defaultValue="All">
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Features" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Features</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                 </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {mediaTypes.map(type => (
                        <Button
                            key={type}
                            variant={activeMediaType === type ? 'default' : 'outline'}
                            onClick={() => setActiveMediaType(type)}
                            className="shrink-0"
                        >
                            {getMediaTypeIcon(type)}
                            <span className="ml-2">{type}</span>
                        </Button>
                    ))}
                </div>
                <Button variant="ghost" onClick={() => { setActiveMediaType('All'); setSearchTerm(''); }}>Clear All Filters</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPrompts.map(prompt => (
                    <PromptCard key={prompt.title} prompt={prompt} />
                ))}
            </div>
             {filteredPrompts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground col-span-full">
                    <p>No prompts found for your search criteria.</p>
                </div>
            )}
        </main>
    );
}
