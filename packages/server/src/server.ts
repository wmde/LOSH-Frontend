import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import env from "dotenv";
import ElasticDataSource from "./dataSources/elastic";
import WikibaseDataSource from "./dataSources/wikibase";

env.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use("*", (cors as any)());
app.use(helmet());
app.use(compression());

const ELASTIC_API_URL = process.env.ELASTIC_API_URL || "http://localhost:9200";
const WIKIBASE_API_URL =
  process.env.WIKIBASE_API_URL || "https://losh.ose-germany.de";

const dataSources = {
  elasticAPI: new ElasticDataSource(ELASTIC_API_URL),
  wikibaseAPI: new WikibaseDataSource(WIKIBASE_API_URL),
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
