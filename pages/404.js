import Link from 'next/link';

const NotFound = () => (
  <main
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      textAlign: 'center',
      padding: '0 1.5rem',
    }}
  >
    <h1 style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', margin: 0 }}>404</h1>
    <p style={{ fontSize: '1.4rem', margin: 0 }}>
      This page failed its test. Nothing lives here.
    </p>
    <Link href="/">Back to the site</Link>
  </main>
);

export default NotFound;
