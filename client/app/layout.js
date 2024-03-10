import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AssetsFi',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <meta name="theme-color" content="#1A1A1A"></meta> */}
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
