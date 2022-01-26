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
    items: [ItemResponse]
    total: Int
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
    organizations: [Organization]
  }
  type Organization @cacheControl(maxAge: 60) {
    name: String
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
    originalUrl: ItemResponseValue
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

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`;
