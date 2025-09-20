
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'given') {
        setShowConsent(true);
      }
    } catch (error) {
      // localStorage is not available on the server, so we default to showing consent on the client
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'given');
    } catch (error) {
       // localStorage is not available
    }
    setShowConsent(false);
  };
  
  const handleDecline = () => {
     try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch (error) {
       // localStorage is not available
    }
    setShowConsent(false);
  }

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="max-w-3xl mx-auto p-6 bg-background/80 backdrop-blur-lg border-border/40 shadow-2xl">
         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Cookie Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                     <Link href="/cookies" className="underline ml-1">Learn more</Link>.
                  </p>
                </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" onClick={handleDecline}>Decline</Button>
              <Button onClick={handleAccept}>Accept</Button>
            </div>
         </div>
      </Card>
    </div>
  );
}
