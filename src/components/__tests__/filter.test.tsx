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
	};
});
jest.mock("@ant-design/icons", () => {
	return {
		DownOutlined: (): null => null,
		UserOutlined: (): null => null,
		CheckOutlined: (): null => null,
	};
});

describe("Filter", () => {
	it("renders correctly", () => {
		const tree = renderer.render(<Filter />);
		expect(tree).toMatchSnapshot();
	});
});
