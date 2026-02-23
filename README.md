# EllatechTask

Small Expo + NativeWind React Native app that simulates user and product management using local state.

## Features
- Register a user (email + full name)
- Register product (SKU, name, price, quantity)
- Adjust product stock (+ / -), stock cannot go negative
- Product status view (SKU, quantity, last updated time)
- Transaction history (records actions), simple pagination (5 per page)
- Local state only (no backend)

## Quick Setup
1. Install dependencies

```bash
npm install
```

2. Start the development server (web / device / Expo Go)

```bash
npm start
# or to clear bundler cache
npm start -c
```

3. Open the app in your browser (press `w` in the Expo console) or scan the QR code with Expo Go.

Notes: On web the project uses a PostCSS/Tailwind pipeline. If you see plain unstyled elements, run the bundled Tailwind build included in the repo (the project already generates `output.css` during dev steps). If needed, rebuild and restart:

```bash
# build compiled Tailwind output (dev helper included)
node scripts/build-tailwind.js
# restart dev server
npm start -c
```

## Files of interest
- `App.js` — top level app, user and product state, forms, layout
- `src/components/Input.js` — input wrapper (includes web fallbacks)
- `src/components/ProductCard.js` — product display and +/- controls (includes web fallbacks)
- `tailwind.config.js` — Tailwind + NativeWind config
- `postcss.config.js` — PostCSS setup for web
- `scripts/build-tailwind.js` — helper to produce `output.css` for web

## Approach & trade-offs (short)
- State: kept simple and local using `useState` for clarity and speed. This fits the assignment scope (no backend).
- UI: styled using NativeWind (Tailwind classes). Because of differences in Metro/webpack PostCSS handling, I added web inline style fallbacks and a helper that writes `output.css` so the UI is reliable during development on web.
- Validation: minimal checks (presence/uniqueness/email format) with `Alert.alert` for simplicity.
- Trade-offs: no navigation, persistence, or tests were added to keep within the 3–5 hour target. With more time I'd:
  - Add React Navigation for multi-screen UX
  - Persist data (AsyncStorage) and add export/import
  - Add unit/interaction tests and stronger validation
  - Extract hooks for product/transaction logic and add context or a small store (useReducer/useContext)

## Interview prep — what to highlight
- Component structure: explain `App.js` responsibilities vs `ProductCard` and `Input` (single responsibility, presentational vs stateful components).
- State management: discuss `useState` choices, why local state suffices here, when you'd lift state or use `useReducer`/context or a global store.
- Styling: NativeWind advantages (fast utility classes, consistency). Explain how the web build differs and why the `postcss` + `@tailwindcss/postcss` / `output.css` fallback was added.
- Validation & UX: basic validation guardrails implemented; how you'd improve error handling and UX with inline messages, disabled buttons, and form libraries.
- Performance & safety: preventing negative stock, bundling/reanimated plugin ordering, and why `react-native-reanimated/plugin` must be first in `babel.config.js`.
- Improvements with more time: add navigation, persistence (AsyncStorage), unit & e2e tests, better responsive layout, and CI.

## Run checklist before demo
- `npm install`
- `node scripts/build-tailwind.js` (if you plan to demo on web)
- `npm start -c`
- Open the project in browser or Expo Go and test:
  - Register user
  - Add a product (unique SKU)
  - Increase/decrease stock and confirm transaction history entries

## Notes / Known issues
- Expo suggests slightly different versions for `react-native-reanimated`/`react-native-worklets` for perfect compatibility with the installed Expo SDK. If you see runtime warnings, consider installing the versions recommended by Expo.

---
If you want, I can also:
- Create a short commit message and instructions for pushing to GitHub
- Downgrade `react-native-reanimated` / `react-native-worklets` to the Expo expected versions and verify the app
- Add a tiny `README` section with sample interview talking points per component

Which would you like next?