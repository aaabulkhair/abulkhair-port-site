import React from 'react';
import { Inter, Fraunces } from 'next/font/google';
import ThemeContextProvider from '../contexts/theme-context';
import { MotionProvider } from '../components/ui/motion';
import { useGoogleAnalytics } from '../components/analytics/google-analytics';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Editorial serif accent — used sparingly (quotes, hero name, service heroes).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Page background lives in globals.css (body), so there's no flash before hydration.
const ThemedWrapper = ({ children }) => {
  useGoogleAnalytics();

  return (
    <div className={`${inter.variable} ${fraunces.variable} font-sans min-h-screen`}>
      {children}
    </div>
  );
}

const App = ({ Component, pageProps }) => (
  <ThemeContextProvider>
    <ThemedWrapper>
      <MotionProvider>
        <Component {...pageProps} />
      </MotionProvider>
    </ThemedWrapper>
  </ThemeContextProvider>
);

export default App;
