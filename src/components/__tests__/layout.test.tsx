import * as React from "react";
import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import Layout from "../layout";
import site from "../../../gatsby-config";
import { useStaticQuery } from "gatsby";

const renderer = ShallowRenderer.createRenderer();

jest.mock("antd", () => {
	return {
		Layout: {
			Content: (): null => null
		}
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
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	//@ts-ignore
	useStaticQuery.mockImplementationOnce(() => ({
		site
	}));
});

describe("Layout", () => {
	it("renders correctly", () => {
		const tree = renderer.render(<Layout></Layout>);
		expect(tree).toMatchSnapshot();
	});
});
