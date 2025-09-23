'use client';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <PageHeader 
            icon={<Shield className="h-8 w-8" />}
            title="Privacy Policy"
            description="Last updated: July 29, 2024. Your trust is our top priority."
        />
        <Card className="mt-8 bg-card/80 backdrop-blur-lg">
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome to Entrestate by mtc ("we," "us," or "our"). We are deeply committed to protecting your privacy and ensuring the security of your data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-native real estate ecosystem. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access or use the application.
              </p>

              <h2>Information We Collect</h2>
              <p>We collect information to provide and improve our services to you. This includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> Information that can be used to identify you, such as your name, email address, phone number, and billing information when you register for an account or subscribe to our services.</li>
                <li><strong>Usage Data:</strong> Information on how you access and use the Entrestate platform, including page views, features used, and interactions with our AI tools. This helps us optimize your experience.</li>
                <li><strong>Client Data &amp; Assets:</strong> Any proprietary documents (e.g., brochures, client lists) you upload to train your AI assistant are treated with the highest confidentiality. This data is firewalled and NEVER used to train external AI models or shared with third parties. It is exclusively used to enhance *your* private AI co-pilot.</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service, including the personalized AI insights.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                <li>To provide customer support.</li>
                <li>To monitor the usage of our Service and improve its functionality.</li>
                <li>To detect, prevent, and address technical issues.</li>
              </ul>

              <h2>Security of Data</h2>
              <p>
                The security of your data is paramount to us. We implement industry-standard security measures, including encryption, secure servers, and access controls, to protect your Personal Data and uploaded assets. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h2>Disclosure of Data</h2>
              <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
              <ul>
                <li>Comply with a legal obligation.</li>
                <li>Protect and defend the rights or property of Entrestate.</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
                <li>Protect the personal safety of users of the Service or the public.</li>
                <li>Protect against legal liability.</li>
              </ul>

              <h2>Your Data Protection Rights</h2>
              <p>You have certain data protection rights. These include:</p>
              <ul>
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right to rectify any inaccurate or incomplete information.</li>
                <li>The right to object to our processing of your Personal Data.</li>
                <li>The right to request that we restrict the processing of your Personal Data.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent.</li>
              </ul>

              <h2>Contact Us</h2>
              <p>If you have any questions or comments about this Privacy Policy, please contact us at:</p>
              <p>
                Entrestate by mtc<br />
                Dubai, UAE<br />
                <a href="mailto:hello@entrestate.com">hello@entrestate.com</a>
              </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
