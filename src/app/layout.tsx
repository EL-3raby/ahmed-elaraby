import type { Metadata } from 'next';
import { Syne, Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono, Inter, Anton } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ThemeScrollManager } from '@/components/providers/ThemeScrollManager';
import { FilmGrainOverlay } from '@/components/chrome/FilmGrainOverlay';
import { CustomMagneticCursor } from '@/components/chrome/CustomMagneticCursor';
import { AnimatedNavFramer } from '@/components/ui/navigation-menu';
import { MobileNavbar } from '@/components/layout/MobileNavbar';
import { CinematicPreloader } from '@/components/chrome/CinematicPreloader';

const fontDisplay = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const fontSerif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
});

const fontSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const fontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const fontAnton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ahmed Elaraby — Full-Stack Creative Engineer & Software Architect',
  description:
    'Portfolio of Ahmed Elaraby. Full-stack software engineering, hybrid cloud SaaS, desktop ERP systems, and high-conversion creative web applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable} ${fontMono.variable} ${fontInter.variable} ${fontAnton.variable} scroll-smooth antialiased`}
      data-theme="paper"
    >
      <body className="min-h-screen flex flex-col font-sans selection:bg-[var(--accent)] selection:text-[#F4F3EF]">
        <CinematicPreloader />
        <SmoothScrollProvider>
          <ThemeScrollManager>
            <FilmGrainOverlay />
            <CustomMagneticCursor />
            <AnimatedNavFramer />
            <MobileNavbar />
            <main className="flex-1 w-full">{children}</main>
          </ThemeScrollManager>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
