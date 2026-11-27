# Karim-selim

My personal portfolio site. I am a QA engineer (manual and Playwright automation) with a frontend background, and the site is how I show that work: case studies of the projects I tested, the bugs I found, and a downloadable CV.

Live site: https://karim-selim.vercel.app

## What is on the site

- Home page with an animated intro, hero, about, experience (horizontal scroll), skills and a closing section. The theme is dark horror/tarot.
- Case studies at `/case-studies`: Vendure (my Playwright test suite), this website, MOSDEV and Again Please.
- A button to download my CV as a PDF (`public/Karim_Selim_QA_Resume.pdf`).
- Mobile layout, light and dark mode, and its own 404 page.

## Tech stack

Versions from `package-lock.json`:

- Next.js 12.3.4 (pages router) and React 17.0.2
- GSAP 3.12.5 and Framer Motion 6.5.1 for animation
- Styled Components 5.3.11
- hover-effect (WebGL image distortion) and react-intersection-observer
- ESLint 7, Prettier 2, Husky and lint-staged
- Hosted on Vercel

## Requirements

Node.js 22 (`engines` in `package.json` is `22.x`; newer Node versions broke the Vercel build) and npm.

## Run it locally

```bash
git clone https://github.com/karimselim/Karim-selim.git
cd Karim-selim
npm install
npm run dev      # http://localhost:3000
```

Production build: `npm run build`, then `npm start`.

## Environment variables

None. The site does not call any API and needs no secrets.

## Project structure

- `pages/` Next.js routes: home, `case-studies/` and the 404 page
- `components/` UI and animation components
- `context/`, `hooks/`, `utils/` shared state, hooks and constants
- `styles/` global styles
- `public/` images, fonts, videos, the CV PDF, `robots.txt` and `sitemap.xml`

## Code style

ESLint and Prettier. Husky and lint-staged run `eslint --fix` on staged `.js` and `.jsx` files before each commit.

## Tests

This repo has no automated tests. My test work is in separate repos:

- [Vendure-Testing](https://github.com/karimselim/Vendure-Testing): Playwright + TypeScript, UI and API
- [Cofee-Nation](https://github.com/karimselim/Cofee-Nation): Playwright end to end tests with CI

## License

MIT, see `LICENSE`.
