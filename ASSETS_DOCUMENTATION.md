# 📋 Dokumentasi Assets Proyek
**Animal Memory Match Game - Indonesian Endangered Species Edition**

Tanggal: 19 Desember 2025

---

## 🔊 AUDIO / SOUND ASSETS

### A. File Audio Fisik (MP3)

| File | Lokasi | Status | Deskripsi |
|------|--------|--------|-----------|
| `flip.mp3` | `/public/sounds/` | ✅ **Ada** | Suara efek kartu saat dibalik |
| `correct.mp3` | `/public/sounds/` | ❌ **Tidak Ada** | Suara efek saat pasangan kartu cocok |
| `wrong.mp3` | `/public/sounds/` | ❌ **Tidak Ada** | Suara efek saat pasangan kartu salah |
| `click.mp3` | `/public/sounds/` | ❌ **Tidak Ada** | Suara efek saat klik tombol |
| `victory.mp3` | `/public/sounds/` | ❌ **Tidak Ada** | Suara efek saat pemain menang |
| `background.mp3` | `/public/sounds/` | ❌ **Tidak Ada** | Musik latar belakang permainan |

**Total File Audio**: 1 dari 6 file (16.67%)

---

### B. Generated Audio (Web Audio API Fallback)

Sistem menggunakan **Web Audio API** untuk menghasilkan suara secara otomatis jika file MP3 tidak tersedia:

#### 1. **flip** - Suara Kartu Dibalik
- **Frekuensi**: 400 Hz
- **Durasi**: 0.1 detik
- **Wave Type**: Sine wave
- **Trigger**: Saat pemain klik kartu

#### 2. **correct** - Suara Pasangan Cocok
- **Frekuensi**: 523 Hz → 659 Hz → 784 Hz (nada naik)
- **Durasi Total**: 0.4 detik
- **Wave Type**: Sine wave
- **Notasi Musik**: C5 → E5 → G5
- **Trigger**: Saat dua kartu cocok

#### 3. **wrong** - Suara Pasangan Salah
- **Frekuensi**: 400 Hz → 300 Hz (nada turun)
- **Durasi Total**: 0.3 detik
- **Wave Type**: Square wave
- **Trigger**: Saat dua kartu tidak cocok

#### 4. **click** - Suara Klik Tombol
- **Frekuensi**: 800 Hz
- **Durasi**: 0.05 detik
- **Wave Type**: Sine wave
- **Trigger**: Saat klik tombol (Start, Reset, Level, dll)

#### 5. **victory** - Suara Kemenangan
- **Frekuensi**: 523 Hz → 659 Hz → 784 Hz → 1047 Hz
- **Durasi Total**: 0.75 detik
- **Wave Type**: Sine wave
- **Notasi Musik**: C5 → E5 → G5 → C6 (fanfare)
- **Trigger**: Saat pemain menyelesaikan semua pasangan

#### 6. **background** - Musik Latar
- **Status**: Tidak diimplementasikan
- **Catatan**: Kode referensi ada, tapi tidak dipakai dalam game

---

### C. Fitur Audio Manager

**File**: `lib/soundManager.ts`

**Kemampuan**:
- ✅ Preload semua file audio
- ✅ Play/pause suara
- ✅ Mute/unmute toggle
- ✅ LocalStorage untuk menyimpan preferensi mute
- ✅ Fallback otomatis ke Web Audio API jika file tidak ada
- ✅ Web Audio Context untuk browser compatibility

**Metode**:
```typescript
soundManager.init()              // Inisialisasi sistem audio
soundManager.play('flip')        // Mainkan suara
soundManager.toggleMute()        // Toggle mute on/off
soundManager.getMuteState()      // Cek status mute
```

---

## 🎨 BACKGROUND ASSETS

### A. Background Utama (Body)

**File**: `app/globals.css`

```css
background: linear-gradient(135deg, #059669 0%, #065f46 50%, #064e3b 100%);
```

| Property | Value | Deskripsi |
|----------|-------|-----------|
| **Jenis** | Linear Gradient | Gradasi warna linier |
| **Arah** | 135 derajat | Diagonal dari kiri atas ke kanan bawah |
| **Warna Awal** | `#059669` (emerald-600) | Hijau emerald terang |
| **Warna Tengah** | `#065f46` (green-800) | Hijau tua medium |
| **Warna Akhir** | `#064e3b` (green-900) | Hijau tua gelap |
| **Attachment** | Fixed | Background tidak scroll dengan konten |
| **Tema** | Hutan Tropis Indonesia | Suasana hutan hujan tropis |

---

### B. Jungle Pattern Overlay

**Implementasi**: Pseudo-element `body::before`

Pola dekoratif transparan di atas background utama:

| Posisi | Warna | Opacity | Ukuran | Deskripsi |
|--------|-------|---------|--------|-----------|
| 20% 30% | `#10b981` (emerald-500) | 10% | 50% radius | Efek cahaya kiri atas |
| 80% 70% | `#059669` (emerald-600) | 10% | 50% radius | Efek cahaya kanan bawah |
| 50% 50% | `#047857` (green-700) | 5% | 70% radius | Efek cahaya tengah |

**Fungsi**: Memberikan kedalaman visual dan efek "cahaya matahari menembus dedaunan"

---

### C. Background Komponen UI

#### 1. **Header** (`components/Header.tsx`)
```css
bg-gradient-to-r from-green-700 to-green-900
```
- **Warna**: `#15803d` → `#14532d`
- **Arah**: Horizontal (kiri ke kanan)
- **Efek**: Shadow + sticky position

#### 2. **Card Back** - Belakang Kartu (`components/GameCard.tsx`)
```css
bg-gradient-to-br from-green-600 to-green-800
```
- **Warna**: `#16a34a` → `#166534`
- **Arah**: Diagonal (kiri atas ke kanan bawah)
- **Border**: 4px solid `#15803d` (green-700)
- **Gambar**: `kartu belakang.png` (logo hewan)

#### 3. **Card Front** - Depan Kartu (`components/GameCard.tsx`)
```css
bg-gradient-to-br from-amber-100 to-amber-200
```
- **Warna**: `#fef3c7` → `#fde68a`
- **Arah**: Diagonal (kiri atas ke kanan bawah)
- **Border**: 4px solid `#fbbf24` (amber-400)
- **Konten**: Gambar hewan + nama hewan

#### 4. **Modal** (`components/Modal.tsx`)
```css
bg-gradient-to-br from-amber-50 to-orange-50
```
- **Warna**: `#fffbeb` → `#fff7ed`
- **Border**: 4px solid `#16a34a` (green-600)
- **Overlay**: `bg-black/60` + backdrop-blur-sm

#### 5. **Button Primary** (`components/Button.tsx`)
```css
bg-gradient-to-r from-green-500 to-green-600
hover:from-green-600 hover:to-green-700
```
- **Warna Normal**: `#22c55e` → `#16a34a`
- **Warna Hover**: `#16a34a` → `#15803d`
- **Efek**: Shadow + transform scale

#### 6. **Button Secondary** (`components/Button.tsx`)
```css
bg-gradient-to-r from-amber-500 to-orange-500
hover:from-amber-600 hover:to-orange-600
```
- **Warna Normal**: `#f59e0b` → `#f97316`
- **Warna Hover**: `#d97706` → `#ea580c`

---

### D. Scrollbar Custom

```css
::-webkit-scrollbar {
  width: 10px;
  background: #064e3b; /* track - green-900 */
}

::-webkit-scrollbar-thumb {
  background: #10b981; /* thumb - emerald-500 */
  border-radius: 5px;
}
```

---

## 🖼️ IMAGE ASSETS

### A. Gambar Hewan (Animals)

**Lokasi**: `/public/animals/`

| No. | File | Ukuran | Status | Nama Hewan | Status Konservasi |
|-----|------|--------|--------|------------|-------------------|
| 1 | `Badak Jawa.png` | - | ✅ Ada | Badak Jawa | Kritis (CR) |
| 2 | `bakantan.png` | - | ✅ Ada | Bekantan | Terancam (EN) |
| 3 | `Burung Cendrawasih.png` | - | ✅ Ada | Cendrawasih | Rentan (VU) |
| 4 | `Gajah.png` | - | ✅ Ada | Gajah Sumatra | Kritis (CR) |
| 5 | `Harimau Sumatra.png` | - | ✅ Ada | Harimau Sumatra | Kritis (CR) |
| 6 | `Kancil.png` | - | ✅ Ada | Kancil | Berisiko Rendah |
| 7 | `Kukang.png` | - | ✅ Ada | Kukang | Rentan (VU) |
| 8 | `Orang utan.png` | - | ✅ Ada | Orangutan | Kritis (CR) |

**Total**: 8 gambar hewan

**Format**: PNG dengan background transparan
**Rekomendasi Ukuran**: 500x500px minimum
**Fallback**: Emoji jika gambar gagal load

---

### B. Gambar Kartu (Cards)

**Lokasi**: `/public/cards/`

| File | Status | Deskripsi | Implementasi |
|------|--------|-----------|--------------|
| `kartu belakang.png` | ✅ Ada | Gambar belakang kartu dengan logo hewan Indonesia | Digunakan di `GameCard.tsx` sebagai background |

**Format**: PNG
**Ukuran**: Full size (mengikuti ukuran card)
**CSS**: `object-cover w-full h-full` untuk full-size display

---

### C. Icon SVG (Next.js Default)

**Lokasi**: `/public/`

| File | Status | Deskripsi |
|------|--------|-----------|
| `file.svg` | ✅ Ada | Icon file (Next.js default) |
| `globe.svg` | ✅ Ada | Icon globe (Next.js default) |
| `next.svg` | ✅ Ada | Logo Next.js |
| `vercel.svg` | ✅ Ada | Logo Vercel |
| `window.svg` | ✅ Ada | Icon window (Next.js default) |

**Catatan**: Icon default Next.js, tidak digunakan dalam game

---

## 📁 STRUKTUR DIREKTORI ASSETS

```
public/
├── sounds/                      # Audio files
│   ├── flip.mp3                # ✅ Suara kartu flip (satu-satunya file audio)
│   └── README.md               # Dokumentasi audio
│
├── animals/                    # Gambar hewan terancam punah Indonesia
│   ├── Badak Jawa.png         # ✅ Badak Jawa (Critically Endangered)
│   ├── bakantan.png           # ✅ Bekantan (Endangered)
│   ├── Burung Cendrawasih.png # ✅ Cendrawasih (Vulnerable)
│   ├── Gajah.png              # ✅ Gajah Sumatra (Critically Endangered)
│   ├── Harimau Sumatra.png    # ✅ Harimau Sumatra (Critically Endangered)
│   ├── Kancil.png             # ✅ Kancil (Least Concern)
│   ├── Kukang.png             # ✅ Kukang (Vulnerable)
│   ├── Orang utan.png         # ✅ Orangutan (Critically Endangered)
│   └── README.md              # Dokumentasi gambar hewan
│
├── cards/                      # Gambar kartu
│   ├── kartu belakang.png     # ✅ Background kartu belakang
│   └── README.md              # Dokumentasi kartu
│
├── file.svg                    # Icon default Next.js
├── globe.svg                   # Icon default Next.js
├── next.svg                    # Logo Next.js
├── vercel.svg                  # Logo Vercel
├── window.svg                  # Icon default Next.js
└── INSTRUKSI_GAMBAR.txt       # Instruksi untuk gambar custom
```

---

## 🎨 CSS ANIMATIONS & EFFECTS

### A. Tropical Decorations

**File**: `app/globals.css`

#### 1. **Float Animation** (Awan Mengambang)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```
- **Durasi**: 6 detik
- **Loop**: Infinite
- **Easing**: ease-in-out

#### 2. **Sway Animation** (Daun Bergoyang)
```css
@keyframes sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
```
- **Durasi**: 4 detik
- **Loop**: Infinite
- **Easing**: ease-in-out

#### 3. **Fly Animation** (Burung Terbang)
```css
@keyframes fly {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}
```
- **Durasi**: 15 detik
- **Loop**: Infinite
- **Easing**: linear

#### 4. **Scale-in Animation** (Modal Muncul)
```css
@keyframes scale-in {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```
- **Durasi**: 0.2 detik
- **Easing**: ease-out

---

### B. Card Flip Animation

**File**: `components/GameCard.tsx`

```css
transition: transform 0.6s;
transform-style: preserve-3d;
```

**States**:
- **Normal**: `transform: rotateY(0deg)`
- **Flipped**: `transform: rotateY(180deg)`
- **Matched**: `transform: rotateY(180deg)` + green ring glow

---

## 📊 STATISTIK ASSETS

### Ringkasan File

| Kategori | Ada | Tidak Ada | Total | Persentase |
|----------|-----|-----------|-------|------------|
| **Audio Files** | 1 | 5 | 6 | 16.67% |
| **Animal Images** | 8 | 0 | 8 | 100% |
| **Card Images** | 1 | 0 | 1 | 100% |
| **SVG Icons** | 5 | 0 | 5 | 100% |
| **CSS Backgrounds** | 6 | 0 | 6 | 100% |
| **CSS Animations** | 4 | 0 | 4 | 100% |

### Total Assets
- ✅ **Assets Ada**: 25 files/items
- ❌ **Assets Tidak Ada**: 5 audio files
- 📦 **Total**: 30 assets

---

## 💡 REKOMENDASI

### Untuk Kelengkapan Audio:

1. **Prioritas Tinggi**:
   - ✅ `flip.mp3` - Sudah ada
   - ❌ `correct.mp3` - Perlu dibuat (suara kemenangan/cocok)
   - ❌ `wrong.mp3` - Perlu dibuat (suara error/salah)

2. **Prioritas Sedang**:
   - ❌ `victory.mp3` - Perlu dibuat (suara fanfare kemenangan)
   - ❌ `click.mp3` - Perlu dibuat (suara klik tombol)

3. **Prioritas Rendah**:
   - ❌ `background.mp3` - Optional (musik latar)

### Catatan Penting:

⚠️ **System Fallback**: Meskipun file audio tidak lengkap, game tetap berfungsi normal karena sistem menggunakan **Web Audio API** untuk generate suara secara otomatis jika file tidak ditemukan.

✅ **Production Ready**: Proyek sudah siap di-deploy ke production dengan atau tanpa file audio lengkap.

---

## 🔗 REFERENCES

### File Terkait:
- `lib/soundManager.ts` - Audio system management
- `lib/animals.ts` - Animal configuration dengan image paths
- `app/globals.css` - Global styles dan tropical theme
- `components/GameCard.tsx` - Card component dengan flip animation
- `components/Header.tsx` - Header dengan gradient background
- `components/Modal.tsx` - Modal dengan backdrop blur
- `components/Button.tsx` - Button dengan gradient colors

### Technologies:
- **Web Audio API** - Audio generation & playback
- **Tailwind CSS 4** - Utility-first CSS framework
- **Next.js 16** - React framework dengan App Router
- **TypeScript 5** - Type-safe development

---

**Dokumentasi dibuat untuk keperluan laporan proyek**  
**Animal Memory Match Game - Indonesian Endangered Species Edition**  
**© 2025 - Educational Game Project**
