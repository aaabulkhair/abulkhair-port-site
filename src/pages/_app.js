import React, { useContext, useEffect } from 'react';
import { Inter, Fraunces } from 'next/font/google';
import ThemeContextProvider, { ThemeContext } from '../contexts/theme-context';
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

const ThemedWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useGoogleAnalytics();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.backgroundColor = theme.secondary;
      document.body.style.backgroundColor = theme.secondary;
    }
  }, [theme.secondary]);
  return (
    <div className={`${inter.variable} ${fraunces.variable} font-sans`} style={{ backgroundColor: theme.secondary, minHeight: '100vh' }}>
      {children}
    </div>
  );
}

const App = ({ Component, pageProps }) => (
  <ThemeContextProvider>
    <ThemedWrapper>
      <Component {...pageProps} />
    </ThemedWrapper>
  </ThemeContextProvider>
);

export default App;
