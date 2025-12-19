# Card Back Image

Place your card back image (PNG format) in this folder.

## Required File:

- kartu belakang.png

## Image Guidelines:

- **Format**: PNG
- **Size**: Approximately 300x400px (3:4 aspect ratio)
- **Design**: Should represent a tropical/jungle theme
- **Quality**: High quality
- **Style**: Decorative design that hides the animal when card is face down

## Note:

The file name must match exactly (including spaces and lowercase) as configured in `/lib/animals.ts`.

If you want to use a different name, update the configuration in `/lib/animals.ts`:

```typescript
export const cardBack = {
  image: '/cards/your-new-filename.png'
};
```
