import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../resolvers.js";
import { gql } from "graphql-tag";
import schemaString from "../schema.graphql?raw"; // <- Vercel-friendly

const typeDefs = gql`
  ${schemaString}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export default startServerAndCreateNextHandler(server);
