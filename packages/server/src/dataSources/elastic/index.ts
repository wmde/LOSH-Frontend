import { Client } from "@elastic/elasticsearch";
import { LICENSES } from "../../constants";
import { SearchItemsArgs, LicenseValue } from "../../types";
import { ElasticSearchItemsResponse } from "./types";
import { DataSource } from "apollo-datasource";

class ElasticDataSource extends DataSource {
  elastic: Client;

  constructor(url: string) {
    super();
    this.elastic = new Client({ node: url });
  }

  public async searchItems({
    query: search,
    license,
    page,
    pageSize,
  }: SearchItemsArgs): Promise<ElasticSearchItemsResponse> {
    const query = this.generateSearchQuery({ search, license });

    const { body } = await this.elastic.search({
      index: "losh_01_content_first",
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

    const values = LICENSES[license].map(
      (l) => `P1452=https://spdx.org/licenses/${l}`
    );

    return values.map((v) => ({
      match: {
        statement_keywords: v,
      },
    }));
  };

  private generateSearchQuery = ({
    search,
    license,
  }: {
    search: string;
    license: LicenseValue;
  }) => {
    return {
      bool: {
        must: [
          search && this.generateCombinedTermSearch(search),
          {
            match: {
              statement_keywords:
                "P1426=https://github.com/OPEN-NEXT/OKH-LOSH/raw/master/OKH-LOSH.ttl#Module",
            },
          },
          {
            bool: {
              should: this.generateLicenseQuery(license),
            },
          },
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
        query: `P109=*${escapedSearchTerm}*`,
        fields: ["statement_keywords"],
        // Ideally this functional description value should be indexed separately in Elasticsearch so that it can be
        // queried more efficiently as mentioned in the description of #79.
        analyze_wildcard: true,
      },
    };
  }
}

export default ElasticDataSource;
