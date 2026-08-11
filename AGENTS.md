# Repository Guidelines

## Project Structure & Module Organization
This Expo SDK 57 monorepo-style app builds multiple branded apps from one codebase. Runtime source lives under `src/`: routes in `src/app`, shared UI in `src/components`, hooks in `src/hooks`, constants in `src/constants`, and variant-aware feature code in `src/features`. App-specific configuration lives in `apps/red` and `apps/blue`. Static assets are under `assets/`. Keep new cross-app business logic in shared modules and isolate variant-specific presentation behind resolver files.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run start:red`: run the Red variant locally in development mode.
- `npm run start:blue`: run the Blue variant locally in development mode.
- `npm run config:red` / `npm run config:blue`: inspect the generated Expo config for a variant.
- `npm run lint`: run Expo ESLint checks.
- `npm run build:red:preview` or `npm run build:blue:preview`: create EAS preview builds.
- `npm run update:red:preview` or `npm run update:blue:production`: publish OTA updates to a specific channel.

## Coding Style & Naming Conventions
Use TypeScript with strict mode enabled. Follow the existing style: single quotes, semicolons, and 2-space indentation in JSX/TSX blocks where applicable. Name React components in PascalCase, hooks as `use-*.ts`, and route files with Expo Router conventions such as `index.tsx` and `_layout.tsx`. Prefer `@/` imports over deep relative paths. Run `npm run lint` before submitting changes.

## Testing Guidelines
There is no dedicated automated test suite yet. For now, treat `npm run lint` as the minimum validation step. When adding non-trivial logic, keep it isolated in hooks or shared modules so it is easy to cover once tests are introduced. Manually verify both app variants when changes affect config, branding, notifications, or OTA behavior.

## Commit & Pull Request Guidelines
Recent commits use concise, imperative summaries such as `Enhance multi-app configuration by adding updates...` or `Refactor layout and enhance home screen...`. Keep commit messages specific and scoped to the change. Pull requests should include: a short description, impacted variant(s), validation performed, and screenshots or screen recordings for UI updates.

## Security & Configuration Tips
Read the exact Expo SDK 57 docs before changing platform or config behavior: `https://docs.expo.dev/versions/v57.0.0/`. Do not commit secrets. Keep Firebase client files variant-specific in `apps/<variant>/google-services.json`, and avoid placing sensitive values in `EXPO_PUBLIC_` variables because they are bundled into the client.
