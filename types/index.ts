// Types for the Animal Memory Match game

export interface Animal {
  id: string;
  name: string;
  image: string;
}

export interface Card {
  id: string;
  animalId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Level {
  id: number;
  name: string;
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Sulit' | 'Acak';
  totalCards: number;
  pairs: number;
  animalsCount: number;
  isRandom?: boolean;
}

export interface GameState {
  cards: Card[];
  selectedCards: string[];
  matchedPairs: number;
  attempts: number;
  timer: number;
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

export interface ScoreEntry {
  level: number;
  time: number;
  moves: number;
  date: string;
}
