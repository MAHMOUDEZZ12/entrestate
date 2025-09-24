'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Upload, Sparkles, CreditCard, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const StepCard = ({ step, title, children, isActive }: { step: number, title: string, children: React.ReactNode, isActive: boolean }) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Step {step}: {title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {children}
                    </CardContent>
                </Card>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function InstagramAdValuePage() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [adScreenshot, setAdScreenshot] = useState<File | null>(null);

    const handleAdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAdScreenshot(e.target.files[0]);
            toast({ title: "Ad Screenshot Attached!" });
            setTimeout(() => setStep(2), 1000);
        }
    };

    const handleEntertainChoice = (choice: 'yes' | 'no') => {
        setStep(3);
    };

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "20.00",
                    },
                },
            ],
        });
    };
    
    const onApprove = async (data: any, actions: any) => {
        setIsLoading(true);
        toast({ title: "Processing payment...", description: "Please wait while we confirm your transaction."});
        
        try {
            // In a real app, you'd get the orderID from the `data` object (data.orderID)
            // and send it to your backend to capture the payment and verify.
            // For this simulation, we'll use a hardcoded ID for our backend flow.
            const transactionId = 'SIMULATED_ORDER_ID_12345';
            
            // This would be a call to a server action or API route in a real app
            // For now, we simulate success after payment capture.
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast({
                title: "Payment Successful!",
                description: "Check your email for your access details. You are being redirected.",
                variant: 'default'
            });

            // Redirect to a confirmation or login page
            setTimeout(() => {
                window.location.href = '/me'; 
            }, 2000);

        } catch (error) {
             toast({
                title: "Payment Failed",
                description: "There was an issue processing your payment. Please try again.",
                variant: "destructive"
            });
            setIsLoading(false);
        }
    };
    
    const onError = (err: any) => {
        toast({
            title: "PayPal Error",
            description: "An error occurred with the PayPal transaction. Please try again.",
            variant: "destructive"
        });
        console.error("PayPal Error:", err);
        setIsLoading(false);
    }

    return (
        <PayPalScriptProvider options={{ clientId: "test", "data-sdk-integration-source": "developer-studio" }}>
             <div className="flex flex-col min-h-screen">
                <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-16 md:py-24">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold font-heading">Are Your Ads Valuable?</h1>
                        <p className="text-muted-foreground mt-2 text-lg">A simple test to see if you understand real value in advertising.</p>
                    </div>
                    
                    <div className="text-lg space-y-4 mb-12 text-center bg-muted/50 p-6 rounded-lg">
                        <p>If it assures what you know, that’s good.</p>
                        <p>If it explains what you had, then follow. It pays.</p>
                        <p>If it describes what you’re facing, then click the ad to solve it in 3 steps.</p>
                    </div>

                    <div className="relative min-h-[300px]">
                        <StepCard step={1} title="Attach Your Ad" isActive={step === 1}>
                            <p className="text-muted-foreground mb-4">Attach a screenshot of any recent ad you've run. We're interested in the value it delivers, not just its looks.</p>
                            <label htmlFor="ad-upload" className="w-full">
                                <div className={cn(
                                    "flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                                    adScreenshot ? "border-green-500 bg-green-500/10" : "border-border"
                                )}>
                                    <Upload className={cn("h-5 w-5", adScreenshot && "text-green-500")} />
                                    <span className={cn(adScreenshot && "text-green-600 font-semibold")}>
                                        {adScreenshot ? adScreenshot.name : "Click to attach ad screenshot"}
                                    </span>
                                </div>
                            </label>
                            <input type="file" id="ad-upload" className="hidden" onChange={handleAdUpload} accept="image/*" />
                        </StepCard>

                        <StepCard step={2} title="A Question of Value" isActive={step === 2}>
                            <p className="text-muted-foreground mb-6">So far you read, then uniquely visited, then perfected submitted the task. No images, no videos, no colors. Does this ad entertain you enough to be considered “Value”?</p>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline" size="lg" onClick={() => handleEntertainChoice('yes')}>Yes, it does</Button>
                                <Button className="flex-1" variant="outline" size="lg" onClick={() => handleEntertainChoice('no')}>No, it does not</Button>
                            </div>
                        </StepCard>

                        <StepCard step={3} title="The Final Step" isActive={step === 3}>
                            <p className="text-muted-foreground mb-2">Fair, value is free. But the ad was not. Pay back the cost spent to reach you, then do nothing to get a open the gate to your perfect ad. Not an Ebook, it’s a click to action backed on (1). It pays.</p>
                            <p className="mb-6">Pay 20 usd then open your email.</p>
                            
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                               <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                    onClick={() => setIsLoading(true)}
                                />
                            )}
                        </StepCard>
                    </div>
                     <div className="text-center mt-12 text-xs text-muted-foreground">
                        <Link href="/cookies" className="underline hover:text-primary">Delete your cookies from here if needed.</Link>
                    </div>
                </main>
            </div>
        </PayPalScriptProvider>
    );
}
