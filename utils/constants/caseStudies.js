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
];
