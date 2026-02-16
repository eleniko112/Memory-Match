"use client";

import { useState, useEffect, useCallback } from "react";
import type { Card as CardType } from "@/lib/game-utils";
import { initializeBoard } from "@/lib/game-utils";
import GameBoard from "./components/game/game-board";
import Scoreboard from "./components/game/scoreboard";
import GameEndDialog from "./components/game/game-end-dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const [board, setBoard] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<"player1" | "player2">(
    "player1"
  );
  const [isChecking, setIsChecking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [turnStatus, setTurnStatus] = useState("");

  const startNewGame = useCallback(() => {
    setBoard(initializeBoard());
    setFlippedCards([]);
    setScores({ player1: 0, player2: 0 });
    setCurrentPlayer("player1");
    setTurnStatus("Player 1's turn");
    setIsChecking(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  useEffect(() => {
    if (board.length > 0 && board.every((card) => card.isMatched)) {
      setGameOver(true);
      setTurnStatus("Good game!");
    }
  }, [board]);

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
        setScores((prevScores) => ({
          ...prevScores,
          [currentPlayer]: prevScores[currentPlayer] + 1,
        }));
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
          const nextPlayer =
            currentPlayer === "player1" ? "player2" : "player1";
          setCurrentPlayer(nextPlayer);
          setTurnStatus(
            nextPlayer === "player1" ? "Player 1's turn" : "Player 2's turn"
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, board, currentPlayer]);

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      board[index].isFlipped ||
      board[index].isMatched
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">MatchMasters</h1>
            <p className="text-muted-foreground mt-2">A local 2-player memory game.</p>
        </div>
        
        <Card className="w-full p-4 sm:p-6 shadow-lg">
          <Scoreboard scores={scores} currentPlayer={currentPlayer} />
        </Card>

        <div className="h-8 flex items-center justify-center" aria-live="polite">
          <p className="text-lg text-muted-foreground transition-opacity duration-300">
            {turnStatus}
          </p>
        </div>

        <GameBoard
          board={board}
          onCardClick={handleCardClick}
          disabled={isChecking || gameOver}
        />

        <Button onClick={startNewGame} variant="outline" className="mt-2">
          Restart Game
        </Button>
      </div>

      <GameEndDialog
        isOpen={gameOver}
        onRestart={startNewGame}
        scores={scores}
      />
    </main>
  );
}
