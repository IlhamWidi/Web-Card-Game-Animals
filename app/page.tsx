'use client';

import Link from "next/link";
import { Button } from "@/components/Button";
import { TropicalDecorations } from "@/components/TropicalDecorations";
import { useEffect } from "react";

export default function Home() {
  // Play subtle background music on homepage
  useEffect(() => {
    let audioContext: AudioContext;
    let oscillator: OscillatorNode;
    let gainNode: GainNode;

    const playBackgroundMusic = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Gentle tropical melody
        oscillator.frequency.value = 523; // C5
        oscillator.type = 'sine';
        gainNode.gain.value = 0.05; // Very low volume

        oscillator.start();
      } catch (error) {
        console.log('Background music disabled');
      }
    };

    // Start music on first user interaction
    const startMusic = () => {
      playBackgroundMusic();
      document.removeEventListener('click', startMusic);
    };

    document.addEventListener('click', startMusic);

    return () => {
      document.removeEventListener('click', startMusic);
      if (oscillator) oscillator.stop();
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <main className="min-h-screen relative z-10">
      <TropicalDecorations />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-bounce-slow">
            <span className="text-8xl sm:text-9xl">🦁🐵🦜</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Animal Memory Match
          </h1>
          
          <p className="text-xl sm:text-2xl text-amber-100 mb-8 drop-shadow-md">
            Permainan Memori Hewan Tropis Indonesia
          </p>
          
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            Temukan pasangan kartu bergambar hewan-hewan langka Indonesia! 
            Game edukatif yang menyenangkan untuk anak-anak usia 4-10 tahun.
          </p>
          
          <Link href="/levels">
            <Button variant="secondary" size="lg" className="text-xl px-12 py-5">
              🎮 Main Sekarang!
            </Button>
          </Link>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 max-w-4xl mx-auto border-4 border-green-600">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 text-center">
            🎯 Cara Bermain
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-300">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-bold text-xl text-green-800 mb-2">Klik Kartu</h3>
              <p className="text-green-700">
                Klik pada kartu untuk membaliknya dan melihat gambar hewan di baliknya.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border-2 border-amber-300">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-bold text-xl text-amber-800 mb-2">Cari Pasangan</h3>
              <p className="text-amber-700">
                Balik dua kartu dan ingat lokasinya. Coba temukan pasangan yang sama!
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-bold text-xl text-blue-800 mb-2">Cocokkan!</h3>
              <p className="text-blue-700">
                Jika kartu cocok, mereka akan tetap terbuka. Jika tidak, mereka akan tertutup kembali.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300">
              <div className="text-4xl mb-3">4️⃣</div>
              <h3 className="font-bold text-xl text-purple-800 mb-2">Menang!</h3>
              <p className="text-purple-700">
                Temukan semua pasangan kartu untuk menyelesaikan level dan lanjut ke level berikutnya!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-4xl mx-auto border-4 border-amber-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-8 text-center">
            🌟 Manfaat Permainan
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/80 p-6 rounded-2xl">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="font-bold text-lg text-green-800 mb-2">Melatih Memori</h3>
              <p className="text-green-700 text-sm">
                Meningkatkan daya ingat dan konsentrasi anak
              </p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-2xl">
              <div className="text-5xl mb-3">🦜</div>
              <h3 className="font-bold text-lg text-green-800 mb-2">Mengenal Satwa</h3>
              <p className="text-green-700 text-sm">
                Belajar tentang hewan langka Indonesia
              </p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-2xl">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-bold text-lg text-green-800 mb-2">Cepat Berpikir</h3>
              <p className="text-green-700 text-sm">
                Melatih kecepatan dan ketepatan berpikir
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
