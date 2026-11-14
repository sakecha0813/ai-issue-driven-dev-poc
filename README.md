# ai-issue-driven-dev-poc
PoC for AI-driven development using GitHub Issues, Copilot and Actions

## Tax-included price calculator

The web application uses a React/Vite frontend and an Express API. From the
repository root, install dependencies and start both development servers with:

```sh
npm ci
npm run dev
```

Open the frontend at <http://localhost:5173>. The API listens on port 3001 and
the Vite development server proxies `/api` requests to it.

Run the TypeScript builds and tests with:

```sh
npm run build
npm test
```

The API endpoint is `GET /api/prices/tax-included?price=1000&taxRate=0.10`.
It returns `{ "taxIncludedPrice": 1100 }` and rejects invalid or negative
inputs with HTTP 400.
