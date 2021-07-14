/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable no-unused-vars */
import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import Header from "../header";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	return {
		Layout: {
			Header: () => null
		},
		Row: () => null,
		Col: () => null,
		Menu: () => null,
		Typography: {
			Text: () => null
		}
	};
});

describe("Header", () => {
	it("renders correctly", () => {
		const tree = renderer.render(
			<Header headerLinks={[]} siteTitle="Library of Open Source Hardware" />
		);
		expect(tree).toMatchSnapshot();
	});
});
