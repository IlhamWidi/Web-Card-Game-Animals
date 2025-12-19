import { ScoreEntry } from '@/types';

const LOCAL_STORAGE_KEY = 'animal-memory-scores';

// Get all scores from localStorage
export const getScores = (): ScoreEntry[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading scores:', error);
    return [];
  }
};

// Save a new score
export const saveScore = (score: ScoreEntry): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const scores = getScores();
    scores.push(score);
    
    // Sort by level, then by time (ascending - faster is better)
    scores.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.time - b.time;
    });
    
    // Keep only top 10 scores per level
    const filteredScores: ScoreEntry[] = [];
    const levelCounts: { [key: number]: number } = {};
    
    scores.forEach((s) => {
      if (!levelCounts[s.level]) levelCounts[s.level] = 0;
      if (levelCounts[s.level] < 10) {
        filteredScores.push(s);
        levelCounts[s.level]++;
      }
    });
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredScores));
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

// Get best score for a level
export const getBestScoreForLevel = (level: number): ScoreEntry | null => {
  const scores = getScores();
  const levelScores = scores.filter((s) => s.level === level);
  return levelScores.length > 0 ? levelScores[0] : null;
};

// Clear all scores
export const clearScores = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
