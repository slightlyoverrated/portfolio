import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ishan-university-portfolio.yhcozi.chatgpt.site'),
  title: 'Ishan — Student, Programmer, Builder',
  description: 'An interactive university application portfolio about the projects, interests, and ambitions of Ishan.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hi, I’m Ishan.',
    description: 'Student · Programmer · Builder · Future Engineer',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Hi, I’m Ishan — Student, Programmer, Builder, Future Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hi, I’m Ishan.',
    description: 'Student · Programmer · Builder · Future Engineer',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
