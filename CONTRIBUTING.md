# Contributing to Blog Bliss


Thanks for considering a contribution! Please follow these guidelines to help us keep things clean and fast.


## Getting Started
1. Fork and clone the repo
2. Install dependencies: `npm i`
3. Run the server: `npm run dev`


## Branching
- Features: `feat/<short-slug>`
- Fixes: `fix/<short-slug>`
- Docs/Chores: `chore/<short-slug>`


## Commit Style (Conventional Commits encouraged)
Examples:
- `feat(posts): add pagination parameters`
- `fix(auth): handle expired token gracefully`
- `docs(readme): clarify setup`


## Pull Requests
- Keep PRs focused and small
- Describe the change and rationale
- Include screenshots or curl examples for API behavior where useful
- Ensure `npm run lint` and `npm run start` work without errors


## Code Style
- JavaScript (ES2022+)
- Lint/format via ESLint + Prettier (configs in repo root)


## Reporting Issues
Open an issue with steps to reproduce, expected vs actual behavior, and environment info.