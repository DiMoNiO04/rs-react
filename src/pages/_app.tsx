import { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import Head from 'next/head';
import ProviderStore from '../providers/providerStore';
import ProviderTheme from '../providers/providerTheme';
import '../styles/globals.css';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ProviderStore>
      <div className={nunito.className}>
        <ProviderTheme>
          <Head>
            <meta name="description" content="App Star Wars Search" />
            <link rel="icon" href="/favicon.ico" />
            <title>Star Wars Search</title>
          </Head>
          <Component {...pageProps} />
        </ProviderTheme>
      </div>
    </ProviderStore>
  );
};

export default MyApp;
