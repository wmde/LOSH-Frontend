import { gql } from "apollo-server-express";

export const ServiceTypeDefs = gql`
  type ElasticResponseShard {
    total: Int
    successful: Int
    skipped: Int
    failed: Int
  }
  type ElasticResponseHitSource {
    title: String
  }
  type ElasticResponseHit {
    _source: ElasticResponseHitSource
  }
  type ElasticResponseHits {
    total: Int
    max_score: Float
    hits: [ElasticResponseHit]
  }
  type SearchResponse {
    took: Int
    timed_out: Boolean
    items: [ItemResponse]
    hits: ElasticResponseHits
  }
  type Filters {
    certified: Boolean
  }
  type Query {
    searchItems(
      query: String
      page: Int
      pageSize: Int
      license: String
    ): SearchResponse
    getItem(id: String): ItemResponse
  }
  type ItemResponse {
    id: String
    name: String
    identifier: ItemResponseValue
    fileFormat: ItemResponseValue
    outerDimensionsMM: ItemResponseValue
    manufacturingProcess: ItemResponseValue
    material: ItemResponseValue
    licensor: ItemResponseValue
    lastRequested: ItemResponseValue
    lastSeen: ItemResponseValue
    okhv: ItemResponseValue
    test: ItemResponseValue
    fileURL: ItemResponseValue
    image: ItemResponseValue
    source: ItemResponseValue
    relatedTsDC: ItemResponseValue
    export: ItemResponseValue
    release: ItemResponseValue
    organisation: ItemResponseValue
    documentationReadinessLevel: ItemResponseValue
    version: ItemResponseValue
    technologyReadinessLevel: ItemResponseValue
    cpcPatentClass: ItemResponseValue
    timestamp: ItemResponseValue
    repo: ItemResponseValue
    function: ItemResponseValue
    permaURL: ItemResponseValue
    originalURL: ItemResponseValue
    hasReadme: ItemResponseValue
    hasManufacturingInstructions: ItemResponseValue
    hasBoM: ItemResponseValue
    hasUserManual: ItemResponseValue
    versionOf: ItemResponseValue
    hasImage: ItemResponseValue
    contributorCount: ItemResponseValue
    spdxLicense: ItemResponseValue
    hasManifestFile: ItemResponseValue
    hasComponent: ItemResponseValue
    documentationLanguage: ItemResponseValue
    type: ItemResponseValue
  }

  type DataValue {
    value: String
    type: String
    result: ItemResponse
  }

  type ItemResponseValue {
    snaktype: String
    property: String
    hash: String
    type: String
    id: String
    rank: String
    datatype: String
    datavalue: DataValue
  }
`;
