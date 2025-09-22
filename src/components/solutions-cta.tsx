
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';

export const SolutionsCta = () => {
    return (
        <section className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
                   Ready to Build Your AI-Powered Agency?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Whether you're a solo agent or a major developer, Entrestate provides the tools to unlock your full potential. Explore our solutions and start your free trial today.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/login">
                        <ShinyButton>
                            Start Free Trial
                            <ArrowRight />
                        </ShinyButton>
                    </Link>
                    <Link href="/solutions">
                        <Button variant="outline" size="lg">
                            Explore Solutions
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
