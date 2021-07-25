import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { useStaticQuery } from "gatsby";
import SEO from "../seo";
import { siteMetadataMock } from "../__mocks__/site-metadata.mock";

const useStaticQueryMock = useStaticQuery as jest.MockedFunction<
	typeof useStaticQuery
>;
const renderer = ShallowRenderer.createRenderer();

beforeEach(() => {
	useStaticQueryMock.mockImplementationOnce(() => ({
		site: {
			siteMetadata: siteMetadataMock,
		},
	}));
});

describe("SEO", () => {
	it("renders the test correctly", () => {
		const tree = renderer.render(<SEO title="All posts" />);

		expect(tree).toMatchSnapshot();
	});
});
