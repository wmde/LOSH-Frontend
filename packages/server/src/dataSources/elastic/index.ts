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
          search && { match: { text: search } },
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
}

export default ElasticDataSource;
