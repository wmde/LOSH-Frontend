import { ApolloError } from "apollo-server-express";
import { DataSources } from "../dataSources";
import { GetItemsArgs, SearchItemsArgs } from "../types";

const ServiceResolvers = {
  Query: {
    searchItems: async (
      _: never,
      args: SearchItemsArgs,
      { dataSources }: { dataSources: DataSources }
    ) => {
      try {
        const { total, ids } = await dataSources.elasticAPI.searchItems(args);

        const items = await dataSources.wikibaseAPI.getItems(ids);

        const response = {
          items,
          total,
        };

        return response;
      } catch (error) {
        throw new ApolloError(error as any);
      }
    },
    getItem: async (
      _: never,
      { id }: GetItemsArgs,
      { dataSources }: { dataSources: DataSources }
    ) => {
      try {
        return await dataSources.wikibaseAPI.getItem(id);
      } catch (error) {
        throw new ApolloError(error as any);
      }
    },

    async organizations(
      _: never,
      _args: never,
      { dataSources }: { dataSources: DataSources }
    ): Promise<{ name: string }[]> {
      return dataSources.queryService.getOrganizations();
    },

    async repos(
      _: never,
      _args: never,
      { dataSources }: { dataSources: DataSources }
    ): Promise<{ host: string }[]> {
      return dataSources.queryService.getRepos();
    },
  },
};

export default ServiceResolvers;
