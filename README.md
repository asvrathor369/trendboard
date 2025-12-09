# TrendBoard — Live Trends & Free Tools

This is a static site meant for GitHub Pages. It shows live trends (Reddit, Hacker News), includes several instant creator tools, a quick heuristic check, and community submissions via GitHub Issues.

## Deploy
1. Create a GitHub repo named `trendboard` (or any name).
2. Replace `YOUR_GITHUB_USERNAME` and `trendboard` in `script.js`.
3. Push files to the repo root.
4. In Settings → Pages, choose branch `main` (or `gh-pages`) and root `/`.
5. Wait a minute — your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/<repo>`.

## Notes
- Community submissions use GitHub Issues (public). Users must be signed in to submit.
- Quick Check uses simple heuristics only — not a security scanner.
- All data sources used are public endpoints: Reddit, Hacker News, GitHub API.
