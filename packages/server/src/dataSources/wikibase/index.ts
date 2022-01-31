import { HTTPDataSource } from "apollo-datasource-http";
import axios from "axios";
import { DataValueItem, HardwareData, RawWikibaseData } from "./types";

const WBK = require("wikibase-sdk");

export const DEFAULT_PAGE_SIZE = 10;

export default class WikibaseDataSource extends HTTPDataSource {
  propertyLabels: Record<string, string> | null = null;
  wbk: any;

  constructor(url: string) {
    super(url);
    this.wbk = WBK({
      instance: url,
    });
  }

  async getItems(ids: Array<string>): Promise<HardwareData[]> {
    const getItemsFromWB = async (url: string) => {
      const { data } = await axios.get<any>(url);
      const rawEntities: Record<string, RawWikibaseData> = data.entities;

      const entities = (await Promise.all(
        Object.values(rawEntities).map((e) => this.parseData(e))
      )) as HardwareData[];

      return entities;
    };

    const entitiesUrls = this.wbk.getManyEntities({ ids });
    const requests = entitiesUrls.map(getItemsFromWB);
    const result = (await Promise.all(requests)).flat();

    return result as HardwareData[];
  }

  async getItem(itemId: string): Promise<HardwareData> {
    return await axios
      .get(this.wbk.getEntities([itemId]))
      .then(async (res: any) => await this.parseData(res.data.entities[itemId]))
      .then(async (item) => {
        const promises = Object.entries(item)
          .filter(([_, value]) => value && value.datatype === "wikibase-item")
          .map(async ([key, value]: [string, DataValueItem]) => {
            const id = value.datavalue.value;
            const itemUrl = this.wbk.getEntities([id]);
            const { data } = await axios.get<any>(itemUrl);
            const parsed = await this.parseData(data.entities[id as any]);
            item[key].datavalue.result = parsed;
            return parsed;
          });
        await Promise.all(promises);

        return item;
      });
  }

  private async parseData(entity: RawWikibaseData): Promise<HardwareData> {
    const parsed: HardwareData = {
      id: entity.id,
      name: entity.labels.en?.value,
    };
    const propertyLabels = await this.getPropertyLabels();
    Object.entries(entity.claims).forEach(([propertyId, value]) => {
      parsed[propertyLabels[propertyId]] = value[0].mainsnak;
      if (value[0].mainsnak.datavalue.type === "wikibase-entityid") {
        parsed[propertyLabels[propertyId]].datavalue.value =
          value[0].mainsnak.datavalue.value.id;
      }
    });
    return parsed;
  }

  private async getPropertyLabels(): Promise<Record<string, string>> {
    if (this.propertyLabels !== null) {
      return this.propertyLabels;
    }

    const { body: propertiesPages } = await this.get<any>(
      "/w/api.php?action=query&list=allpages&apnamespace=122&aplimit=max&format=json&origin=*"
    );

    const propertyIDs = propertiesPages.query.allpages.map(
      (p: any) => p.title.split(":")[1]
    );

    const chunkedWbgetentitiesUrls: Array<string> =
      this.wbk.getManyEntities(propertyIDs);

    // requests Property data in chunks of 50(?)
    const propertyDataResponses = await Promise.all(
      chunkedWbgetentitiesUrls.map((url) =>
        this.get(url).then((res: any) => res.body.entities)
      )
    );

    const propertyNames: Record<string, string> = {};
    propertyDataResponses.forEach((response: Record<string, any>) => {
      Object.values(response).forEach((property: any) => {
        propertyNames[property.id] = property.labels.en?.value || property.id;
      });
    });

    this.propertyLabels = propertyNames;
    return this.propertyLabels;
  }
}
