"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apollo } from "@/graphql/client";
import { StoreProvider } from "@/store";
import { FC } from "react";
import { ProvidersProps } from "./type";



const Providers: FC<ProvidersProps> = ({ children }) => (
    <StoreProvider>
        <ApolloProvider client={apollo}>{children}</ApolloProvider>
    </StoreProvider>
);

export default Providers;
