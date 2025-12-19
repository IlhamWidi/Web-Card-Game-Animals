'use client';

import Link from 'next/link';
import { levels } from '@/lib/levels';
import { Button } from '@/components/Button';
import { TropicalDecorations } from '@/components/TropicalDecorations';
import { getBestScoreForLevel } from '@/lib/localStorage';
import { formatTime } from '@/lib/gameUtils';
import { useEffect, useState } from 'react';

export default function LevelsPage() {
  const [bestScores, setBestScores] = useState<{ [key: number]: { time: number; moves: number } | null }>({});

  useEffect(() => {
    // Load best scores for each level
    const scores: { [key: number]: { time: number; moves: number } | null } = {};
    levels.forEach((level) => {
      const bestScore = getBestScoreForLevel(level.id);
      scores[level.id] = bestScore ? { time: bestScore.time, moves: bestScore.moves } : null;
    });
    setBestScores(scores);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Sangat Mudah':
        return 'from-green-400 to-green-600';
      case 'Mudah':
        return 'from-blue-400 to-blue-600';
      case 'Sedang':
        return 'from-yellow-400 to-yellow-600';
      case 'Sulit':
        return 'from-orange-400 to-orange-600';
      case 'Acak':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Sangat Mudah':
        return '😊';
      case 'Mudah':
        return '🙂';
      case 'Sedang':
        return '😐';
      case 'Sulit':
        return '😤';
      case 'Acak':
        return '🎲';
      default:
        return '🎮';
    }
  };

  return (
    <main className="min-h-screen relative z-10 py-12">
      <TropicalDecorations />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Pilih Level
          </h1>
          <p className="text-xl text-amber-100 drop-shadow-md">
            Pilih tingkat kesulitan yang sesuai untukmu!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {levels.map((level) => {
            const bestScore = bestScores[level.id];
            return (
              <div
                key={level.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-green-600 hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <div className={`bg-gradient-to-r ${getDifficultyColor(level.difficulty)} text-white rounded-xl p-4 mb-4 text-center`}>
                  <div className="text-4xl mb-2">{getDifficultyIcon(level.difficulty)}</div>
                  <h2 className="text-2xl font-bold">{level.name}</h2>
                  <p className="text-sm opacity-90">{level.difficulty}</p>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-green-800 font-semibold">Total Kartu:</span>
                    <span className="text-green-900 font-bold">{level.totalCards}</span>
                  </div>

                  <div className="flex justify-between items-center bg-amber-50 p-3 rounded-lg">
                    <span className="text-amber-800 font-semibold">Pasangan:</span>
                    <span className="text-amber-900 font-bold">{level.pairs}</span>
                  </div>

                  {level.isRandom && (
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <span className="text-purple-800 font-semibold text-sm">
                        🎲 Hewan Acak Setiap Permainan
                      </span>
                    </div>
                  )}

                  {bestScore && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-800 font-semibold text-sm mb-1">🏆 Rekor Terbaik:</p>
                      <div className="flex justify-between text-xs text-blue-700">
                        <span>Waktu: {formatTime(bestScore.time)}</span>
                        <span>Langkah: {bestScore.moves}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Link href={`/play/${level.id}`}>
                  <Button variant="primary" className="w-full">
                    🎮 Main Level {level.id}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="secondary">
              ← Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
