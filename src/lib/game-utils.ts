export type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const ICONS = ["🍎", "🍌", "🍇", "⭐", "🔥", "🎮", "🎲", "🐱", "🐶", "🤖", "🦄", "🍕", "⚽️", "🏀", "🏈", "🎱", "🎳", "🎯"];

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

export const initializeBoard = (cardCount: number): Card[] => {
  if ((cardCount % 2) !== 0) {
    throw new Error("Card count must be an even number.");
  }
  const pairCount = cardCount / 2;
  const iconsForGame = ICONS.slice(0, pairCount);
  const cardValues = [...iconsForGame, ...iconsForGame];
  const shuffledValues = shuffleArray(cardValues);

  return shuffledValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};
