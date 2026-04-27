# iRide — Intercity Ride-Matching Platform

A two-sided platform connecting passengers traveling A → B with drivers
returning B → A. Cuts passenger fares while improving driver utilization
on otherwise empty return legs.

## Stack
- React 18 + TypeScript
- Vite 6
- React Router v6
- Tailwind CSS v4 (CSS-first config in `src/styles.css`)
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  assets/           Images
  components/       Reusable UI (Header, Footer, RideCard, RouteLine)
  lib/              Mock data + utils
  pages/            Route components
    Index.tsx       Landing + search
    FindRides.tsx   Discovery + filters
    PostRide.tsx    Driver trip posting
    HowItWorks.tsx  Marketing / explainer
    NotFound.tsx
  main.tsx          Router + app shell
  styles.css        Design tokens + Tailwind import
```

## Notes
- All ride data is mocked in `src/lib/mockData.ts` — swap for a real API.
- Design tokens (colors, radii, shadows, gradients) live in `src/styles.css`.
