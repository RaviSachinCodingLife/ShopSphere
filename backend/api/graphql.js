import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { resolvers } from "../resolvers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");
const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export default startServerAndCreateNextHandler(server);
