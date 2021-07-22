import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import Header from "../header";
import site from "../../../gatsby-config";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	const Menu = (): null => null;
	Menu.Item = (): null => null;

	return {
		Layout: {
			Header: (): null => null
		},
		Row: (): null => null,
		Col: (): null => null,
		Menu,
		Typography: {
			Text: (): null => null
		}
	};
});

jest.mock("../../hooks/useWindowSize", () => {
	const useWindowSize = () => ({
		width: 1230,
		height: 0
	});
	return useWindowSize;
});

const pagePadding = {
	paddingLeft: "1rem",
	paddingRight: "1rem"
};

describe("Header", () => {
	it("renders correctly", () => {
		const tree = renderer.render(
			<Header
				headerLinks={site.siteMetadata.headerLinks}
				pagePadding={pagePadding}
			/>
		);
		expect(tree).toMatchSnapshot();
	});
});
