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
        <body className={inter.className}>
          <Script id='facebook-pixel' strategy='afterInteractive'>
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '813537817356776');
            fbq('track', 'PageView');
          `}
          </Script>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
