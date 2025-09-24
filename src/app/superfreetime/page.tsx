
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
import { secretCodes } from '@/lib/codes';
import { PageHeader } from '@/components/ui/page-header';


const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const MAX_ATTEMPTS = 3;
const TIME_LIMIT_SECONDS = 180; // 3 minutes

const generateGridState = () => {
    const keyPosition = Math.floor(Math.random() * TOTAL_CELLS);
    const grid = Array(TOTAL_CELLS).fill(null).map((_, index) => ({
        id: index,
        hasKey: index === keyPosition,
        isClicked: false,
        icon: 'initial' as 'initial' | 'key' | 'bomb'
    }));

    let hint = '';
    const hintType = Math.floor(Math.random() * 4);
    if (hintType === 0) {
        hint = `You're on the right street. It's in one of the first three buildings on the left.`;
    } else if (hintType === 1) {
        hint = `You passed it. Turn back and check the houses on the odd-numbered side of the road.`;
    } else if (hintType === 2) {
        hint = `You are facing the office. Don't park. Next left after the 3rd board.`;
    } else {
        hint = `It's not in the main square. Check the alleyways on the south side.`;
    }
    
    const secretCode = secretCodes[Math.floor(Math.random() * secretCodes.length)].code;

    return { grid, hint, secretCode };
}

export default function SuperFreeTimePage() {
    const { toast } = useToast();
    const [gameState, setGameState] = useState<{grid: any[], hint: string, secretCode: string} | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [foundKey, setFoundKey] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
    const [showReward, setShowReward] = useState(false);

    useEffect(() => {
        // Generate the game state on the client side to avoid hydration errors
        setGameState(generateGridState());
    }, []);

    useEffect(() => {
        if (gameOver || timeLeft <= 0) {
            if (timeLeft <= 0 && !gameOver) {
                setGameOver(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameOver, timeLeft]);

    const handleCellClick = (id: number) => {
        if (gameOver || !gameState) return;

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        const newGrid = [...gameState.grid];
        const cell = newGrid[id];
        cell.isClicked = true;

        if (cell.hasKey) {
            cell.icon = 'key';
            setFoundKey(true);
            setGameOver(true);
        } else {
            cell.icon = 'bomb';
            if (newAttempts >= MAX_ATTEMPTS) {
                setGameOver(true);
            }
        }
        
        setGameState(prev => prev ? ({ ...prev, grid: newGrid }) : null);
    };

    const resetGame = () => {
        setGameState(generateGridState());
        setGameOver(false);
        setFoundKey(false);
        setAttempts(0);
        setTimeLeft(TIME_LIMIT_SECONDS);
        setShowReward(false);
    };

    const copyCode = () => {
        if (!gameState) return;
        navigator.clipboard.writeText(gameState.secretCode);
        toast({
            title: "Code Copied!",
            description: "Your secret code has been copied to the clipboard.",
        });
    }

    const attemptsLeft = MAX_ATTEMPTS - attempts;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if (!gameState) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading Game...</p>
            </div>
        );
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            {foundKey && <Confetti />}
            <PageHeader 
                icon={<Key className="h-8 w-8" />}
                title="Find The Key"
                description={`You have ${MAX_ATTEMPTS} chances to find the key using the hint below. Good luck!`}
            />

            <div className="flex justify-center">
                <Card className="bg-card/50 backdrop-blur-lg w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="mb-4 text-center p-3 bg-muted/50 rounded-lg border flex items-center justify-center gap-3">
                           <Lightbulb className="h-5 w-5 text-primary" />
                           <p className="font-semibold text-foreground/80">{gameState.hint}</p>
                        </div>
                        <div className="grid grid-cols-5 gap-3 aspect-square">
                            {gameState.grid.map(cell => (
                                <button
                                    key={cell.id}
                                    onClick={() => handleCellClick(cell.id)}
                                    disabled={cell.isClicked || gameOver}
                                    className={cn(
                                        "flex items-center justify-center rounded-lg border transition-all duration-300 aspect-square",
                                        "bg-muted/50 hover:bg-muted hover:border-primary/50",
                                        cell.isClicked && cell.hasKey && "bg-green-500/20 border-green-500",
                                        cell.isClicked && !cell.hasKey && "bg-destructive/20 border-destructive",
                                        gameOver && !cell.isClicked && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {cell.isClicked ? (
                                        cell.hasKey ? (
                                            <Key className="h-8 w-8 text-green-400 animate-in zoom-in" />
                                        ) : (
                                            <Bomb className="h-8 w-8 text-destructive animate-in zoom-in" />
                                        )
                                    ) : (
                                       <Search className="h-6 w-6 text-muted-foreground" />
                                    )}
                                </button>
                            ))}
                        </div>
                         <div className="mt-4 text-center flex justify-around text-sm text-muted-foreground">
                            <p>Attempts left: {attemptsLeft > 0 ? attemptsLeft : 0}</p>
                            <p className='flex items-center gap-1'><Clock className="h-4 w-4" /> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <Dialog open={gameOver} onOpenChange={(open) => { if(!open) resetGame(); }}>
                <DialogContent>
                    <DialogHeader className="text-center items-center">
                            {foundKey ? (
                            showReward ? (
                                <>
                                    <DialogTitle className="text-3xl font-bold text-primary">Your Secret Code!</DialogTitle>
                                    <DialogDescription>
                                        Login or register, then hand this code to your AI Assistant to unlock your secret reward. Good luck!
                                    </DialogDescription>
                                        <div className="my-4 p-4 bg-muted rounded-lg border border-dashed w-full flex items-center justify-between">
                                        <span className="font-mono text-lg text-primary">{gameState.secretCode}</span>
                                        <Button variant="ghost" size="icon" onClick={copyCode}><Copy className="h-4 w-4" /></Button>
                                        </div>
                                </>
                            ) : (
                                <>
                                    <DialogTitle className="text-3xl font-bold text-green-400">You found it!</DialogTitle>
                                    <DialogDescription>
                                        You found the key in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}.
                                    </DialogDescription>
                                </>
                            )
                            ) : (
                            <DialogTitle className="text-3xl font-bold text-destructive">{timeLeft <= 0 ? "Time's up!" : "Game Over"}</DialogTitle>
                            )}
                        {!foundKey && (
                            <DialogDescription>That was fun, let's get back to business.</DialogDescription>
                        )}
                    </DialogHeader>
                    <DialogFooter className="justify-center sm:justify-center gap-2">
                        {showReward ? (
                            <Link href="/me/assistant">
                            <Button size="lg">Go to Assistant</Button>
                            </Link>
                        ) : (
                        <>
                            <Button onClick={resetGame} size="lg" variant="outline">One More Game</Button>
                            {foundKey ? (
                                <Button size="lg" onClick={() => setShowReward(true)}>Claim Your Prize</Button>
                            ) : (
                                <Link href="/me">
                                    <Button size="lg"><Briefcase className="mr-2 h-4 w-4"/> Let's Get To Business</Button>
                                </Link>
                            )}
                        </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </main>
    );
}
