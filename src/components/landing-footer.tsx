
'use client';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Logo } from './logo';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-card text-card-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          
          <div className="col-span-2 lg:col-span-1 flex flex-col">
            <Logo />
            <div className="mt-4">
                <p className="text-sm text-foreground/70">
                The AI-Native Operating System for Real Estate.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                &copy; {currentYear} Entrestate — A Gemini Partnership.
                </p>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Platform</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/solutions" className="text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
            </nav>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link href="/academy" className="text-muted-foreground hover:text-primary transition-colors">Academy</Link>
              <Link href="/resources/flows" className="text-muted-foreground hover:text-primary transition-colors">Flow Library</Link>
              <Link href="/market" className="text-muted-foreground hover:text-primary transition-colors">Market Pulse</Link>
              <Link href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">System Status</Link>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link>
              <Link href="/technology" className="text-muted-foreground hover:text-primary transition-colors">Technology</Link>
              <Link href="/superfreetime" className="text-muted-foreground hover:text-primary transition-colors">SuperFreeTime</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Legal & Social</h4>
            <nav className="flex flex-col space-y-2 mb-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
