"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mixpanel from "mixpanel-browser";

export default function ReactQueryProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    mixpanel.init("eec60cf0c7448236478fb7bb2de0c0e7", {
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
        capture_text_content: true,
      },
    });
  });

  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
