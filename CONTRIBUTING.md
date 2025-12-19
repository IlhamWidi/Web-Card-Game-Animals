# Contributing to Animal Memory Match

Thank you for considering contributing to this project! 🎮

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/IlhamWidi/Web-Card-Game-Animals.git
cd Web-Card-Game-Animals
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── types/           # TypeScript type definitions
└── public/          # Static assets (images, sounds)
```

## Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and focused

## Adding New Animals

1. Add animal configuration in `lib/animals.ts`
2. Add animal image to `public/animals/`
3. Update emoji fallback in `components/GameCard.tsx`

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Questions?

Feel free to open an issue for any questions or suggestions!
