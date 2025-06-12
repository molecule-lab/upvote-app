"use client";
import mixpanel from "mixpanel-browser";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    mixpanel.init("849eccbf426abb963a10ffee5ece9e99", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
      batch_size: 2,
      autocapture: {
        pageview: "url-with-path-and-query-string",
        click: true,
        input: true,
        scroll: true,
        submit: true,
        capture_text_content: false,
      },
    });
  });

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
