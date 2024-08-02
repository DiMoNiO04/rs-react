import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ErrorBoundary from '../errors/ErrorBoundary';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'App Star Wars Search',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Provider store={store}>
          <ErrorBoundary>
            <div id="root">{children}</div>
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
