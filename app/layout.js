import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fast-Cards',
  description: 'Create quick hits of knowledge on any topic or subject matter.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
