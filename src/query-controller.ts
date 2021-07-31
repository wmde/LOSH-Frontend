import axios from "axios";
import WBK from "wikibase-sdk";

const wbk = WBK({
	instance: "https://wikibase-reconcile-testing.wmcloud.org",
});

export interface Pagination {
	sroffset: number;
	continue: string;
	totalhits: number;
}

export const LIMIT = 10;

export default class QueryController {
	url: string;
	properties: Record<string, string> = {};

	constructor({ url }: { url: string }) {
		this.url = url;
	}

	async getProperties() {
		const { data: propertiesPages } = await axios.get(
			this.url +
				"/w/api.php?action=query&list=allpages&apnamespace=122&aplimit=max&format=json&origin=*"
		);

		const propertiesQuery = propertiesPages.query.allpages.map(
			(p: any) => p.title.split(":")[1]
		);

		const entitiesUrl = wbk.getManyEntities(propertiesQuery);

		const { data: entitiesResponse } = await axios.get(entitiesUrl);

		Object.entries(entitiesResponse.entities).map(([key, value]: any) => {
			this.properties[key] = value.labels.en.value;
		});

		console.log(this.properties);

		return this.properties;
	}

	async getItems({ search, page }: GetItemsProps): Promise<{
		entities: HardwareData[];
		totalHits: number;
	}> {
		let totalHits = 0;

		const offset = (page - 1) * LIMIT;

		const searchUrl = wbk.cirrusSearchPages({
			search: search || "*",
			namespace: 120,
			limit: LIMIT,
			offset,
		});

		return await axios
			.get(searchUrl)
			.then((res) => res.data)
			.then((data) => {
				totalHits = data.query.searchinfo.totalhits;
				return data;
			})
			.then(wbk.parse.wb.pagesTitles)
			.then(async (titles: any) => {
				const ids = titles.map((title: string) => title.split(":")[1]);

				// Get full entities data
				const entitiesUrl = wbk.getEntities({ ids });
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

	async getItem(itemId: string): Promise<any> {
		const { data } = await axios.get(wbk.getEntities([itemId]));
		return data.entities[itemId];
	}

	parseData(entity: RawWikibaseData): HardwareData {
		const parsed: HardwareData = {
			id: entity.id,
			name: entity.labels.en.value,
		};
		Object.entries(entity.claims).forEach(([key, value]) => {
			parsed[this.properties[key]] = value[0].mainsnak.datavalue.value;
		});
		return parsed;
	}
}

interface GetItemsProps {
	search: string;
	page: number;
}

type DataValueString = string;

type DataValueTime = {
	time: string;
	timezone: number;
	before: number;
	after: number;
	precision: number;
	calendarmodel: string;
};
type DataValueItem = {
	"entity-type": string;
	"numeric-id": number;
	id: string;
};

type DataValue = DataValueString | DataValueTime | DataValueItem;

interface RawWikibaseData {
	pageid: number;
	ns: number;
	title: string;
	lastrevid: number;
	modified: string;
	type: string;
	id: string;
	labels: {
		en: {
			language: string;
			value: string;
		};
	};
	descriptions: Record<string, unknown>;
	aliases: Record<string, unknown>;
	claims: Record<
		string,
		Array<{
			mainsnak: {
				snaktype: string;
				property: string;
				hash: string;
				datavalue: {
					value: DataValue;
					type: string;
				};
				datatype: string;
			};
			type: string;
			id: string;
			rank: string;
		}>
	>;
	siteLinks: Record<string, unknown>;
}

export interface HardwareData {
	[key: string]: any;
	id: string;
	name: string;
	contributorCount?: string;
	cpcPatentClass?: string;
	documentationLanguage?: string;
	documentationReadinessLevel?: string;
	export?: string;
	fileFormat?: string;
	fileURL?: string;
	function?: string;
	hasBoM?: string;
	hasComponent?: string;
	hasImage?: string;
	hasManifestFile?: string;
	hasManufacturingInstructions?: string;
	hasReadme?: string;
	hasUserManual?: string;
	identifier?: string;
	image?: string;
	lastRequested?: string;
	lastSeen?: string;
	licensor?: string;
	manufacturingProcess?: string;
	material?: string;
	okhv?: string;
	organisation?: string;
	originalURL?: string;
	outerDimensionsMM?: string;
	permaURL?: string;
	relatedTsDC?: string;
	release?: string;
	repo?: string;
	source?: string;
	spdxLicense?: string;
	technologyReadinessLevel?: string;
	test?: string;
	timestamp?: string;
	type?: string;
	version?: string;
	versionOf?: string;
}
