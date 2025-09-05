import React, { useContext, useEffect } from 'react';
import ThemeContextProvider, { ThemeContext } from '../contexts/theme-context';
import '../styles/globals.css';

const ThemedWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.backgroundColor = theme.secondary;
      document.body.style.backgroundColor = theme.secondary;
    }
  }, [theme.secondary]);
  return (
    <div style={{ backgroundColor: theme.secondary, minHeight: '100vh' }}>
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