
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would call a backend service (e.g., Firebase Auth, Twilio)
      // to send an OTP to the user's phone number via SMS or WhatsApp.
      console.log(`Sending OTP to ${phone}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({ title: "Verification Code Sent!", description: `A code has been sent to ${phone}.` });
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
      toast({ title: "Failed to Send Code", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would verify the code with the backend service.
      // If successful, the service returns a session token, and we log the user in.
      console.log(`Verifying code ${code} for phone ${phone}`);
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({ title: "Verification Successful!", description: "Welcome to your workspace." });
      router.push('/me'); // Redirect to dashboard after successful login
    } catch (err: any) {
      setError("Invalid verification code. Please try again.");
      toast({ title: "Login Failed", description: "Invalid verification code.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const PhoneStep = () => (
    <form onSubmit={handleSendCode} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="e.g., +971 50 123 4567"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          autoComplete="tel"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Code
      </Button>
    </form>
  );

  const OtpStep = () => (
     <form onSubmit={handleVerifyCode} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          type="text"
          inputMode="numeric"
          placeholder="Enter the 6-digit code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
          autoComplete="one-time-code"
        />
      </div>
       {error && <p className="text-sm text-destructive">{error}</p>}
       <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify & Sign In
      </Button>
       <Button variant="link" size="sm" onClick={() => { setStep('phone'); setError(null); }}>
            Use a different phone number
       </Button>
    </form>
  );


  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-8rem)] lg:grid-cols-2 xl:min-h-[calc(100vh-9rem)]">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="grid gap-2 text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold">Secure Workspace Access</h1>
            <p className="text-balance text-muted-foreground">
              {step === 'phone' 
                ? "Enter your phone number to sign in or create an account."
                : `We've sent a verification code to ${phone}.`
              }
            </p>
          </div>
        
          {step === 'phone' ? <PhoneStep /> : <OtpStep />}
          
           <div className="relative">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                      Human Verified
                  </span>
              </div>
          </div>

          <div className="text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Passwordless, Emailless, Secure.</span>
          </div>

        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <img
          src="https://picsum.photos/seed/auth/1920/1080"
          alt="Image"
          className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
          data-ai-hint="abstract architecture"
        />
      </div>
    </div>
  )
}
