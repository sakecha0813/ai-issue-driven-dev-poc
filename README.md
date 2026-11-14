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

### Docker

Build and run the production image from the repository root:

```sh
docker build -t price-calculator:local .
docker run --rm -p 3000:3000 --name price-calculator price-calculator:local
```

Open <http://localhost:3000/> in a browser. In another terminal, check the
API and health endpoint:

```sh
curl 'http://localhost:3000/api/prices/tax-included?price=1000&taxRate=0.10'
curl http://localhost:3000/health
```

The responses are `{"taxIncludedPrice":1100}` and `{"status":"ok"}`.
Stop the container with `docker stop price-calculator` or Ctrl+C in the
terminal running it.

The multi-stage image builds both workspaces, installs only backend production
dependencies, and runs the compiled Express server as a non-root user. The
final image contains those dependencies, the compiled backend, and the built
frontend. It does not run the Vite development server. To develop without
Docker, use the `npm ci` and `npm run dev` instructions above.

### End-to-end tests (Playwright)

The E2E tests run in Chromium against the real React app and Express API
(no mocks). Install the browser once, then run the tests from the repository
root; Playwright starts the API (port 3001) and the frontend (port 5173)
automatically:

```sh
npx playwright install chromium
npm run test:e2e
```

Failed tests keep screenshots and traces in `test-results/`. When `CI` is set,
an HTML report is written to `playwright-report/` and existing servers are not
reused. On Linux CI, use `npx playwright install --with-deps chromium`.
