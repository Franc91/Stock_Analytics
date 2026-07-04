# 📈 Analizator Akcji

Aplikacja webowa do analizy technicznej akcji wybranych spółek z rekomendacjami **Kupuj / Sprzedaj / Trzymaj**.

## Funkcjonalności

- **Wyszukiwarka spółek** – szybkie wyszukiwanie po nazwie, symbolu lub sektorze
- **Lista obserwowanych** – dodawaj spółki do obserwowanych i śledź ich wyniki
- **Analiza techniczna** – automatyczna analiza oparta na wskaźnikach:
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - Średnie kroczące SMA(5), SMA(10), SMA(20)
  - Pasma Bollingera
  - Zmienność
- **Wykres cenowy** – wizualizacja historycznych cen z ostatnich 30 dni
- **Rekomendacje** – czytelny wskaźnik z oceną punktową (0–100)

## Technologie

- **React 19** + **TypeScript**
- **Vite** (bundler)
- **Recharts** (wykresy)
- **React Router** (nawigacja)

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## Budowa wersji produkcyjnej

```bash
npm run build
npm run preview
```

## Zastrzeżenie

Aplikacja służy wyłącznie do celów edukacyjnych. Nie stanowi porady inwestycyjnej.
Decyzje inwestycyjne podejmuj po konsultacji z licencjonowanym doradcą finansowym.
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
