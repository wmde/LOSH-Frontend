import { ApolloError } from "apollo-server-express";
import WikibaseController from "../wikibase";
import { Client } from "@elastic/elasticsearch";
import { generateLicenseQuery } from "../elastic";

const elastic = new Client({ node: "http://127.0.0.1:9200" });
const wikibase = new WikibaseController({ url: "https://losh.ose-germany.de" });

const ServiceResolvers = {
  Query: {
    searchItems: async (_: any, args: any) => {
      const licenseQuery = generateLicenseQuery(args);
      try {
        const query = {
          bool: {
            must: [
              args.query && { match: { text: args.query } },
              {
                match: {
                  statement_keywords:
                    "P1426=https://github.com/OPEN-NEXT/OKH-LOSH/raw/master/OKH-LOSH.ttl#Module",
                },
              },
              {
                bool: {
                  should: licenseQuery,
                },
              },
            ].filter(Boolean),
            should: [],
          },
        };

        console.log(JSON.stringify(query));

        const sort = [{ text: "desc" }];

        const { body } = await elastic.search({
          index: "losh_01_content_first",
          body: {
            from: (args.page - 1) * args.pageSize,
            size: args.pageSize,
            query,
            // sort,
            // _source: ["title"],
          },
        });

        console.log(body.hits.hits[0]);

        const ids = body.hits.hits.map((hit: any) => hit._source.title);

        const items = await wikibase.getItems(ids);

        body.items = items;

        return body;
      } catch (error) {
        throw new ApolloError(error as any);
      }
    },
    getItem: async (_: any, args: any) => {
      try {
        const id = args.id;
        const item = await wikibase.getItem(id);
        console.log(item.hasReadme?.datavalue.result);
        return item;
      } catch (error) {
        throw new ApolloError(error as any);
      }
    },
  },
};

export default ServiceResolvers;
