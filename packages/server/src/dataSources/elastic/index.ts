import { Client } from "@elastic/elasticsearch";
import { LICENSES } from "../../constants";
import { SearchItemsArgs, LicenseValue } from "../../types";
import { ElasticSearchItemsResponse } from "./types";
import { DataSource } from "apollo-datasource";
import {
  ELASTIC_INDEX,
  FUNCTIONAL_DESCRIPTION_PROPERTY,
  LICENSE_PROPERTY,
  ORGANIZATION_PROPERTY,
  TYPE_PROPERTY,
} from "../../config";

class ElasticDataSource extends DataSource {
  elastic: Client;

  constructor(url: string) {
    super();
    this.elastic = new Client({ node: url });
  }

  public async searchItems({
    query: search,
    license,
    organization,
    page,
    pageSize,
  }: SearchItemsArgs): Promise<ElasticSearchItemsResponse> {
    const query = this.generateSearchQuery({ search, license, organization });
    const { body } = await this.elastic.search({
      index: ELASTIC_INDEX,
      body: {
        from: (page - 1) * pageSize,
        size: pageSize,
        query,
        _source: ["title"],
      },
    });

    const ids = body.hits.hits.map((hit: any) => hit._source.title);

    const total = body.hits.total;

    return { total, ids };
  }

  private generateLicenseQuery = (license: LicenseValue) => {
    if (!license) {
      return [];
    }

    return {
      bool: {
        should: LICENSES[license].map((l) =>
          this.generateExactPropertyValueMatchQuery(
            LICENSE_PROPERTY,
            `https://spdx.org/licenses/${l}`
          )
        ),
      },
    };
  };

  private generateSearchQuery = ({
    search,
    license,
    organization,
  }: {
    search: string;
    license: LicenseValue;
    organization: string;
  }) => {
    return {
      bool: {
        must: [
          search && this.generateCombinedTermSearch(search),
          this.generateExactPropertyValueMatchQuery(
            TYPE_PROPERTY,
            "https://github.com/OPEN-NEXT/OKH-LOSH/raw/master/OKH-LOSH.ttl#Module"
          ),
          license && this.generateLicenseQuery(license),
          organization &&
            this.generateExactPropertyValueMatchQuery(
              ORGANIZATION_PROPERTY,
              organization
            ),
        ].filter(Boolean),
      },
    };
  };

  private generateCombinedTermSearch(searchTerm: string) {
    return {
      bool: {
        should: [
          this.generateEntityTermsSearch(searchTerm),
          this.generateFunctionalDescriptionValueSearch(searchTerm),
        ],
        minimum_should_match: 1,
      },
    };
  }

  private generateEntityTermsSearch(searchTerm: string) {
    return { match: { text: { query: searchTerm, fuzziness: "AUTO" } } };
  }

  private generateFunctionalDescriptionValueSearch(searchTerm: string) {
    // Escaping special chars per https://discuss.elastic.co/t/how-to-properly-escape-special-characters/6793
    const escapedSearchTerm = searchTerm
      .replace(/([!*+&|()[\]{}^~?:"/])/g, "\\$1")
      .replace(/ /g, "\\ "); // also escape spaces to treat terms as a unit for this search

    return {
      query_string: {
        query: `${FUNCTIONAL_DESCRIPTION_PROPERTY}=*${escapedSearchTerm}*`,
        fields: ["statement_keywords"],
        // Ideally this functional description value should be indexed separately in Elasticsearch so that it can be
        // queried more efficiently as mentioned in the description of #79.
        analyze_wildcard: true,
      },
    };
  }

  private generateExactPropertyValueMatchQuery(
    propertyId: string,
    value: string
  ) {
    return {
      match: {
        statement_keywords: `${propertyId}=${value}`,
      },
    };
  }
}

export default ElasticDataSource;
