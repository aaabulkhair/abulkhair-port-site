import { Html, Head, Main, NextScript } from 'next/document';
import { GoogleAnalyticsScript } from '../components/analytics/google-analytics';

export default function Document() {
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