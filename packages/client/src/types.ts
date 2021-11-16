type PropertyValue = {
	snaktype: string;
	property: string;
	hash: string;
	type: string;
	id: string;
	rank: string;
};

export type DataValueString = {
	datatype: "string";
	datavalue: {
		value: string;
		type: string;
	};
} & PropertyValue;

export type DataValueURL = {
	datatype: "url";
	datavalue: {
		value: string;
		type: string;
	};
} & PropertyValue;

export type DataValueTime = {
	datavalue: {
		value: {
			time: string;
			timezone: number;
			before: number;
			after: number;
			precision: number;
			calendarmodel: string;
		};
		type: string;
	};
	datatype: "time";
} & PropertyValue;

export type DataValueItem = {
	datavalue: {
		value: {
			"entity-type": string;
			"numeric-id": number;
			id: string;
		};
		type: string;
		result: HardwareData;
	};
	datatype: "wikibase-item";
} & PropertyValue;

export type DataValue =
	| DataValueTime
	| DataValueItem
	| DataValueString
	| DataValueURL;

export interface RawWikibaseData {
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
	contributorCount?: DataValue;
	cpcPatentClass?: DataValueString;
	documentationLanguage?: DataValue;
	documentationReadinessLevel?: DataValueString;
	export?: DataValue;
	fileFormat?: DataValue;
	fileURL?: DataValueString;
	function?: DataValueString;
	hasBoM?: DataValue;
	hasComponent?: DataValueItem;
	hasImage?: DataValue;
	hasManifestFile?: DataValueItem;
	hasManufacturingInstructions?: DataValueItem;
	hasReadme?: DataValueItem;
	hasUserManual?: DataValueItem;
	identifier?: DataValueString;
	image?: DataValue;
	lastRequested?: DataValue;
	lastSeen?: DataValue;
	licensor?: DataValueString;
	manufacturingProcess?: DataValue;
	material?: DataValue;
	okhv?: DataValue;
	organisation?: DataValueString;
	originalUrl?: DataValueString;
	outerDimensionsMM?: DataValueString;
	permaURL?: DataValue;
	relatedTsDC?: DataValueURL;
	release?: DataValue;
	repo?: DataValueString;
	source?: DataValue;
	spdxLicense?: DataValueString;
	technologyReadinessLevel?: DataValueString;
	test?: DataValue;
	timestamp?: DataValueString;
	type?: DataValue;
	version?: DataValueString;
	versionOf?: DataValue;
}
