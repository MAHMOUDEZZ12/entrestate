
import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { tools } from '@/lib/tools-data';
import { Logo } from './logo';

const ENTRESTATE_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/entrestate.com%20logo%20agaist-10%20(4).png?alt=media&token=92958e4e-b603-4f3d-bf12-780e72362652';

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
                &copy; {currentYear} Entrestate by mtc. All rights reserved.
                </p>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Platform</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/apps" className="text-muted-foreground hover:text-primary transition-colors">Apps</Link>
              <Link href="/solutions" className="text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/discover" className="text-muted-foreground hover:text-primary transition-colors">Discovery Engine</Link>
            </nav>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link href="/market" className="text-muted-foreground hover:text-primary transition-colors">Market Pulse</Link>
              <Link href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link>
              <Link href="/sx3-mindmap" className="text-muted-foreground hover:text-primary transition-colors">Mindmap</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link>
              <Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">System Status</Link>
              <Link href="/technology" className="text-muted-foreground hover:text-primary transition-colors">Technology</Link>
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
