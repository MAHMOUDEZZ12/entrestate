
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Key, Bomb, X, Search, Lightbulb, Briefcase, UserPlus, Clock, Copy, User, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Confetti } from '@/components/confetti';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';

const gamePairs = [
    { term: 'Developer', definition: 'Emaar' },
    { term: 'Area', definition: 'Dubai Marina' },
    { term: 'Status', definition: 'Off-Plan' },
    { term: 'ROI', definition: '7.5%' },
    { term: 'Handover', definition: 'Q4 2025' },
    { term: 'Type', definition: 'Villa' },
    { term: 'Developer', definition: 'Damac' },
    { term: 'Area', definition: 'Downtown' },
];

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const generateGridState = () => {
    const cards = gamePairs.flatMap((pair, i) => [
        { id: i * 2, pairId: i, type: 'term', content: pair.term, isFlipped: false, isMatched: false },
        { id: i * 2 + 1, pairId: i, type: 'definition', content: pair.definition, isFlipped: false, isMatched: false }
    ]);
    return shuffleArray(cards);
}

export default function MarketMemoryPage() {
    const { toast } = useToast();
    const [cards, setCards] = useState(generateGridState());
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setIsChecking(true);
            const [firstIndex, secondIndex] = flippedIndices;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.pairId === secondCard.pairId) {
                // Match
                setTimeout(() => {
                    setCards(prev => prev.map(card => 
                        card.pairId === firstCard.pairId ? { ...card, isMatched: true } : card
                    ));
                    setFlippedIndices([]);
                    setIsChecking(false);
                }, 500);
            } else {
                // No match, flip back after a delay
                setTimeout(() => {
                    setCards(prev => prev.map((card, index) => 
                        (index === firstIndex || index === secondIndex) ? { ...card, isFlipped: false } : card
                    ));
                    setFlippedIndices([]);
                    setIsChecking(false);
                }, 1500); // User sees the mismatch for 1.5s
            }
            setMoves(prev => prev + 1);
        }
    }, [flippedIndices, cards]);
    
    useEffect(() => {
        const allMatched = cards.every(card => card.isMatched);
        if (allMatched && cards.length > 0) {
            setGameOver(true);
        }
    }, [cards]);

    const handleCardClick = (index: number) => {
        if (isChecking || cards[index].isFlipped || flippedIndices.length >= 2) {
            return;
        }

        setFlippedIndices(prev => [...prev, index]);
        setCards(prev => prev.map((card, i) => 
            i === index ? { ...card, isFlipped: true } : card
        ));
    };
    
    const getWinningFact = () => {
        const randomPair = gamePairs[Math.floor(Math.random() * gamePairs.length)];
        return `Did you know? In areas like ${randomPair.definition}, properties from developer ${randomPair.term} often see a strong market performance.`;
    }

    const resetGame = () => {
        setCards(generateGridState());
        setFlippedIndices([]);
        setIsChecking(false);
        setMoves(0);
        setGameOver(false);
    };
    
    const handleShareFact = () => {
        toast({
            title: "Fact Shared!",
            description: "Your market insight has been posted to the community board."
        });
        resetGame();
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            {gameOver && <Confetti />}
            <PageHeader 
                icon={<Brain className="h-8 w-8" />}
                title="Market Memory"
                description={`Match the pairs to test your market knowledge. Total Moves: ${moves}`}
            />

            <div className="flex justify-center">
                <Card className="bg-card/50 backdrop-blur-lg w-full max-w-xl">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-4 gap-4">
                            {cards.map((card, index) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(index)}
                                    disabled={isChecking || card.isFlipped}
                                    className={cn(
                                        "flex items-center justify-center rounded-lg border aspect-square transition-all duration-300 transform-style-3d",
                                        "bg-muted/50 hover:bg-muted hover:border-primary/50",
                                        card.isFlipped && "rotate-y-180",
                                        card.isMatched && "border-green-500 bg-green-500/10 opacity-70"
                                    )}
                                >
                                    <div className={cn("absolute backface-hidden flex items-center justify-center w-full h-full", !card.isFlipped && "hidden")}>
                                       <p className="text-center text-xs sm:text-sm font-semibold p-1">{card.content}</p>
                                    </div>
                                    <div className={cn("absolute backface-hidden", card.isFlipped && "hidden")}>
                                       <Star className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={gameOver} onOpenChange={(open) => { if(!open) resetGame(); }}>
                <DialogContent>
                    <DialogHeader className="text-center items-center">
                        <DialogTitle className="text-3xl font-bold text-primary">Excellent Memory!</DialogTitle>
                        <DialogDescription>
                            You've matched all the pairs in {moves} moves. Here's a market fact for you:
                        </DialogDescription>
                        <div className="my-4 p-4 bg-muted rounded-lg border border-dashed w-full text-center">
                           <p className="font-semibold text-foreground">{getWinningFact()}</p>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="justify-center sm:justify-center gap-2">
                        <Button onClick={resetGame} size="lg" variant="outline">Play Again</Button>
                        <Button size="lg" onClick={handleShareFact}>Share Fact to Community</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </main>
    );
}

// Minimal CSS for 3D flip effect
const style = document.createElement('style');
style.innerHTML = `
  .transform-style-3d { transform-style: preserve-3d; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
`;
document.head.appendChild(style);

