"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

export const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
