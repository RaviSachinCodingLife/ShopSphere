"use client";
import { ApolloProvider } from "@apollo/client/react";
import { apollo } from "@/graphql/client";
import { StoreProvider } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <ApolloProvider client={apollo}>{children}</ApolloProvider>
        </StoreProvider>
    );
}
