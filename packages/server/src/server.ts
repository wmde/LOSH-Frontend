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
  // initialize dataSources here so that they don't get created on every request
  const sources = dataSources(
    ELASTIC_API_URL,
    WIKIBASE_API_URL,
    QUERY_SERVICE_URL
  );
  const server = new ApolloServer({
    schema,
    dataSources: () => sources,
    plugins: [responseCachePlugin()],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, (): void => {
    console.log(`Elastic API URL: ${ELASTIC_API_URL}`);
    console.log(`Wikibase API URL: ${WIKIBASE_API_URL}`);
    console.log(`Query Service URL: ${QUERY_SERVICE_URL}`);
    console.log(
      `🚀GraphQL-Server is running on http://localhost:${PORT}/graphql`
    );
  });
};

startServer();
