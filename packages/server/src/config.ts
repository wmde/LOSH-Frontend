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
export const PORT = process.env.PORT || 3000;
export const ELASTIC_INDEX =
  process.env.ELASTIC_INDEX || "losh_01_content_first";
