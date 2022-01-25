import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import ElasticDataSource from "./dataSources/elastic";
import WikibaseDataSource from "./dataSources/wikibase";
import {
  ELASTIC_API_URL,
  PORT,
  QUERY_SERVICE_URL,
  WIKIBASE_API_URL,
} from "./config";
import { QueryServiceDataSource } from "./dataSources/queryService";

const app = express();
app.use("*", (cors as any)());
app.use(helmet());
app.use(compression());

const dataSources = {
  elasticAPI: new ElasticDataSource(ELASTIC_API_URL),
  wikibaseAPI: new WikibaseDataSource(WIKIBASE_API_URL),
  queryService: new QueryServiceDataSource(QUERY_SERVICE_URL),
};

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    dataSources: () => dataSources,
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
