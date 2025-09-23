
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { AlertTriangle, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <PageHeader
        icon={<AlertTriangle className="h-10 w-10 text-destructive" />}
        title="404 - Page Not Found"
        description="Sorry, the page you are looking for does not exist, has been moved, or is temporarily unavailable."
      >
        <div className="flex gap-4 justify-center mt-6">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
          <Link href="/me">
            <Button>
              Go to Dashboard
              <LayoutDashboard className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </PageHeader>
    </main>
  );
}
