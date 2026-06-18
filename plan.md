# Reputation API Dashboard — Wave Sprint Plan

## Project Overview
A React + Vite + TypeScript dashboard that visualizes contributor scorecards from the Reputation Indexer API. Features Recharts-based charts for code quality trends, webhook activity monitors, and top-contributor leaderboards.

## Wave Sprint Structure
Sprints align with the backend API sprints. Frontend issues depend on stable API endpoints, so they are typically picked after or in parallel with backend work. Points redeemable for on-chain rewards.

## Issue Types & Point Matrix

### Bug Fixes (100–150 pts)
- **Stale data on route change** (150 pts) — React Router navigation does not re-fetch scorecard data. Ensure `useEffect` dependencies include route params and add loading skeletons.
- **Chart overflow on mobile** (100 pts) — Recharts containers do not resize below 320px viewport. Add responsive container wrapper with min-width breakpoints.
- **Error state flash** (100 pts) — Brief flash of empty state before API error is caught. Implement stable loading/error/empty state machine with Suspense boundaries.

### New Features (150–200 pts)
- **Dark mode toggle** (150 pts) — CSS custom properties theme switcher persisted in localStorage, with system-preference detection via `prefers-color-scheme`.
- **Trend line charts** (200 pts) — New `/trends/:handle` page consuming the Trend API endpoint, rendering sparklines for PR velocity, approval time, and score over 6 months.
- **Team comparison view** (200 pts) — Side-by-side scorecard comparison for up to 4 contributors, using radar charts to compare metrics across dimensions.
- **Export to PDF** (150 pts) — Client-side PDF generation of a contributor's scorecard using `@react-pdf/renderer` or browser Print API with optimized stylesheets.
- **Webhook activity stream** (150 pts) — Server-Sent Events (SSE) connection to a new API endpoint, rendering real-time webhook processing notifications in a toast stack.

### Documentation (50–100 pts)
- **Component storybook** (100 pts) — Set up Storybook with stories for every UI component (ScorecardView, WebhookStats, charts, forms) and publish via GitHub Pages.
- **Contributor workflow guide** (50 pts) — Document the full user flow: entering a handle, reading the scorecard, interpreting quality metrics, and exporting results.
- **API integration guide** (50 pts) — Explain how the dashboard calls each API endpoint, with curl examples and expected response shapes for developers extending the UI.

### Testing (100–150 pts)
- **Component unit tests** (100 pts) — Vitest + React Testing Library tests for all components covering render, loading, error, and empty states.
- **E2E smoke tests** (150 pts) — Playwright tests that start a mock API server, navigate the dashboard, search a contributor, and verify chart data renders.
- **Visual regression tests** (100 pts) — Chromatic or Percy snapshot tests for each component across themes (light/dark) and viewport sizes.

## Acceptance Criteria
- 90% component coverage via Vitest
- All API calls have loading, success, and error states
- Responsive down to 320px viewport width
- No hardcoded API URLs — all configurable via `VITE_API_URL` env var
