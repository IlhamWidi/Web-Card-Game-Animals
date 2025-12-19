'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-2xl">🦁</span>
          <h1 className="text-xl sm:text-2xl font-bold">Animal Memory Match</h1>
        </Link>

        <nav className="flex gap-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname === '/'
                ? 'bg-white text-green-800 font-bold'
                : 'hover:bg-green-600'
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/levels"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname === '/levels'
                ? 'bg-white text-green-800 font-bold'
                : 'hover:bg-green-600'
            }`}
          >
            Main
          </Link>
        </nav>
      </div>
    </header>
  );
};
