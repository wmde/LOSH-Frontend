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
				source {
					...DataValue
				}
				organisation {
					...DataValue
				}
				version {
					...DataValue
				}
				repo {
					...DataValue
				}
				spdxLicense {
					...DataValue
				}
				type {
					...DataValue
				}
			}
		}
	}
`;
