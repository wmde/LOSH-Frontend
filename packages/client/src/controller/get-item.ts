import { gql } from "@apollo/client";

export const GET_ITEM = gql`
	fragment DataValue on ItemResponseValue {
		datavalue {
			type
			value
		}
	}

	query ($id: String) {
		getItem(id: $id) {
			id
			name
			identifier {
				...DataValue
			}
			outerDimensionsMM {
				...DataValue
			}
			licensor {
				...DataValue
			}
			source {
				...DataValue
			}
			relatedTsDC {
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
			hasReadme {
				datavalue {
					type
					value
					result {
						id
						name
						originalURL {
							...DataValue
						}
					}
				}
			}
			hasManufacturingInstructions {
				datavalue {
					type
					value
					result {
						id
						name
						originalURL {
							...DataValue
						}
					}
				}
			}
			hasBoM {
				...DataValue
			}
			hasUserManual {
				datavalue {
					type
					value
					result {
						id
						name
						originalURL {
							...DataValue
						}
					}
				}
			}
			versionOf {
				...DataValue
			}
			hasImage {
				...DataValue
			}
			spdxLicense {
				...DataValue
			}
			hasManifestFile {
				datavalue {
					type
					value
					result {
						id
						name
						originalURL {
							...DataValue
						}
					}
				}
			}
			hasComponent {
				datavalue {
					type
					value
					result {
						id
						name
						originalURL {
							...DataValue
						}
					}
				}
			}
			documentationLanguage {
				...DataValue
			}
			type {
				...DataValue
			}
		}
	}
`;
