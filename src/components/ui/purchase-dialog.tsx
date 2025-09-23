
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Feature } from '@/lib/tools-client';

interface PurchaseDialogProps {
  tool: Feature & { price: number };
  children: React.ReactNode;
}

export function PurchaseDialog({ tool, children }: PurchaseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsOpen(false);
    toast({
      title: 'Purchase Successful!',
      description: `You have successfully purchased "${tool.title}". You can now access it in your dashboard.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase "{tool.title}"</DialogTitle>
          <DialogDescription>
            You are about to purchase single access to this tool. Enter your payment details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePurchase} className="space-y-4">
          <div className="text-center bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground">Total amount</p>
            <p className="text-3xl font-bold font-heading text-primary">${tool.price.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-details">Card Details</Label>
            <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="card-details" placeholder="Card Number" className="pl-10" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM / YY" required />
                <Input placeholder="CVC" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? 'Processing...' : `Pay $${tool.price.toFixed(2)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
