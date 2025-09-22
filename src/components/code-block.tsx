
'use client';

import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const copyToClipboard = (text: string, toast: any) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The code has been copied successfully.",
    });
};

export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    const textContent = typeof children === 'string' ? children : '';

    return (
        <div className="relative group">
            <pre className="bg-muted text-foreground p-4 rounded-lg text-xs font-mono overflow-x-auto border border-border/50">
            <code>{children}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(textContent, toast)}
            >
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
};
