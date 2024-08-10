import React from 'react';
import { Nunito } from 'next/font/google';
import type { Metadata } from 'next';
import Providers from '../providers/providers';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'Star Wars Search description',
};

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
