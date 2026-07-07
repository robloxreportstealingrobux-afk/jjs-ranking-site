* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
  color: #f2f2f4;
  position: relative;
  overflow-x: hidden;

  /* ===== Le "mélange de noir" =====
     Plusieurs nappes de noir légèrement teintées (violet, bleu nuit,
     anthracite chaud) superposées plutôt qu'un simple #000 plat.
     C'est ça qui donne l'effet "profond" au lieu d'un fond mort. */
  background-color: #030304;
  background-image:
    radial-gradient(1100px 650px at 12% -8%, rgba(120, 60, 220, 0.16), transparent 58%),
    radial-gradient(900px 700px at 105% 8%, rgba(0, 200, 180, 0.08), transparent 55%),
    radial-gradient(800px 600px at 50% 115%, rgba(255, 32, 121, 0.07), transparent 60%),
    radial-gradient(1400px 900px at 50% 45%, rgba(20, 16, 28, 0.9), transparent 70%),
    linear-gradient(160deg, #060608 0%, #0b0a0f 35%, #08080a 65%, #030304 100%);
  background-attachment: fixed;
  background-size: cover;
}

/* Grain fin superposé à tout le fond — casse l'effet "dégradé plat"
   et donne ce rendu "mat / velours" plutôt que plastique. */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

/* Vignette très légère pour recentrer l'œil sur le contenu */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(140% 100% at 50% 0%, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
}

#root {
  position: relative;
  z-index: 1;
}

::selection {
  background: rgba(0, 255, 209, 0.25);
  color: #fff;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #0a0a0c;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #9B30FF, #00FFD1);
  border-radius: 10px;
}
