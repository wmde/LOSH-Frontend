import site from "../../../gatsby-config";
// ES6
import Layout from "../layout";
import { useStaticQuery } from "gatsby";
import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	return {
		Layout: {
			Content: (): null => null,
		},
		Grid: {
			useBreakpoint: (): null => null,
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
	useStaticQuery.mockImplementationOnce(() => ({
		site,
	}));
});

describe("Layout", () => {
	it("renders correctly", () => {
		const tree = renderer.render(<Layout></Layout>);
		expect(tree).toMatchSnapshot();
	});
});
