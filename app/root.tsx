import gridLayoutStyles from 'react-grid-layout/css/styles.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import resizableStyles from 'react-resizable/css/styles.css';
import type { MetaFunction } from 'remix';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import { queryClient } from '~/queryClient';
import { GlobalStyle } from '~/theme/global';
import tailwindStyles from './tailwind.css';

export const meta: MetaFunction = () => {
  return { title: 'Elrond NFT Augment' };
};

export function links() {
  return [
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: gridLayoutStyles },
    { rel: 'stylesheet', href: resizableStyles },
  ];
}

export default function App() {
  return (
    <html lang="en" className="h-full bg-slate-800">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700,900&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body className="h-full">
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
