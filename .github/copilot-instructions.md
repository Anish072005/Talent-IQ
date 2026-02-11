## Purpose
Short, focused instructions to help AI coding agents be immediately productive in this repository.

## Big picture (what this repo is)
- Two-folder monorepo: `Backend/` (Express + Node) and `Frontend/` (Vite + React).
- Root `package.json` contains a convenience `build` script that installs both subprojects and runs the frontend build.

## Key files to read first
- `Backend/server.js` — simple Express entrypoint; imports `env` from `Backend/src/lib/env.js` and starts the HTTP server.
- `Backend/src/lib/env.js` — reads `PORT` and `DB_URL` from environment (`dotenv`).
- `Backend/package.json` — scripts: `dev` uses `nodemon server.js`, `start` uses `node server.js`. Backend is configured as ES modules (`"type":"module"`).
- `Frontend/package.json` — scripts: `dev` (vite), `build`, `preview`, and `lint` (eslint). Frontend uses Vite + React.
- `Frontend/src/` — React entry at `main.jsx` and app at `App.jsx`.

## How to run locally (developer workflows)
- Backend (development):

  cd Backend
  npm install
  npm run dev

  Notes: `npm run dev` executes `nodemon server.js`. The backend expects environment variables: `PORT` and `DB_URL` (see `Backend/src/lib/env.js`).

- Frontend (development):

  cd Frontend
  npm install
  npm run dev

  Vite will serve the frontend (default port 5173 unless overridden). Use the browser to confirm HMR at `http://localhost:5173`.

- Full project build (CI / single-command build):

  From repo root: `npm run build`

  This runs `npm install` in both `Backend` and `Frontend` and then runs the frontend build.

## Project-specific conventions and patterns
- Backend is using ES modules (`type: "module"` in `Backend/package.json`) — prefer import/export over require.
- `env` values are centralized in `Backend/src/lib/env.js`; modify there for local defaults or to add new env keys.
- Directory layout (what to expect):
  - `Backend/src/Models/` — database models (Mongoose).
  - `Backend/src/controllers/` — controller logic for routes.
  - `Backend/src/routes/` — express Router modules. When adding routes, export a router and mount it in `server.js` with `app.use('/path', router)`.

## Integration points and external dependencies
- Backend dependencies: `express`, `mongoose`, `dotenv`, `nodemon` (dev convenience). Expect DB connection code to use `process.env.DB_URL` (not present in `server.js` yet); look for `Models` files to find connection usage.
- Frontend dependencies: `react`, `react-dom`, Vite plugins and ESLint rules in devDependencies.

## Useful examples (concrete patterns from this repo)
- Add a new API route:
  - Create `Backend/src/routes/myRoute.js` exporting an Express Router.
  - Add controller logic in `Backend/src/controllers/myController.js`.
  - In `Backend/server.js` add: `import myRoute from './src/routes/myRoute.js'; app.use('/my-route', myRoute);`

- Read env vars safely: `import { env } from './src/lib/env.js'; const port = env.PORT || 5000;` (use fallback defaults when writing new code).

## Linting, testing, debugging
- Frontend lint: `cd Frontend && npm run lint`.
- No test scripts detected in the repo; if you add tests, put backend tests under `Backend/test` and frontend tests under `Frontend/test` and add appropriate npm scripts.
- Debugging backend: `npm run dev` (nodemon) and use console logs; backend runs with ES modules so debug tooling should use Node's --experimental-modules flags only if needed.

## When merging changes or creating PRs
- Keep backend ES module style consistent.
- If you change env names, update `Backend/src/lib/env.js` and document new env keys in the repo README or PR description.

## Missing/unclear areas for the maintainer (ask these if you need them)
- Exact DB connection flow: `server.js` currently does not connect to Mongo — confirm where/if connection should be established (likely before routes are mounted).
- Preferred ports for running both services concurrently in development (if the team uses a proxy or specific port mapping).

If anything in here is unclear or you'd like extra examples (e.g., a template route + model + controller), tell me which area to expand and I will update this file.
