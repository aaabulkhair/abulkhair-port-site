import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalyticsScript } from '../components/analytics/google-analytics';

export default function Document() {
  // lang="en" is intentional - i18n routing not yet configured in next.config.js
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