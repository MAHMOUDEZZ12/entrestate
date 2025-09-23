
import { redirect } from 'next/navigation';

export default function MarketingPage() {
  // This page is deprecated and now permanently redirects to the new App Store.
  redirect('/apps');
}
