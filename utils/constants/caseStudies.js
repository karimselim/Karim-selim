// Case studies are plain data. Every study uses the same five blocks so a
// reader can scan the QA thinking in a minute: problem, what was tested,
// tools, result, evidence. Only put facts here that can be checked.
export default [
  {
    slug: 'vendure',
    title: 'Vendure storefront',
    kind: 'QA automation',
    summary: 'UI and API test suite for an e-commerce storefront.',
    problem:
      'An online store has to keep working while it changes: browsing, sorting, product pages, accounts and the cart. Checking that by hand after every change is slow, so I built an automated suite that covers each flow at the UI level and at the API level.',
    tested: [
      'Products: listing, sorting in both directions, navigation to a product page (including boundary values).',
      'Consistency: the product card and the product details page must show the same data.',
      'Data quality: an API check that reports which products are missing required fields.',
      'Accounts: sign up, login, forgot password and a saved login session, at UI and API level.',
      'Cart: empty-cart check and adding a product (in progress).',
    ],
    tools: [
      'Playwright',
      'TypeScript',
      'Page Object Model',
      'Typed API clients',
      'Fixtures',
      'GitHub Actions',
    ],
    result: [
      { value: '14', label: 'spec files: 8 UI, 6 API' },
      { value: '6', label: 'page objects' },
      { value: '5', label: 'typed API clients' },
      { value: '1', label: 'CI workflow with an HTML report artifact' },
    ],
    resultNote:
      'The CI workflow runs on every push and pull request. It still needs a live storefront to run against, so cart and payment tests and a green CI run are the next steps.',
    // Bugs found while testing. Filled from the author's own list, never guessed.
    bugs: [],
    evidence: [
      {
        label: 'Repository',
        href: 'https://github.com/karimselim/Vendure-Testing',
      },
      {
        label: 'UI tests',
        href: 'https://github.com/karimselim/Vendure-Testing/tree/main/tests/ui',
      },
      {
        label: 'API tests',
        href: 'https://github.com/karimselim/Vendure-Testing/tree/main/tests/api',
      },
      {
        label: 'CI workflow',
        href:
          'https://github.com/karimselim/Vendure-Testing/blob/main/.github/workflows/playwright.yml',
      },
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'This website',
    kind: 'QA of a real product',
    summary:
      'I built this portfolio, then tested it like any other product: scanned it, logged what was broken or slow, fixed it and measured again.',
    problem:
      'The site is heavy on animation, video and WebGL. That made it striking, and also fragile: it lagged on first load, hid content in some states, and the build failed on the hosting platform. Every issue was recorded, fixed in its own commit and re-checked.',
    tested: [
      'Load and runtime performance: hero video, WebGL scenes, image sizes, cursor and resize handling.',
      'Behaviour: cursor states, loader, section transitions, Before You Go animation, footer and menu clicks.',
      'Accessibility: page title, language, landmarks, focus outlines, tab order.',
      'SEO and sharing: meta description, Open Graph, canonical, robots, sitemap, 404 page.',
      'Content against the CV: dates, job titles, links and numbers.',
      'Deployment: build on the hosting platform.',
    ],
    tools: [
      'Lighthouse',
      'Headless Chrome',
      'Git (one commit per fix)',
      'Vercel previews',
      'Next.js',
      'GSAP',
    ],
    result: [
      { value: '77', label: 'commits in two days, one per change' },
      { value: '32', label: 'fix and performance commits' },
      { value: '100', label: 'Lighthouse on desktop: performance, accessibility, best practices, SEO' },
      { value: '90', label: 'Lighthouse mobile performance (LCP 3.2s is the open item)' },
    ],
    resultNote:
      'Mobile is the next stage: LCP on mobile, about 121 KiB of unused JavaScript and the mobile layout are still open.',
    bugs: [
      { title: 'Hero lagged right after load', detail: 'Five videos loaded at once. Now one at a time, hero first, with a poster, paused off screen. Hero video went from 790 KB to 70 KB.' },
      { title: 'Footer links could not be clicked', detail: 'The bottom bar was marked inert by an earlier accessibility change. Only the hidden top bar is inert now.' },
      { title: 'Build failed on Vercel', detail: 'An open Node version range picked Node 26. Pinned to Node 22.' },
      { title: 'Before You Go: stacked star loops, text could stay hidden', detail: 'Stopped the stacked loops and the text is never left hidden.' },
      { title: 'Custom cursor wrong at start and stale without mouse movement', detail: 'Closed circle by default, updates on load and on scroll, no 150 ms polling.' },
      { title: 'Experience textures were 6000 to 7360 px wide', detail: 'Downscaled to 1200 px and created only near the viewport.' },
      { title: 'Skills cards were 1024 by 1536 px each, 21 decoded on entry', detail: 'Downscaled to 480 px and removed blur while they fly in.' },
      { title: 'Section transition from Experience to Skills was not smooth', detail: 'Linear easing and a single start point.' },
      { title: 'Title shifted after it appeared', detail: 'Animation starts after fonts load.' },
      { title: 'Skills card said FRONT-END DEVELOPER, CI/CD icon was wrong', detail: 'Card back says QA AUTOMATION and the icon matches.' },
      { title: 'Missing page title, language, main landmark and focus outlines', detail: 'Added. Footer bar out of tab order while hidden.' },
      { title: 'No canonical, robots, sitemap, social tags or 404', detail: 'Added all of them.' },
      { title: 'Content did not match the CV', detail: 'Dates, titles, LinkedIn link and 99Bridges numbers (300+ bugs, 85% fewer production incidents) taken from the CV.' },
      { title: 'Footer copyright year fixed, phone shown without +', detail: 'Uses the current year and the full international number.' },
      { title: 'Light mode: bottom-left test log was invisible', detail: 'Shown again and made readable on white.' },
      { title: 'Mobile viewport height jumped with the browser bar', detail: 'Added 100svh after each 100vh and ignored address bar resizes.' },
    ],
    evidence: [
      {
        label: 'Repository',
        href: 'https://github.com/karimselim/Karim-selim',
      },
      {
        label: 'Commit history',
        href: 'https://github.com/karimselim/Karim-selim/commits/main',
      },
      { label: 'Live site', href: 'https://karim-selim.vercel.app/' },
    ],
  },
];
