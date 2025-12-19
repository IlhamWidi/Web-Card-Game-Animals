import { Level } from '@/types';

// Game levels configuration
export const levels: Level[] = [
  {
    id: 1,
    name: 'Level 1',
    difficulty: 'Sangat Mudah',
    totalCards: 4,
    pairs: 2,
    animalsCount: 2,
  },
  {
    id: 2,
    name: 'Level 2',
    difficulty: 'Mudah',
    totalCards: 8,
    pairs: 4,
    animalsCount: 4,
  },
  {
    id: 3,
    name: 'Level 3',
    difficulty: 'Sedang',
    totalCards: 12,
    pairs: 6,
    animalsCount: 6,
  },
  {
    id: 4,
    name: 'Level 4',
    difficulty: 'Sulit',
    totalCards: 16,
    pairs: 8,
    animalsCount: 8,
  },
  {
    id: 5,
    name: 'Level 5',
    difficulty: 'Acak',
    totalCards: 16,
    pairs: 8,
    animalsCount: 8,
    isRandom: true,
  },
];

// Get level by ID
export const getLevelById = (id: number): Level | undefined => {
  return levels.find((level) => level.id === id);
};
