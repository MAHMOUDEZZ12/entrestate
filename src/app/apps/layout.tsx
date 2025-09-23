
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrestate Marketplace",
  description: "Explore our ecosystem of Suites and Solutions.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
