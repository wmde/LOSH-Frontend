import * as React from "react";
import { Link } from "gatsby";
import { Row, Col, Layout as AntdLayout, Menu, Typography } from "antd";
import OpenNextLogo from "../images/opennextlogo";

import "./header.css";

interface HeaderProps {
	siteTitle: string;
	headerLinks: Array<{
		to: string;
		title: string;
	}>;
}

const Header = ({ siteTitle, headerLinks }: HeaderProps): JSX.Element => (
	<AntdLayout.Header>
		<Row justify="space-between">
			<Col xl={12} lg={12} md={12} sm={20} xs={20}>
				<Link className="logo" to="/">
					<OpenNextLogo />
					<div className="logo__text">
						<span>Library of </span>
						<br></br>
						<span>Open Source Hardware</span>
					</div>
				</Link>
			</Col>
			<Col
				xl={12}
				lg={12}
				md={12}
				sm={4}
				xs={4}
			>
				<Menu mode="horizontal">
					{headerLinks.map(link => (
						<Menu.Item key={link.title}>
							<Link to={link.to}>
								<Typography.Text>{link.title}</Typography.Text>
							</Link>
						</Menu.Item>
					))}
				</Menu>
			</Col>
		</Row>
	</AntdLayout.Header>
);

export default Header;
