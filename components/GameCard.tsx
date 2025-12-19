'use client';

import React, { useState } from 'react';
import { Card as CardType } from '@/types';
import { animals } from '@/lib/animals';
import { cardBack } from '@/lib/animals';

interface GameCardProps {
  card: CardType;
  onClick: () => void;
  isShaking?: boolean;
}

// Emoji fallback if images don't load
const getAnimalEmoji = (animalId: string): string => {
  const emojiMap: { [key: string]: string } = {
    'badak-jawa': '🦏',
    'bakantan': '🐵',
    'burung-cendrawasih': '🦜',
    'gajah': '🐘',
    'harimau-sumatra': '🐅',
    'kancil': '🦌',
    'kukang': '🦥',
    'orang-utan': '🦧',
  };
  return emojiMap[animalId] || '🐾';
};

export const GameCard: React.FC<GameCardProps> = ({ card, onClick, isShaking }) => {
  const animal = animals.find((a) => a.id === card.animalId);
  const [imageError, setImageError] = useState(false);
  const [backImageError, setBackImageError] = useState(false); // Try to load image first

  return (
    <button
      onClick={onClick}
      disabled={card.isFlipped || card.isMatched}
      className={`
        relative aspect-[3/4] w-full rounded-xl transition-all duration-500 
        transform-gpu perspective-1000
        ${card.isFlipped && !card.isMatched ? 'flip-animation' : ''}
        ${isShaking ? 'shake-animation' : ''}
        ${card.isMatched ? 'matched-card' : 'hover:scale-105'}
        ${!(card.isFlipped || card.isMatched) ? 'hover:shadow-lg' : ''}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: card.isMatched ? 'rotateY(180deg)' : undefined,
      }}
      aria-label={card.isFlipped ? animal?.name : 'Kartu tertutup'}
    >
      {/* Card Back */}
      <div
        className={`
          absolute inset-0 rounded-xl 
          shadow-lg backface-hidden overflow-hidden transition-opacity duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          flex items-center justify-center
        `}
      >
        {backImageError ? (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-600 to-green-800 border-4 border-green-700 flex items-center justify-center">
            <div className="text-6xl">🌴</div>
          </div>
        ) : (
          <img
            src={cardBack.image}
            alt="Kartu belakang"
            className="w-full h-full object-cover rounded-xl"
            onError={() => setBackImageError(true)}
          />
        )}
      </div>

      {/* Card Front */}
      <div
        className={`
          absolute inset-0 rounded-xl 
          shadow-lg backface-hidden overflow-hidden transition-all duration-300
          ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${card.isMatched ? 'ring-4 ring-green-400' : ''}
        `}
        style={{
          transform: 'rotateY(180deg)',
        }}
      >
        {animal && (
          <div className="relative w-full h-full">
            {imageError ? (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-400 rounded-xl p-2">
                <div className="text-5xl mb-2">
                  {getAnimalEmoji(animal.id)}
                </div>
                <p className="text-xs sm:text-sm font-bold text-green-800 text-center mt-1">
                  {animal.name}
                </p>
              </div>
            ) : (
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover rounded-xl"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
      </div>
    </button>
  );
};
