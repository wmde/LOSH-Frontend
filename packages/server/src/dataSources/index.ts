import ElasticDataSource from "./elastic";
import WikibaseDataSource from "./wikibase";

export const dataSources = (
  ELASTIC_API_URL: string,
  WIKIBASE_API_URL: string
) => {
  console.log(`Elastic API URL: ${ELASTIC_API_URL}`);
  console.log(`Wikibase API URL: ${WIKIBASE_API_URL}`);
  return {
    elasticAPI: new ElasticDataSource(ELASTIC_API_URL),
    wikibaseAPI: new WikibaseDataSource(WIKIBASE_API_URL),
  };
};

export type DataSources = ReturnType<typeof dataSources>;
