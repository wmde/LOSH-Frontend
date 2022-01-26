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
    const values = await this.getValuesOfStatementsWithProperty(
      ORGANIZATION_PROPERTY
    );

    return values.map((v) => ({ name: v }));
  }

  private async getValuesOfStatementsWithProperty(
    propertyId: string
  ): Promise<string[]> {
    const query = `
      SELECT DISTINCT ?result
      WHERE
      {
        ?item <${SPARQL_PROPERTY_URI_PREFIX}${propertyId}> ?result .
      }`;

    const { data } = await axios.get<any>(
      `${this.endpointUrl}?query=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/sparql-results+json" } }
    );

    return data.results.bindings.map(
      ({ result }: { result: { value: string } }) => result.value
    );
  }
}
