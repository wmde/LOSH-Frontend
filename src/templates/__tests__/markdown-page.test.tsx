import * as React from "react";
import { useStaticQuery } from "gatsby";
import ShallowRenderer from "react-test-renderer/shallow";
import Template from "../markdown-page";
import { markdownQuery } from "../__mocks__/markdown-page-query.mock";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	return {
		Typography: {
			Title: (): null => null,
		},
	};
});

jest.mock("../../components/layout", () => {
	const Layout = (): null => null;
	return Layout;
});

jest.mock("../../components/seo", () => {
	const SEO = (): null => null;
	return SEO;
});

describe("Markdown Page", () => {
	it("renders correctly", () => {
		const tree = renderer.render(
			<Template data={markdownQuery.data}></Template>
		);
		expect(tree).toMatchSnapshot();
	});
});
