'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TropicalDecorations } from '@/components/TropicalDecorations';
import { getLevelById } from '@/lib/levels';
import { generateDeck, formatTime } from '@/lib/gameUtils';
import { saveScore } from '@/lib/localStorage';
import { soundManager } from '@/lib/soundManager';
import { animals } from '@/lib/animals';
import { Card } from '@/types';
import Link from 'next/link';

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.levelId as string);
  const level = getLevelById(levelId);

  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shakingCards, setShakingCards] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize sound manager
  useEffect(() => {
    soundManager.init();
    setIsMuted(soundManager.getMuteState());
  }, []);

  // Initialize game
  useEffect(() => {
    if (level) {
      const deck = generateDeck(level.animalsCount, level.isRandom);
      setCards(deck);
      setIsPlaying(true);
    } else {
      router.push('/levels');
    }
  }, [level, router]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isPaused && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, isCompleted]);

  // Check if game is completed
  useEffect(() => {
    if (level && matchedPairs === level.pairs && matchedPairs > 0) {
      setIsCompleted(true);
      setIsPlaying(false);
      soundManager.play('victory');

      // Save score
      saveScore({
        level: level.id,
        time: timer,
        moves: attempts,
        date: new Date().toISOString(),
      });
    }
  }, [matchedPairs, level, timer, attempts]);

  // Handle card click
  const handleCardClick = useCallback(
    (cardId: string) => {
      // Prevent clicking if already processing or card is already selected
      if (selectedCards.length >= 2 || selectedCards.includes(cardId)) {
        return;
      }

      soundManager.play('flip');

      // Flip the card
      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, isFlipped: true } : card
        )
      );

      const newSelected = [...selectedCards, cardId];
      setSelectedCards(newSelected);

      // Check for match when 2 cards are selected
      if (newSelected.length === 2) {
        setAttempts((prev) => prev + 1);

        const [firstId, secondId] = newSelected;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.animalId === secondCard.animalId) {
          // Match found - play sound and wait before marking as matched
          setTimeout(() => {
            soundManager.play('correct');
          }, 300);
          
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: true, isMatched: true }
                  : card
              )
            );
            setMatchedPairs((prev) => prev + 1);
            setSelectedCards([]);
          }, 800);
        } else {
          // No match - wait longer before flipping back so user can see the cards
          setTimeout(() => {
            soundManager.play('wrong');
            setShakingCards([firstId, secondId]);
          }, 600);

          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setSelectedCards([]);
            setShakingCards([]);
          }, 1800);
        }
      }
    },
    [selectedCards, cards]
  );

  // Toggle pause
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Toggle mute
  const toggleMute = () => {
    const newMuteState = soundManager.toggleMute();
    setIsMuted(newMuteState);
  };

  // Restart game
  const restartGame = () => {
    if (level) {
      const deck = generateDeck(level.animalsCount, level.isRandom);
      setCards(deck);
      setSelectedCards([]);
      setMatchedPairs(0);
      setAttempts(0);
      setTimer(0);
      setIsPlaying(true);
      setIsPaused(false);
      setIsCompleted(false);
      setShakingCards([]);
    }
  };

  if (!level) {
    return null;
  }

  const gridCols = level.totalCards <= 8 ? 'grid-cols-4' : level.totalCards <= 12 ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8';

  return (
    <main className="min-h-screen relative z-10 py-8">
      <TropicalDecorations />
      
      <div className="container mx-auto px-4">
        {/* Game Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border-4 border-green-600">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
                {level.name} - {level.difficulty}
              </h1>
              <p className="text-green-600 text-sm mt-1">
                {level.pairs} pasangan • {level.totalCards} kartu
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-green-100 px-4 py-2 rounded-lg text-center">
                <p className="text-xs text-green-600 font-semibold">Waktu</p>
                <p className="text-xl font-bold text-green-800">{formatTime(timer)}</p>
              </div>

              <div className="bg-amber-100 px-4 py-2 rounded-lg text-center">
                <p className="text-xs text-amber-600 font-semibold">Langkah</p>
                <p className="text-xl font-bold text-amber-800">{attempts}</p>
              </div>

              <div className="bg-blue-100 px-4 py-2 rounded-lg text-center">
                <p className="text-xs text-blue-600 font-semibold">Terkumpul</p>
                <p className="text-xl font-bold text-blue-800">
                  {matchedPairs}/{level.pairs}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button onClick={togglePause} variant="secondary" size="sm">
              {isPaused ? '▶️ Lanjut' : '⏸️ Jeda'}
            </Button>

            <Button onClick={toggleMute} variant="primary" size="sm">
              {isMuted ? '🔇 Suara Mati' : '🔊 Suara Hidup'}
            </Button>

            <Button onClick={restartGame} variant="danger" size="sm">
              🔄 Ulang
            </Button>

            <Link href="/levels">
              <Button variant="success" size="sm">
                ← Level
              </Button>
            </Link>
          </div>
        </div>

        {/* Game Grid */}
        <div className={`grid ${gridCols} gap-3 sm:gap-4 max-w-6xl mx-auto`}>
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              onClick={() => !isPaused && handleCardClick(card.id)}
              isShaking={shakingCards.includes(card.id)}
            />
          ))}
        </div>

        {/* Pause Modal */}
        <Modal isOpen={isPaused} onClose={togglePause} title="⏸️ Jeda">
          <div className="text-center space-y-4">
            <p className="text-green-700 text-lg">Permainan dijeda</p>
            <div className="space-y-2">
              <p className="text-green-600">
                <strong>Waktu:</strong> {formatTime(timer)}
              </p>
              <p className="text-green-600">
                <strong>Langkah:</strong> {attempts}
              </p>
              <p className="text-green-600">
                <strong>Pasangan Ditemukan:</strong> {matchedPairs}/{level.pairs}
              </p>
            </div>
          </div>
        </Modal>

        {/* Win Modal */}
        <Modal isOpen={isCompleted} onClose={() => {}} title="🎉 Selamat!" showCloseButton={false}>
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce-slow">🏆</div>
            <p className="text-green-700 text-lg font-semibold">
              Kamu berhasil menyelesaikan {level.name}!
            </p>

            <div className="bg-green-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-semibold">⏱️ Waktu:</span>
                <span className="text-green-800 font-bold text-lg">{formatTime(timer)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-semibold">👣 Langkah:</span>
                <span className="text-green-800 font-bold text-lg">{attempts}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {levelId < 5 && (
                <Link href={`/play/${levelId + 1}`}>
                  <Button variant="primary" className="w-full">
                    ➡️ Level Berikutnya
                  </Button>
                </Link>
              )}

              <Button onClick={restartGame} variant="secondary" className="w-full">
                🔄 Main Lagi
              </Button>

              <Link href="/levels">
                <Button variant="success" className="w-full">
                  📋 Pilih Level Lain
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
