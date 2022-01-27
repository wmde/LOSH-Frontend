import env from "dotenv";

env.config();

export const WIKIBASE_API_URL =
  process.env.WIKIBASE_API_URL || "https://losh.ose-germany.de";

export const ELASTIC_API_URL =
  process.env.ELASTIC_API_URL || "http://localhost:9200";

export const FUNCTIONAL_DESCRIPTION_PROPERTY =
  process.env.FUNCTIONAL_DESCRIPTION_PROPERTY || "P109";

export const LICENSE_PROPERTY = process.env.LICENSE_PROPERTY || "P1452";

export const TYPE_PROPERTY = process.env.TYPE_PROPERTY || "P1426";

export const ORGANIZATION_PROPERTY = process.env.ORGANIZATION_PROPERTY || "P49";

export const REPO_HOST_PROPERTY = process.env.REPO_HOST_PROPERTY || "P112";

export const PORT = process.env.PORT || 3000;

export const ELASTIC_INDEX =
  process.env.ELASTIC_INDEX || "losh_01_content_first";

export const QUERY_SERVICE_URL =
  process.env.QUERY_SERVICE_URL ||
  "https://losh.ose-germany.de/qs/proxy/wdqs/bigdata/namespace/wdq/sparql";

export const SPARQL_PROPERTY_URI_PREFIX =
  process.env.SPARQL_PROPERTY_URI_PREFIX ||
  "https://losh.ose-germany.de/prop/direct/";
