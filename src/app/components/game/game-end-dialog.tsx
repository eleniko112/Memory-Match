import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Trophy, Clock } from "lucide-react";

type GameEndDialogProps = {
  isOpen: boolean;
  onRestart: () => void;
  onMenu: () => void;
  scores: number[];
  mode?: string;
  timeUp?: boolean;
};

export default function GameEndDialog({ isOpen, onRestart, onMenu, scores, mode = 'multi', timeUp = false }: GameEndDialogProps) {
  
  let title = "Game Over!";
  let icon = <PartyPopper className="text-primary" />;
  let description;

  if (mode === 'single') {
    if (timeUp) {
      title = "Time's Up!";
      icon = <Clock className="text-destructive" />;
      description = (
        <div className="text-center pt-4">
          <p className="text-lg font-bold mb-2">You matched {scores[0] || 0} pairs.</p>
          <p>Better luck next time!</p>
        </div>
      );
    } else {
      title = "You Win!";
      icon = <Trophy className="text-chart-4" />;
      description = (
         <div className="text-center pt-4">
          <p className="text-lg font-bold mb-2">Congratulations!</p>
          <p>You matched all the pairs.</p>
        </div>
      );
    }

  } else { // Multiplayer
    const maxScore = Math.max(...scores);
    const allTied = scores.every(score => score === scores[0]);
    const winners = scores.reduce((acc: number[], score, index) => {
        if (score === maxScore) {
            acc.push(index + 1);
        }
        return acc;
    }, []);

    let winnerMessage;
    if (allTied) {
        winnerMessage = "It's a Draw!";
    } else if (winners.length > 1) {
        winnerMessage = `Players ${winners.join(' & ')} tie for the win!`;
    } else {
        winnerMessage = `Player ${winners[0]} Wins!`;
    }

    description = (
      <div className="text-center pt-4">
        <p className="text-lg font-bold mb-2">{winnerMessage}</p>
        <p>Final Scores:</p>
        {scores.map((score, index) => (
            <p key={index}>Player {index + 1}: {score}</p>
        ))}
      </div>
    );
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center gap-2 text-2xl">
            {icon}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onMenu} variant="outline">
              Main Menu
          </Button>
          <AlertDialogAction onClick={onRestart}>
              Play Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
