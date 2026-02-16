'use client';

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import type { Card as CardType } from "@/lib/game-utils";
import { initializeBoard } from "@/lib/game-utils";
import GameBoard from "@/app/components/game/game-board";
import Scoreboard from "@/app/components/game/scoreboard";
import GameEndDialog from "@/app/components/game/game-end-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

function Game() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Game Settings
  const mode = searchParams.get('mode') || 'single';
  const cardCount = parseInt(searchParams.get('cards') || '16', 10);
  const timeLimit = parseInt(searchParams.get('time') || '0', 10);
  const playerCount = parseInt(searchParams.get('players') || '1', 10);
  
  // Game State
  const [board, setBoard] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [turnStatus, setTurnStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timeUp, setTimeUp] = useState(false);

  const startNewGame = useCallback(() => {
    // Validate params
    if (isNaN(cardCount) || cardCount <= 0) {
      router.push('/'); // redirect to home if params are bad
      return;
    }
    setBoard(initializeBoard(cardCount));
    setFlippedCards([]);
    setScores(new Array(playerCount).fill(0));
    setCurrentPlayer(0);
    setTurnStatus(`Player 1's turn`);
    setIsChecking(false);
    setGameOver(false);
    setTimeLeft(timeLimit);
    setTimeUp(false);
  }, [cardCount, playerCount, timeLimit, router]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Timer effect for single player
  useEffect(() => {
    if (mode !== 'single' || timeLimit === 0 || gameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && mode === 'single' && timeLimit > 0) {
        setGameOver(true);
        setTimeUp(true);
        setTurnStatus("Time's Up!");
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, timeLimit, gameOver, timeLeft]);
  

  // Check for game over (all cards matched)
  useEffect(() => {
    if (board.length > 0 && board.every((card) => card.isMatched)) {
      if (!gameOver) { // prevent setting game over twice on time up
        setGameOver(true);
        setTurnStatus("Good game!");
      }
    }
  }, [board, gameOver]);

  // Card matching logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const firstCard = board[firstCardIndex];
      const secondCard = board[secondCardIndex];

      if (firstCard.value === secondCard.value) {
        // Match
        setBoard((prevBoard) =>
          prevBoard.map((card, index) =>
            index === firstCardIndex || index === secondCardIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setScores((prevScores) => {
            const newScores = [...prevScores];
            newScores[currentPlayer] += 1;
            return newScores;
        });
        setTurnStatus("It's a match! Go again.");
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        // No match
        setTurnStatus("Not a match!");
        setTimeout(() => {
          setBoard((prevBoard) =>
            prevBoard.map((card, index) =>
              index === firstCardIndex || index === secondCardIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          const nextPlayer = (currentPlayer + 1) % playerCount;
          setCurrentPlayer(nextPlayer);
          setTurnStatus(`Player ${nextPlayer + 1}'s turn`);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, board, currentPlayer, playerCount]);

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      board[index].isFlipped ||
      board[index].isMatched ||
      gameOver
    ) {
      return;
    }

    setBoard((prevBoard) =>
      prevBoard.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
  };

  const navigateHome = () => {
    router.push('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">Memory Match</h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'single' ? 'Single Player' : `${playerCount}-Player Game`}
            </p>
        </div>
        
        {mode === 'single' && timeLimit > 0 && (
          <Card className="p-2 px-4 shadow-lg">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Timer className="text-primary" />
              Time Left: {timeLeft}s
            </div>
          </Card>
        )}

        {playerCount > 1 && (
            <Card className="w-full p-4 sm:p-6 shadow-lg">
                <Scoreboard scores={scores} currentPlayer={currentPlayer} />
            </Card>
        )}

        <div className="h-8 flex items-center justify-center" aria-live="polite">
          <p className="text-lg text-muted-foreground transition-opacity duration-300">
            {turnStatus}
          </p>
        </div>

        <GameBoard
          board={board}
          onCardClick={handleCardClick}
          disabled={isChecking || gameOver}
          cardCount={cardCount}
        />

        <div className="flex gap-4 mt-2">
          <Button onClick={startNewGame} variant="outline">
            Restart Game
          </Button>
          <Button onClick={navigateHome} variant="secondary">
            Main Menu
          </Button>
        </div>
      </div>

      <GameEndDialog
        isOpen={gameOver}
        onRestart={startNewGame}
        onMenu={navigateHome}
        scores={scores}
        mode={mode}
        timeUp={timeUp}
      />
    </main>
  );
}

export default function GamePage() {
    return (
        <Suspense fallback={<div>Loading Game...</div>}>
            <Game />
        </Suspense>
    )
}
