import ElasticDataSource from "./elastic";
import WikibaseDataSource from "./wikibase";
import { QueryServiceDataSource } from "./queryService";

export const dataSources = (
  ELASTIC_API_URL: string,
  WIKIBASE_API_URL: string,
  QUERY_SERVICE_URL: string
) => {
  return {
    elasticAPI: new ElasticDataSource(ELASTIC_API_URL),
    wikibaseAPI: new WikibaseDataSource(WIKIBASE_API_URL),
    queryService: new QueryServiceDataSource(QUERY_SERVICE_URL),
  };
};

export type DataSources = ReturnType<typeof dataSources>;
