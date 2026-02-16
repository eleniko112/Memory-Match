import type { Card as CardType } from "@/lib/game-utils";
import { cn } from "@/lib/utils";

type CardProps = {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
};

export default function Card({ card, onClick, disabled }: CardProps) {
  const isInteractable = !card.isFlipped && !card.isMatched && !disabled;

  return (
    <button
      type="button"
      className={cn(
        "card-container rounded-lg select-none p-0 border-none bg-transparent w-full h-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
      )}
      data-flipped={card.isFlipped || card.isMatched}
      onClick={onClick}
      disabled={!isInteractable}
      aria-hidden={card.isMatched}
      aria-label={card.isFlipped || card.isMatched ? `Card: ${card.value}` : 'Facedown card'}
    >
      <div className="card-inner">
        <div className="card-back bg-secondary hover:bg-primary/20 transition-colors shadow-md"></div>
        <div
          className={cn(
            "card-front bg-card border-2 shadow-inner",
            card.isMatched ? "border-success/50" : "border-primary/50"
          )}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl" aria-hidden="true">{card.value}</span>
        </div>
      </div>
    </button>
  );
}
