
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CookieConsent } from '@/components/cookie-consent';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/components/theme-switcher';
import { TabProvider } from '@/context/TabManagerContext';
import { CanvasProvider } from '@/context/CanvasContext';
import { CreativeCanvas } from '@/components/creative-canvas';
import { SensitiveAreaProvider } from '@/context/SensitiveAreaContext';
import { SpotlightProvider } from '@/context/SpotlightContext';
import { AppLayout } from '@/components/AppLayout';

const fontSans = PT_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});
const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.entrestate.com'),
  title: 'Entrestate — AI-Native Real Estate Ecosystem',
  description: 'An AI-native ecosystem for real estate professionals, featuring intelligent search and a suite of powerful B2B tools.',
  openGraph: {
    title: 'Entrestate — AI-Native Real Estate Ecosystem',
    description: 'The future of real estate is here. Intelligent, persona-driven search and a complete suite of professional AI tools.',
    images: ['https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/og-image.png?alt=media&token=c27f8045-8c67-48f8-81e0-35a39985b546'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen flex flex-col bg-background font-sans antialiased",
        fontSans.variable,
        fontHeading.variable
      )}>
        <AuthProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              <SensitiveAreaProvider>
                <SpotlightProvider>
                  <TabProvider>
                      <CanvasProvider>
                          <AppLayout>
                            {children}
                          </AppLayout>
                           <Toaster />
                           <CookieConsent />
                           <CreativeCanvas />
                      </CanvasProvider>
                  </TabProvider>
                </SpotlightProvider>
              </SensitiveAreaProvider>
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
