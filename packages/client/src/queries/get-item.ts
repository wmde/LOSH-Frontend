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
						identifier {
							...DataValue
						}
						originalUrl {
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
						identifier {
							...DataValue
						}
						originalUrl {
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
						identifier {
							...DataValue
						}
						originalUrl {
							...DataValue
						}
					}
				}
			}
			versionOf {
				...DataValue
			}
			hasImage {
				datavalue {
					type
					value
					result {
						id
						name
						fileURL {
							...DataValue
						}
						originalUrl {
							...DataValue
						}
					}
				}
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
						identifier {
							...DataValue
						}
						originalUrl {
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
						originalUrl {
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
