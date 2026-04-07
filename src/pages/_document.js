import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalyticsScript } from '../components/analytics/google-analytics';

export default function Document() {
  // Site is English-only; Arabic i18n routing not implemented
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <GoogleAnalyticsScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}