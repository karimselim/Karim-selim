// Case studies are plain data. Every study uses the same five blocks so a
// reader can scan the QA thinking in a minute: problem, what was tested,
// tools, result, evidence. Only put facts here that can be checked.
export default [
  {
    slug: 'vendure',
    title: 'Vendure storefront',
    kind: 'QA automation',
    highlights: ['26 tests passing in CI', '15 bugs logged'],
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
      { value: '26', label: 'tests in the latest CI run, all passing (3 on retry)' },
      { value: '15', label: 'bugs logged in the shop' },
    ],
    resultNote:
      'The CI workflow starts a fresh Vendure shop with my storefront, seeds a test user and runs the whole suite in a real browser. The latest run on the CI branch passed all 26 tests, 3 of them on a retry (the login-related ones, which are slow on the first try). That branch is not merged into main yet. Along the way I also logged 15 bugs in the shop: 1 Critical, 4 High, 4 Medium and 6 Low.',
    // Bugs found while testing. Filled from the author's own list, never guessed.
    bugs: [
      { severity: 'High', priority: 'P1', area: 'Validation', title: 'Same email can sign up many times', detail: 'Signup accepts the same email address repeatedly.' },
      { severity: 'High', priority: 'P2', area: 'Validation', title: 'Validation problems across the whole application', detail: 'Fields across the application, not only the storefront, have validation problems.' },
      { severity: 'High', priority: 'P1', area: 'Validation', title: 'Password of 8 spaces accepted', detail: 'Passwords made of spaces and similar odd values are accepted.' },
      { severity: 'Medium', priority: 'P3', area: 'UX', title: 'Signup does not show required fields', detail: 'Forms, especially signup, do not mark which fields are required.' },
      { severity: 'Critical', priority: 'P1', area: 'API', title: 'Login works without a password in API testing', detail: 'The login call succeeded without a password in API testing.' },
      { severity: 'High', priority: 'P1', area: 'API', title: 'Fields documented as required can be skipped', detail: 'Many fields documented as required can be submitted without them, like the password.' },
      { severity: 'Low', priority: 'P3', area: 'UX', title: 'Three home buttons do the same thing', detail: 'Shop Now, View Collections and Products all route to the products page.' },
      { severity: 'Medium', priority: 'P3', area: 'API', title: 'No price sort option in API testing', detail: 'The API offers no way to sort products by price.' },
      { severity: 'Low', priority: 'P3', area: 'API', title: 'Description returned with HTML tags', detail: 'Product and product details responses return the description wrapped in HTML tags.' },
      { severity: 'Low', priority: 'P3', area: 'API', title: 'Price returned with two extra zeros', detail: 'A price of 15 comes back as 1500. The UI shows 15.00 but the API response has no decimal.' },
      { severity: 'Medium', priority: 'P2', area: 'UX', title: 'Search cannot be reset', detail: 'Search needs a term then Enter. To see all products again you must go back to the products page.' },
      { severity: 'Low', priority: 'P3', area: 'UX', title: 'Empty cart sends users to home', detail: 'Continue shopping on the empty cart page goes to the home page instead of the products page.' },
      { severity: 'Medium', priority: 'P2', area: 'Behaviour', title: 'Add to cart works again during the success message', detail: 'While the success message shows, clicking the button again adds the product to the cart again.' },
      { severity: 'Low', priority: 'P3', area: 'UI', title: 'Slider arrows only clickable at the bottom', detail: 'The image slider arrows respond only when the bottom part is clicked, not the whole arrow.' },
      { severity: 'Low', priority: 'P3', area: 'UI', title: 'Sign out button does not fill its space', detail: 'The sign out button does not fill the space intended for it.' },
    ],
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
          'https://github.com/karimselim/Vendure-Testing/blob/ci/run-against-vendure/.github/workflows/playwright.yml',
      },
    ],
  },
  {
    slug: 'portfolio-website',
    title: 'This website',
    kind: 'QA of a real product',
    highlights: ['Lighthouse 99 to 100 on desktop', '77 commits, one per change'],
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
    // Before and after, measured on this site. Headless browser numbers, so
    // real devices differ.
    compare: [
      { label: 'public/ folder', before: 19.8, after: 2.0, beforeText: '19.8 MB', afterText: '2.0 MB' },
      { label: 'Hero video', before: 1114, after: 72, beforeText: '1.11 MB', afterText: '70 KB' },
      { label: 'Skills section, idle frame rate', before: 43, after: 60, beforeText: '43 fps', afterText: '60 fps' },
      { label: 'Lighthouse accessibility, desktop', before: 94, after: 100, beforeText: '94', afterText: '100' },
    ],
    bugs: [
      { severity: 'High', area: 'Performance', title: 'Hero lagged right after load', detail: 'Five videos loaded at once. Now one at a time, hero first, with a poster, paused off screen. Hero video went from 1.11 MB to 70 KB.' },
      { severity: 'High', area: 'Behaviour', title: 'Footer links could not be clicked', detail: 'The bottom bar was marked inert by an earlier accessibility change. Only the hidden top bar is inert now.' },
      { severity: 'High', area: 'Deployment', title: 'Build failed on Vercel', detail: 'An open Node version range picked Node 26. Pinned to Node 22.' },
      { severity: 'High', area: 'Behaviour', title: 'Before You Go: stacked star loops, text could stay hidden', detail: 'Stopped the stacked loops and the text is never left hidden.' },
      { severity: 'Medium', area: 'Behaviour', title: 'Custom cursor wrong at start and stale without mouse movement', detail: 'Closed circle by default, updates on load and on scroll, no 150 ms polling.' },
      { severity: 'Medium', area: 'Performance', title: 'Experience textures were 6000 to 7360 px wide', detail: 'Downscaled to 1200 px and created only near the viewport.' },
      { severity: 'Medium', area: 'Performance', title: 'Skills cards were 1024 by 1536 px each, 21 decoded on entry', detail: 'Downscaled to 480 px and removed blur while they fly in.' },
      { severity: 'Medium', area: 'Behaviour', title: 'Section transition from Experience to Skills was not smooth', detail: 'Linear easing and a single start point.' },
      { severity: 'Low', area: 'Behaviour', title: 'Title shifted after it appeared', detail: 'Animation starts after fonts load.' },
      { severity: 'Low', area: 'Content', title: 'Skills card said FRONT-END DEVELOPER, CI/CD icon was wrong', detail: 'Card back says QA AUTOMATION and the icon matches.' },
      { severity: 'Medium', area: 'Accessibility', title: 'Missing page title, language, main landmark and focus outlines', detail: 'Added. Footer bar out of tab order while hidden.' },
      { severity: 'Low', area: 'SEO', title: 'No canonical, robots, sitemap, social tags or 404', detail: 'Added all of them.' },
      { severity: 'Medium', area: 'Content', title: 'Content did not match the CV', detail: 'Dates, titles, LinkedIn link and 99Bridges numbers (300+ bugs, 85% fewer production incidents) taken from the CV.' },
      { severity: 'Low', area: 'Content', title: 'Footer copyright year fixed, phone shown without +', detail: 'Uses the current year and the full international number.' },
      { severity: 'Low', area: 'Behaviour', title: 'Light mode: bottom-left test log was invisible', detail: 'Shown again and made readable on white.' },
      { severity: 'Medium', area: 'Behaviour', title: 'Mobile viewport height jumped with the browser bar', detail: 'Added 100svh after each 100vh and ignored address bar resizes.' },
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
  {
    slug: 'mosdev',
    title: 'MOSDEV admin dashboard',
    kind: 'QA of a real product',
    highlights: ['Sole tester', '300+ bugs across both products'],
    summary:
      'Quality for the admin dashboard of a company in the UAE, where I was the only tester.',
    problem:
      'MOSDEV is the admin dashboard of a company in the UAE. Staff use it to create products, assets and users, manage location information, scan many products at once, handle invoices and more. I was the only tester in the company and owned quality for it, and I took part in management meetings with the operations manager, the head of engineering and the CEO.',
    tested: [
      'Creating products, assets and users, and the forms behind them.',
      'Location information.',
      'Scanning many products.',
      'Invoices.',
      'Dashboard figures and the data returned by the backend.',
    ],
    tools: ['Jira'],
    result: [
      { value: '300+', label: 'bugs reported across MOSDEV and Again Please' },
      { value: '390+', label: 'test cases recorded across MOSDEV and Again Please' },
    ],
    resultNote:
      'The dashboard is a private tool behind a login, so there is no public link. Names, addresses and ticket numbers are left out on purpose.',
    hideChart: true,
    bugsTitle: 'A selection of the bugs I reported',
    bugsNote:
      'Five examples chosen to show the range. Not the full list.',
    bugs: [
      { area: 'Data', title: 'Zip/Postal Code field is missing in the returned brand data' },
      { area: 'UI', title: 'Inconsistent modal action button label between Profile, Brands, and Locations' },
      { area: 'Validation', title: 'Max. Packing Capacity field is expected to be required but the form allows submission without it' },
      { area: 'Validation', title: 'Max Capacity field allows the value 0 in the Assets creation form' },
      { area: 'Data', title: 'Dashboard info icon fetches data using the wrong date range (queries from April 2023 instead of Today)' },
    ],
    evidence: [],
  },
  {
    slug: 'again-please',
    title: 'Again Please consumer site',
    kind: 'QA of a real product',
    highlights: ['Sole tester', '390+ test cases across both products'],
    summary:
      'Quality for a consumer site where people scan cups, return them and get rewarded. I was the only tester.',
    problem:
      'Again Please is the consumer site of a company in the UAE. People scan cups, return them and are rewarded for it. I was the only tester in the company and owned quality for it, next to the admin dashboard, and I took part in management meetings with the operations manager, the head of engineering and the CEO.',
    tested: [
      'Scanning cups and counting each scan once.',
      'Signup, login and the instant reward.',
      'Phone number entry.',
      'The wallet screen and the pull-up slider.',
      'Layout and styling against the design.',
    ],
    tools: ['Jira'],
    result: [
      { value: '300+', label: 'bugs reported across MOSDEV and Again Please' },
      { value: '390+', label: 'test cases recorded across MOSDEV and Again Please' },
    ],
    resultNote:
      'The staging site is not public, so there is no link. Names, addresses and ticket numbers are left out on purpose.',
    hideChart: true,
    bugsTitle: 'A selection of the bugs I reported',
    bugsNote: 'Six examples chosen to show the range. Not the full list.',
    bugs: [
      { area: 'Behaviour', title: 'Duplicate scan counting and UI layout issues affecting accuracy and user experience' },
      { area: 'UI', title: 'Pull-up slider intermittently freezes and the top shadow styling is missing' },
      { area: 'UI', title: 'Wallet UI does not match the Apple Wallet-style design and card content is partially hidden' },
      { area: 'Behaviour', title: 'Instant reward is displayed multiple times instead of only once on signup' },
      { area: 'Behaviour', title: 'User can scan additional cups while already logged in' },
      { area: 'Validation', title: 'Phone number is accepted with an empty country code' },
    ],
    evidence: [],
  },
];
