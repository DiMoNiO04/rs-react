import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'App Star Wars Search',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
