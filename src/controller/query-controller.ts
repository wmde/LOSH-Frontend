import axios from "axios";
import WBK from "wikibase-sdk";
import {
	DataValue,
	DataValueItem,
	HardwareData,
	RawWikibaseData,
} from "./types";

export const LIMIT = 10;

interface QueryControllerProps {
	url: string;
}

export default class QueryController {
	url: string;
	properties: Record<string, string> = {};
	wbk: any;

	constructor({ url }: QueryControllerProps) {
		this.url = url;
		this.wbk = WBK({
			instance: url,
		});
	}

	async getProperties() {
		const { data: propertiesPages } = await axios.get(
			this.url +
				"/w/api.php?action=query&list=allpages&apnamespace=122&aplimit=max&format=json&origin=*"
		);

		const propertiesQuery = propertiesPages.query.allpages.map(
			(p: any) => p.title.split(":")[1]
		);

		const entitiesUrl = this.wbk.getManyEntities(propertiesQuery);

		const { data: entitiesResponse } = await axios.get(entitiesUrl);

		Object.entries(entitiesResponse.entities).map(([key, value]: any) => {
			this.properties[key] = value.labels.en.value;
		});

		console.log(this.properties);

		return this.properties;
	}

	async getItems({ search, page }: { search: string; page: number }): Promise<{
		entities: HardwareData[];
		totalHits: number;
	}> {
		let totalHits = 0;

		const offset = (page - 1) * LIMIT;

		const searchUrl = this.wbk.cirrusSearchPages({
			search: search || "*",
			namespace: 120,
			limit: LIMIT,
			offset,
			// haswbstatement: 'P58=Q14'
		});

		return await axios
			.get(searchUrl)
			.then((res) => res.data)
			.then((data) => {
				totalHits = data.query.searchinfo.totalhits;
				return data;
			})
			.then(this.wbk.parse.wb.pagesTitles)
			.then(async (titles: any) => {
				const ids = titles.map((title: string) => title.split(":")[1]);

				if (!titles.length) {
					return {
						entities: [],
						totalHits: 0,
					};
				}

				// Get full entities data
				const entitiesUrl = this.wbk.getEntities({ ids });
				const { data } = await axios.get(entitiesUrl);
				const rawEntities: Record<string, RawWikibaseData> = data.entities;

				const result = {
					entities: Object.values(rawEntities).map((e) =>
						this.parseData(e)
					) as HardwareData[],
					totalHits,
				};
				return result;
			});
	}

	async getItem(itemId: string): Promise<HardwareData> {
		return await axios
			.get(this.wbk.getEntities([itemId]))
			.then((res) => this.parseData(res.data.entities[itemId]))
			.then(async (item) => {
				const promises = Object.entries(item)
					.filter(([key, value]) => {
						if (value.datatype === "wikibase-item") return [key, value];
					})
					.map(async ([key, value]: [string, DataValueItem]) => {
						const id = value.datavalue.value.id;
						const itemUrl = this.wbk.getEntities([id]);
						const { data } = await axios.get(itemUrl);
						const parsed = this.parseData(data.entities[id]);
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
			name: entity.labels.en.value,
		};
		Object.entries(entity.claims).forEach(([key, value]) => {
			parsed[this.properties[key]] = value[0].mainsnak;
		});
		return parsed;
	}
}
