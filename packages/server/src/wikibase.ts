import axios from "axios";
import WBK from "wikibase-sdk";
import { DataValueItem, HardwareData, RawWikibaseData } from "./types";

export const DEFAULT_PAGE_SIZE = 10;

interface WikibaseControllerProps {
  url: string;
}

export default class WikibaseController {
  url: string;
  properties: Record<string, string> = {};
  wbk: any;

  constructor({ url }: WikibaseControllerProps) {
    this.url = url;
    this.wbk = WBK({
      instance: url,
    });

    this.getProperties();
  }

  async getProperties() {
    const { data: propertiesPages } = await axios.get<any>(
      this.url +
        "/w/api.php?action=query&list=allpages&apnamespace=122&aplimit=max&format=json&origin=*"
    );

    const propertiesQuery = propertiesPages.query.allpages.map(
      (p: any) => p.title.split(":")[1]
    );

    const entitiesUrls: Array<string> =
      this.wbk.getManyEntities(propertiesQuery);

    const entitiesRequests = entitiesUrls.map((url) =>
      axios.get(url).then((res: any) => res.data.entities)
    );
    const entitiesResponse = await Promise.all(entitiesRequests);

    entitiesResponse.map((response: Record<string, any>) => {
      Object.entries(response).map(([key, value]: any) => {
        const label = value.labels.en?.value;
        if (label) this.properties[key] = label;
      });
    });

    return this.properties;
  }

  async getItems(ids: Array<string>): Promise<HardwareData[]> {
    const getItemsFromWB = async (url: string) => {
      const { data } = await axios.get<any>(url);
      const rawEntities: Record<string, RawWikibaseData> = data.entities;

      const entities = Object.values(rawEntities).map((e) =>
        this.parseData(e)
      ) as HardwareData[];

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
      .then((res: any) => this.parseData(res.data.entities[itemId]))
      .then(async (item) => {
        const promises = Object.entries(item)
          .filter(([key, value]) => {
            if (value.datatype === "wikibase-item") return [key, value];
          })
          .map(async ([key, value]: [string, DataValueItem]) => {
            const id = value.datavalue.value;
            const itemUrl = this.wbk.getEntities([id]);
            const { data } = await axios.get<any>(itemUrl);
            const parsed = this.parseData(data.entities[id as any]);
            item[key].datavalue.result = parsed;
            return parsed;
          });
        await Promise.all(promises);

        return item;
      });
  }

  parseData(entity: RawWikibaseData): HardwareData {
    const parsed: HardwareData = {
      id: entity.id,
      name: entity.labels.en?.value,
    };

    Object.entries(entity.claims).forEach(([key, value]) => {
      parsed[this.properties[key]] = value[0].mainsnak;
      if (value[0].mainsnak.datavalue.type === "wikibase-entityid") {
        parsed[this.properties[key]].datavalue.value =
          value[0].mainsnak.datavalue.value.id;
      }
    });
    return parsed;
  }
}
