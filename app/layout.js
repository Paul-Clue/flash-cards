import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fast-Cards',
  description: 'Create quick hits of knowledge on any topic or subject matter.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <Head>
          <title>Fast-Cards</title>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='Create quick hits of knowledge on any topic or subject matter.'
          />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
