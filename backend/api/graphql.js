import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resolvers } from "../resolvers.js";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(join(__dirname, "../schema.graphql"), "utf8");
const JWT_SECRET = "supersecretkey";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export default async function handler(req, res) {
  const lambdaHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventRequestHandler(),
    {
      context: async ({ event }) => {
        const auth = event.headers.authorization || "";
        if (auth.startsWith("Bearer ")) {
          try {
            const token = auth.replace("Bearer ", "");
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = users.find((u) => u.id === decoded.userId);
            return { user };
          } catch (e) {
            return {};
          }
        }
        return {};
      },
    }
  );

  await lambdaHandler(req, res);
}
