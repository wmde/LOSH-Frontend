import * as React from "react";
import { Link } from "gatsby";
import { Layout as AntdLayout, Row, Col, Menu, Typography } from "antd";
interface HeaderProps {
	siteTitle: string;
	headerLinks: Array<{
		to: string;
		title: string;
	}>;
}

const Header = ({ siteTitle, headerLinks }: HeaderProps) => (
	<AntdLayout.Header>
		<Row justify="space-between" align="middle">
			<Col>
				<Link to="/">
					<Typography.Text strong={true} style={{ color: "white" }}>
						{siteTitle}
					</Typography.Text>
				</Link>
			</Col>

			<Col>
				<Menu mode="horizontal">
					{headerLinks.map(link => (
						<Menu.Item key={link.title}>
							<Link
								to={link.to}
								style={{
									textDecoration: `none`
								}}
							>
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
