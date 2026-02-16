import type { Card as CardType } from "@/lib/game-utils";
import Card from "./card";

type GameBoardProps = {
  board: CardType[];
  onCardClick: (index: number) => void;
  disabled: boolean;
};

export default function GameBoard({ board, onCardClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-lg aspect-square">
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
