import React from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import "@/styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: () => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
