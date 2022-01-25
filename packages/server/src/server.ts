import express from "express";
import { ApolloServer } from "apollo-server-express";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import {
  ELASTIC_API_URL,
  PORT,
  QUERY_SERVICE_URL,
  WIKIBASE_API_URL,
} from "./config";
import { dataSources } from "./dataSources";

const app = express();
app.use("*", (cors as any)());
app.use(helmet());
app.use(compression());

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    dataSources: () =>
      dataSources(ELASTIC_API_URL, WIKIBASE_API_URL, QUERY_SERVICE_URL),
    plugins: [responseCachePlugin()],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, (): void =>
    console.log(
      `🚀GraphQL-Server is running on http://localhost:${PORT}/graphql`
    )
  );
};

startServer();
