import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Phapp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default App;
