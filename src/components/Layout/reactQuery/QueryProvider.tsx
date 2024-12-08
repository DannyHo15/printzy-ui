// app/providers.jsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  queryClient.setDefaultOptions({
    queries: {
      retry: 1,
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
