
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-2xl font-medium tracking-tight text-foreground/80">
        Oops! Page Not Found.
      </p>
      <p className="mt-2 text-lg text-muted-foreground">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <Button>Return to Homepage</Button>
      </Link>
    </main>
  );
}
