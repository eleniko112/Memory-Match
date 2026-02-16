import type { Card as CardType } from "@/lib/game-utils";
import Card from "./card";
import { cn } from "@/lib/utils";

type GameBoardProps = {
  board: CardType[];
  onCardClick: (index: number) => void;
  disabled: boolean;
  cardCount: number;
};

export default function GameBoard({ board, onCardClick, disabled, cardCount }: GameBoardProps) {
  const getGridClass = () => {
    switch (cardCount) {
      case 8:
        return "grid-cols-4 aspect-[2/1]";
      case 16:
        return "grid-cols-4 aspect-square";
      case 24:
        return "grid-cols-6 aspect-[3/2]";
      case 36:
        return "grid-cols-6 aspect-square";
      default:
        return "grid-cols-6 aspect-[3/2]";
    }
  }
  return (
    <div className={cn("grid gap-2 sm:gap-4 w-full max-w-2xl", getGridClass())}>
      {board.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
