# 🦁 Animal Memory Match - Permainan Memori Hewan Tropis Indonesia

Game edukatif memori kartu bergambar hewan-hewan tropis langka Indonesia untuk anak-anak usia 4-10 tahun. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🎮 Fitur Utama

- 🌴 **Tema Hutan Tropis Indonesia** - Desain visual yang menarik dengan nuansa hutan tropis
- 🦜 **8 Hewan Langka Indonesia** - Badak Jawa, Bakantan, Burung Cendrawasih, Gajah, Harimau Sumatra, Kancil, Kukang, Orang Utan
- 🎯 **5 Level Kesulitan** - Dari sangat mudah (4 kartu) hingga sulit (16 kartu)
- ⏱️ **Timer & Tracking** - Lacak waktu dan jumlah langkah
- 🏆 **Leaderboard Lokal** - Simpan skor terbaik di localStorage
- 🔊 **Efek Suara** - Suara flip, benar, salah, dan kemenangan
- 📱 **Fully Responsive** - Optimized untuk mobile, tablet, dan desktop
- ♿ **Accessible** - ARIA labels dan keyboard navigation
- 🎨 **Animasi Smooth** - Flip cards, shake animations, dan transisi

## 📁 Struktur Proyek

```
nama-projek/
├── app/
│   ├── globals.css          # Global styles dengan tropical theme
│   ├── layout.tsx            # Root layout dengan Header
│   ├── page.tsx              # Home page
│   ├── levels/
│   │   └── page.tsx          # Levels selection page
│   └── play/
│       └── [levelId]/
│           └── page.tsx      # Dynamic game page
├── components/
│   ├── Button.tsx            # Reusable button component
│   ├── GameCard.tsx          # Card component dengan flip animation
│   ├── Header.tsx            # Navigation header
│   └── Modal.tsx             # Modal component untuk pause & win
├── lib/
│   ├── animals.ts            # Animals configuration
│   ├── constants.ts          # Game constants & sound paths
│   ├── gameUtils.ts          # Game utility functions
│   ├── levels.ts             # Levels configuration
│   ├── localStorage.ts       # LocalStorage management
│   └── soundManager.ts       # Sound effects manager
├── types/
│   └── index.ts              # TypeScript type definitions
├── public/
│   ├── animals/              # Animal images (PNG)
│   ├── cards/                # Card back image (PNG)
│   └── sounds/               # Sound effects (MP3)
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x atau lebih tinggi
- npm, yarn, pnpm, atau bun

### Installation

1. Clone repository ini
```bash
git clone <repository-url>
cd nama-projek
```

2. Install dependencies
```bash
npm install
```

3. **PENTING: Tambahkan Asset Files**

   Anda perlu menambahkan file gambar dan suara ke folder berikut:

   **Gambar Hewan** (letakkan di `public/animals/`):
   - badak jawa.png
   - bakantan.png
   - burung cendrawasih.png
   - gajah.png
   - harimau sumatra.png
   - kancil.png
   - kukang.png
   - orang utan.png

   **Kartu Belakang** (letakkan di `public/cards/`):
   - kartu belakang.png

   **Suara** (letakkan di `public/sounds/`):
   - flip.mp3 (suara membalik kartu)
   - correct.mp3 (suara kartu cocok)
   - wrong.mp3(suara kartu tidak cocok)
   - click.mp3 (suara klik tombol)
   - victory.mp3 (suara menang)

4. Jalankan development server
```bash
npm run dev
```

5. Buka browser ke [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
npm run build
npm start
```

## 🎨 Kustomisasi

### Mengganti/Menambah Hewan

Edit file `lib/animals.ts`:

```typescript
export const animals: Animal[] = [
  {
    id: 'hewan-baru',
    name: 'Nama Hewan',
    image: '/animals/hewan-baru.png'
  },
  // ... tambahkan lebih banyak
];
```

### Mengatur Level

Edit file `lib/levels.ts`:

```typescript
export const levels: Level[] = [
  {
    id: 6,
    name: 'Level 6',
    difficulty: 'Sangat Sulit',
    totalCards: 20,
    pairs: 10,
    animalsCount: 10,
  },
  // ... tambahkan level baru
];
```

### Mengubah Tema Warna

Edit file `app/globals.css` untuk mengubah warna gradien background dan tema:

```css
body {
  background: linear-gradient(135deg, #your-color 0%, #your-color 50%, #your-color 100%);
}
```

### Mengganti Suara

Ganti file MP3 di folder `public/sounds/` dengan file yang memiliki nama yang sama, atau update path di `lib/constants.ts`:

```typescript
export const SOUNDS = {
  flip: '/sounds/your-sound.mp3',
  // ...
};
```

## 🌐 Deploy ke Vercel

### Method 1: Deploy dari Git Repository

1. Push kode ke GitHub/GitLab/Bitbucket
2. Kunjungi [vercel.com](https://vercel.com)
3. Import repository Anda
4. Vercel akan otomatis detect Next.js dan deploy
5. Selesai! 🎉

### Method 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Environment Variables

Tidak ada environment variables yang diperlukan. Game ini fully client-side.

## 📱 Browser Support

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Game Rules

1. **Klik kartu** untuk membaliknya
2. **Balik dua kartu** - coba temukan pasangan yang sama
3. **Kartu cocok** - mereka tetap terbuka
4. **Kartu tidak cocok** - mereka tertutup kembali
5. **Temukan semua pasangan** untuk menang!

## 🏆 Scoring

- **Waktu** - Semakin cepat, semakin baik
- **Langkah** - Semakin sedikit percobaan, semakin efisien
- Skor terbaik disimpan di localStorage browser

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Comic Sans MS (kid-friendly)
- **Deployment**: Vercel (recommended)

## 📝 Lisensi

Educational project - Feel free to use and modify

## 🤝 Kontribusi

Contributions, issues, dan feature requests welcome!

## 👨‍💻 Developer

Built with ❤️ for Indonesian kids

---

**Selamat bermain! 🎉🦁🌴**
