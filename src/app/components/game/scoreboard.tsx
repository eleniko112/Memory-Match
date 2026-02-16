import { cn } from "@/lib/utils";

type ScoreboardProps = {
  scores: number[];
  currentPlayer: number;
};

const playerColors = [
    "text-primary", "text-accent", "text-chart-2", "text-chart-4"
];

const playerBg = [
    "bg-primary/20 border-primary",
    "bg-accent/20 border-accent",
    "bg-chart-2/20 border-chart-2",
    "bg-chart-4/20 border-chart-4",
]

export default function Scoreboard({ scores, currentPlayer }: ScoreboardProps) {
  return (
    <div className="flex justify-around items-center w-full text-center gap-2 flex-wrap">
      {scores.map((score, index) => (
         <div key={index} className="flex items-center">
            <div
                className={cn(
                "p-4 rounded-lg transition-all duration-300 w-32",
                currentPlayer === index
                    ? `${playerBg[index % playerBg.length]} scale-105 border-2`
                    : "opacity-70"
                )}
            >
                <p className={cn("text-lg font-bold", playerColors[index % playerColors.length])}>Player {index + 1}</p>
                <p className="text-4xl font-black text-foreground">{score}</p>
            </div>
            {index < scores.length - 1 && (
                 <div className="text-2xl font-bold text-muted-foreground mx-2 hidden sm:block">VS</div>
            )}
         </div>
      ))}
    </div>
  );
}
