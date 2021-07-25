import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import MarkdownPageTemplate from "../markdown-page";
import { markdownQueryMock } from "../../../__mocks__/markdown-page-query.mock";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	return {
		Typography: {
			Title: (): null => null,
		},
	};
});

jest.mock("../layout", () => {
	const Layout = (): null => null;
	return Layout;
});

jest.mock("../seo", () => {
	const SEO = (): null => null;
	return SEO;
});

describe("Markdown Page", () => {
	it("renders correctly", () => {
		const tree = renderer.render(
			<MarkdownPageTemplate
				data={markdownQueryMock.data}
			></MarkdownPageTemplate>
		);
		expect(tree).toMatchSnapshot();
	});
});
