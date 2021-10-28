import ElasticDataSource from "./elastic";
import WikibaseDataSource from "./wikibase";

export const dataSources = {
  elasticAPI: new ElasticDataSource("http://localhost:9200"),
  wikibaseAPI: new WikibaseDataSource("https://losh.ose-germany.de"),
};

export type DataSources = typeof dataSources;
