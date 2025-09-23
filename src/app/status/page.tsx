'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Server, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const services = [
    { name: 'Platform & APIs', status: 'Operational' },
    { name: 'AI Generation (Gemini)', status: 'Operational' },
    { name: 'Database (Firestore)', status: 'Operational' },
    { name: 'Authentication Services', status: 'Operational' },
    { name: 'Data Ingestion', status: 'Operational' },
    { name: 'External Portal Sync (Meta, Bayut)', status: 'Monitoring' },
];

export default function StatusPage() {
  const allOperational = services.every(s => s.status === 'Operational');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PageHeader
          title="System Status"
          description="Real-time status of all Entrestate services and AI models."
          icon={<Server className="h-8 w-8" />}
        />
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <Card className="bg-card/80 backdrop-blur-lg mb-8">
                <CardHeader className="flex-row items-center gap-4">
                    {allOperational ? (
                        <CheckCircle className="h-10 w-10 text-green-500"/>
                    ) : (
                         <Clock className="h-10 w-10 text-amber-500"/>
                    )}
                    <div>
                        <CardTitle className="text-2xl">{allOperational ? 'All Systems Operational' : 'Minor Service Degradation'}</CardTitle>
                    </div>
                </CardHeader>
            </Card>

          <Card className="bg-card/80 backdrop-blur-lg">
              <CardHeader>
                  <CardTitle>Service Components</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                        <React.Fragment key={service.name}>
                            <div className="flex items-center justify-between">
                                <p className="font-medium">{service.name}</p>
                                <Badge variant={service.status === 'Operational' ? 'default' : 'secondary'} className={service.status === 'Operational' ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-amber-500/20 text-amber-700 border-amber-500/30'}>
                                    {service.status}
                                </Badge>
                            </div>
                            {index < services.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                  </div>
              </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
