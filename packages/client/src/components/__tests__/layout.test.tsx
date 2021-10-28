import site from "../../../gatsby-config";
import Layout from "../layout";
import { useStaticQuery } from "gatsby";
import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

const useStaticQueryMock = useStaticQuery as jest.MockedFunction<
	typeof useStaticQuery
>;
const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	const Layout = (): null => null;
	Layout.Content = (): null => null;

	return {
		Layout,
		Grid: {
			useBreakpoint: (): unknown => ({}),
		},
	};
});

jest.mock("../header", () => {
	const Header = (): null => null;
	return Header;
});
jest.mock("../footer", () => {
	const Footer = (): null => null;
	return Footer;
});

beforeEach(() => {
	useStaticQueryMock.mockImplementationOnce(() => ({
		site,
	}));
});

describe("Layout", () => {
	it("renders correctly", () => {
		const tree = renderer.render(<Layout></Layout>);
		expect(tree).toMatchSnapshot();
	});
});
