import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PartyPopper } from "lucide-react";

type GameEndDialogProps = {
  isOpen: boolean;
  onRestart: () => void;
  scores: { player1: number; player2: number };
};

export default function GameEndDialog({ isOpen, onRestart, scores }: GameEndDialogProps) {
  let winnerMessage;
  if (scores.player1 > scores.player2) {
    winnerMessage = "Player 1 Wins!";
  } else if (scores.player2 > scores.player1) {
    winnerMessage = "Player 2 Wins!";
  } else {
    winnerMessage = "It's a Draw!";
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <PartyPopper className="text-primary" />
            Game Over!
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-center pt-4">
              <p className="text-lg font-bold mb-2">{winnerMessage}</p>
              <p>Final Score:</p>
              <p>Player 1: {scores.player1}</p>
              <p>Player 2: {scores.player2}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onRestart} className="w-full">
            Restart Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
