export const TropicalDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left - Leaves */}
      <div className="absolute -top-10 -left-10 text-9xl opacity-40 animate-float">🌿</div>
      <div className="absolute top-20 left-5 text-7xl opacity-30 animate-float-delayed">🍃</div>
      <div className="absolute top-40 left-32 text-6xl opacity-25 rotate-45">🌱</div>
      
      {/* Top Right - Tropical plants */}
      <div className="absolute -top-5 -right-10 text-8xl opacity-35 animate-float">🌴</div>
      <div className="absolute top-32 right-12 text-7xl opacity-30 -rotate-12">🪴</div>
      <div className="absolute top-56 right-40 text-5xl opacity-25 animate-float-delayed">🌺</div>
      
      {/* Bottom Left - Vines and roots */}
      <div className="absolute bottom-10 left-5 text-9xl opacity-30 rotate-90 animate-sway">🌿</div>
      <div className="absolute bottom-32 left-20 text-6xl opacity-25 -rotate-45">🍀</div>
      <div className="absolute bottom-48 left-2 text-7xl opacity-30">🌾</div>
      
      {/* Bottom Right - Flowers and plants */}
      <div className="absolute bottom-5 right-10 text-8xl opacity-35 animate-float">🌸</div>
      <div className="absolute bottom-28 right-32 text-6xl opacity-30 rotate-12 animate-sway">🌺</div>
      <div className="absolute bottom-52 right-5 text-7xl opacity-25 -rotate-12">🪷</div>
      
      {/* Middle decorations - butterflies and birds */}
      <div className="absolute top-1/4 left-1/4 text-4xl opacity-40 animate-fly">🦋</div>
      <div className="absolute top-1/3 right-1/3 text-5xl opacity-30 animate-fly-delayed">🐦</div>
      <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-35 animate-float">🦜</div>
      
      {/* Hanging vines effect */}
      <div className="absolute top-0 left-1/4 text-6xl opacity-20 animate-sway">🌿</div>
      <div className="absolute top-0 right-1/4 text-6xl opacity-20 animate-sway-delayed">🌿</div>
      <div className="absolute top-0 left-1/2 text-5xl opacity-15 animate-sway">🍃</div>
    </div>
  );
};
