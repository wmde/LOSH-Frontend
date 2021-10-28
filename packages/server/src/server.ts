import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import { dataSources } from "./dataSources";

const PORT = process.env.PORT || 3000;
const app = express();
app.use("*", (cors as any)());
app.use(helmet());
app.use(compression());

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    dataSources: () => dataSources,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, (): void =>
    console.log(`🚀GraphQL-Server is running on http://localhost:3000/graphql`)
  );
};

startServer();
