import * as React from "react";
import { Link } from "gatsby";
import {
	Row,
	Col,
	Layout as AntdLayout,
	Menu,
	Typography,
	Dropdown,
	Button,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import OpenNextLogo from "../images/opennextlogo";

import "./header.css";
import useWindowSize from "../hooks/useWindowSize";

interface HeaderProps {
	headerLinks: Array<{
		to: string;
		title: string;
	}>;
	pagePadding: {
		paddingLeft: string;
		paddingRight: string;
	};
}

interface MainMenuProps {
	links: Array<{
		to: string;
		title: string;
	}>;
	mode?: "horizontal" | undefined;
}

const MainMenu = ({ links, mode }: MainMenuProps) => (
	<Menu id="main-menu" mode={mode}>
		{links.map((link) => (
			<Menu.Item key={link.title}>
				<Link to={link.to}>
					<Typography.Text>{link.title}</Typography.Text>
				</Link>
			</Menu.Item>
		))}
	</Menu>
);

interface MobileMenuProps {
	links: Array<{
		to: string;
		title: string;
	}>;
}

const MobileMenu = ({ links }: MobileMenuProps) => {
	const menu = MainMenu({ links });

	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<Button id="mobile-menu-button">
				<MenuOutlined />
			</Button>
		</Dropdown>
	);
};

const Header = ({ headerLinks, pagePadding }: HeaderProps): JSX.Element => {
	const { width } = useWindowSize();

	return (
		<AntdLayout.Header style={{ ...pagePadding }}>
			<Row justify="space-between">
				<Col>
					<a className="logo" href="/">
						<OpenNextLogo />
						<div className="logo__text">
							<span>Library of </span>
							<br></br>
							<span>Open Source Hardware</span>
						</div>
					</a>
				</Col>
				<Col className="menu-col">
					{width > 1230 ? (
						<MainMenu links={headerLinks} mode="horizontal" />
					) : (
						<MobileMenu links={headerLinks} />
					)}
				</Col>
			</Row>
		</AntdLayout.Header>
	);
};

export default Header;
