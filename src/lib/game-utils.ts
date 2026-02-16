export type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const ICONS = ["🍎", "🍌", "🍇", "⭐", "🔥", "🎮", "🎲", "🐱"];

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

export const initializeBoard = (): Card[] => {
  const cardValues = [...ICONS, ...ICONS];
  const shuffledValues = shuffleArray(cardValues);

  return shuffledValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};
