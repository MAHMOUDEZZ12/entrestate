import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';

const AIXA_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/Aixa-logo.png?alt=media&token=16231f13-d6e3-489d-be1a-e1ecc38c2df6';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-card text-card-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src={AIXA_LOGO_URL} alt="WhatsMAP Logo" width={32} height={32} />
              <span className="text-2xl font-bold font-heading text-primary">WhatsMAP</span>
            </Link>
            <p className="mt-4 text-sm text-foreground/70">
              The AI-Native Operating System for Real Estate.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {currentYear} WhatsMAP. All rights reserved.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Solutions</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/solutions/agents" className="text-muted-foreground hover:text-primary transition-colors">For Agents</Link>
              <Link href="/solutions/developers" className="text-muted-foreground hover:text-primary transition-colors">For Developers</Link>
              <Link href="/solutions/investors" className="text-muted-foreground hover:text-primary transition-colors">For Investors</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Platform</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link href="/dashboard/marketing" className="text-muted-foreground hover:text-primary transition-colors">All Tools</Link>
              <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">Discovery Engine</Link>
            </nav>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link>
              <Link href="/status" className="text-muted-foreground hover:text-primary transition-colors">Status</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold font-heading mb-4">Legal & Social</h4>
            <nav className="flex flex-col space-y-2 mb-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
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
