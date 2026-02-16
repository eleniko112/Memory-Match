import { cn } from "@/lib/utils";

type ScoreboardProps = {
  scores: { player1: number; player2: number };
  currentPlayer: "player1" | "player2";
};

export default function Scoreboard({ scores, currentPlayer }: ScoreboardProps) {
  return (
    <div className="flex justify-around items-center w-full text-center">
      <div
        className={cn(
          "p-4 rounded-lg transition-all duration-300 w-40",
          currentPlayer === "player1"
            ? "bg-primary/20 scale-105 border-2 border-primary"
            : "opacity-70"
        )}
      >
        <p className="text-lg font-bold text-primary">Player 1</p>
        <p className="text-4xl font-black text-foreground">{scores.player1}</p>
      </div>
      <div className="text-2xl font-bold text-muted-foreground">- VS -</div>
      <div
        className={cn(
          "p-4 rounded-lg transition-all duration-300 w-40",
          currentPlayer === "player2"
            ? "bg-accent/20 scale-105 border-2 border-accent"
            : "opacity-70"
        )}
      >
        <p className="text-lg font-bold text-accent">Player 2</p>
        <p className="text-4xl font-black text-foreground">{scores.player2}</p>
      </div>
    </div>
  );
}
