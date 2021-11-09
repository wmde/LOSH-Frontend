import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
	fragment DataValue on ItemResponseValue {
		datavalue {
			type
			value
		}
	}

	query ($query: String, $page: Int, $pageSize: Int, $licenseFilter: String) {
		searchItems(
			query: $query
			page: $page
			pageSize: $pageSize
			license: $licenseFilter
		) {
			total
			items {
				id
				name
				identifier {
					...DataValue
				}
				fileFormat {
					...DataValue
				}
				outerDimensionsMM {
					...DataValue
				}
				manufacturingProcess {
					...DataValue
				}
				material {
					...DataValue
				}
				licensor {
					...DataValue
				}
				lastRequested {
					...DataValue
				}
				lastSeen {
					...DataValue
				}
				okhv {
					...DataValue
				}
				fileURL {
					...DataValue
				}
				image {
					...DataValue
				}
				source {
					...DataValue
				}
				relatedTsDC {
					...DataValue
				}
				export {
					...DataValue
				}
				release {
					...DataValue
				}
				organisation {
					...DataValue
				}
				documentationReadinessLevel {
					...DataValue
				}
				version {
					...DataValue
				}
				technologyReadinessLevel {
					...DataValue
				}
				cpcPatentClass {
					...DataValue
				}
				timestamp {
					...DataValue
				}
				repo {
					...DataValue
				}
				function {
					...DataValue
				}
				permaURL {
					...DataValue
				}
				originalURL {
					...DataValue
				}
				hasReadme {
					...DataValue
				}
				hasManufacturingInstructions {
					...DataValue
				}
				hasBoM {
					...DataValue
				}
				hasUserManual {
					...DataValue
				}
				versionOf {
					...DataValue
				}
				hasImage {
					...DataValue
				}
				contributorCount {
					...DataValue
				}
				spdxLicense {
					...DataValue
				}
				hasManifestFile {
					...DataValue
				}
				hasComponent {
					...DataValue
				}
				documentationLanguage {
					...DataValue
				}
				type {
					...DataValue
				}
			}
		}
	}
`;
