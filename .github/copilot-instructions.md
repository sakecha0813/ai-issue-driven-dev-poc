
# Copilot Development Instructions

## Project Overview

This repository is a proof of concept for
AI-driven issue-based development.

## Technology Stack

### Existing Java PoC
- Java 21
- Maven
- JUnit 5

### New Web Application
- React + TypeScript + Vite
- Node.js + TypeScript + Express
- npm workspaces
- Vitest
- Supertest

## Repository Structure

- frontend/: React application
- backend/: Node.js REST API
- src/: Existing Java PoC
- .github/workflows/: CI/CD workflows

## Implementation Rules

- Follow the requirements in the GitHub Issue.
- Do not implement unspecified features.
- Keep the implementation simple.
- Use strict TypeScript settings.
- Avoid using `any`.
- Add unit tests for business logic.
- Add API tests for backend endpoints.
- Do not delete or modify existing Java PoC code.
- Do not introduce a database unless requested.

## Security Rules

- Never hardcode credentials or secrets.
- Do not modify GitHub Actions workflows.
- Do not modify repository permissions.
- Do not add AWS resources or deployment configuration.
- Do not modify authentication settings.

## Verification

For the TypeScript application:
- Run `npm ci` when a lockfile exists.
- Run `npm run build`.
- Run `npm test`.

For the existing Java application:
- Preserve the existing tests and build configuration.

## Pull Request Requirements

Include:
- Summary of changes
- Files added or modified
- Test results
- Known limitations
