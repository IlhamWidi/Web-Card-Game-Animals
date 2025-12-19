# Sound Effects

Place your sound effect files (MP3 format) in this folder.

## Required Files:

1. **flip.mp3** - Sound when flipping a card
2. **correct.mp3** - Sound when cards match
3. **wrong.mp3** - Sound when cards don't match
4. **click.mp3** - Sound for button clicks
5. **victory.mp3** - Sound when completing a level

## Sound Guidelines:

- **Format**: MP3 (best browser compatibility)
- **Duration**: 
  - flip: 0.2-0.5 seconds
  - correct: 0.5-1 second (cheerful sound)
  - wrong: 0.5-1 second (gentle error sound)
  - click: 0.1-0.3 seconds
  - victory: 2-5 seconds (celebration sound)
- **Volume**: Normalized, not too loud
- **Style**: Kid-friendly, pleasant sounds

## Where to Find Free Sounds:

- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)

## Note:

The file names must match exactly as configured in `/lib/constants.ts`.

If you want to use different names or add more sounds, update the configuration in `/lib/constants.ts`:

```typescript
export const SOUNDS = {
  flip: '/sounds/your-flip-sound.mp3',
  // ... etc
};
```

## Testing Sounds:

After adding sound files, test them in the game:
1. Open the game in browser
2. Click the sound button (🔊) to ensure it's not muted
3. Play the game to hear all sound effects
