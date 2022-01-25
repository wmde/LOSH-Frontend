import { DataSource } from "apollo-datasource";
import {
  ORGANIZATION_PROPERTY,
  SPARQL_PROPERTY_URI_PREFIX,
} from "../../config";
import axios from "axios";

export class QueryServiceDataSource extends DataSource {
  private endpointUrl: string;

  constructor(endpointUrl: string) {
    super();

    this.endpointUrl = endpointUrl;
  }

  async getOrganizations(): Promise<{ name: string }[]> {
    const query = `
      SELECT DISTINCT ?org
      WHERE
      {
        ?item <${SPARQL_PROPERTY_URI_PREFIX}${ORGANIZATION_PROPERTY}> ?org .
      }`;

    const { data } = await axios.get<any>(
      `${this.endpointUrl}?query=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/sparql-results+json" } }
    );

    return data.results.bindings.map(({ org }: { org: { value: string } }) => {
      return { name: org.value };
    });
  }
}
