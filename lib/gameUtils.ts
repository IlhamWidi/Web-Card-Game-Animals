import { Card, Animal } from '@/types';
import { animals } from './animals';

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a deck of cards for a level
export const generateDeck = (
  animalsCount: number,
  isRandom: boolean = false
): Card[] => {
  // Select animals for this level
  let selectedAnimals: Animal[];
  
  if (isRandom) {
    selectedAnimals = shuffleArray(animals).slice(0, animalsCount);
  } else {
    selectedAnimals = animals.slice(0, animalsCount);
  }

  // Create pairs of cards
  const cards: Card[] = [];
  selectedAnimals.forEach((animal, index) => {
    // Add two cards for each animal (a pair)
    cards.push({
      id: `${animal.id}-1`,
      animalId: animal.id,
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: `${animal.id}-2`,
      animalId: animal.id,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Shuffle the deck
  return shuffleArray(cards);
};

// Format time in MM:SS format
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
