
'use client';
import Link from 'next/link';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card text-card-foreground py-4 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {currentYear} Entrestate. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/status" className="hover:text-primary transition-colors">System Status</Link>
        </nav>
      </div>
    </footer>
  );
}
