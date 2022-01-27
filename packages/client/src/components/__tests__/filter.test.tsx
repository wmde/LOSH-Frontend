import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import Filter from "../filter";
const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	const Menu = (): null => null;
	Menu.Item = (): null => null;
	return {
		Menu,
		Dropdown: (): null => null,
		Button: (): null => null,
		message: (): null => null,
		Space: (): null => null,
		Typography: {
			Text: (): null => null,
		},
		Select: (): null => null,
	};
});
jest.mock("@ant-design/icons", () => {
	return {
		DownOutlined: (): null => null,
		UserOutlined: (): null => null,
		CheckOutlined: (): null => null,
	};
});
jest.mock("@apollo/client", () => {
	// This should ideally just use Apollo's MockedProvider:
	// https://www.apollographql.com/docs/react/development-testing/testing/
	// Couldn't get it to work with Snapshots though.
	return {
		useQuery: () => ({
			data: {
				organizations: [],
				repos: [],
			},
		}),
		gql: (): null => null,
	};
});

describe("Filter", () => {
	it("renders correctly", () => {
		const tree = renderer.render(
			<Filter filters={{}} onFilterChange={() => null} />
		);
		expect(tree).toMatchSnapshot();
	});
});
