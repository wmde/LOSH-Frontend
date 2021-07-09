import * as React from "react";
import { Link } from "gatsby";
import { Layout as AntdLayout, Row, Col, Menu, Typography } from "antd";

interface FooterProps {
	footerLinks: Array<{
		to: string;
		title: string;
	}>;
}

const Footer = ({ footerLinks }: FooterProps) => (
	<AntdLayout.Footer>
		<Row justify="center" align="middle" gutter={[34, 0]}>
			{footerLinks.map(link => (
				<Link
					key={link.title}
					to={link.to}
					style={{
						textDecoration: `none`
					}}
				>
					<Typography.Text>{link.title}</Typography.Text>
				</Link>
			))}
		</Row>
	</AntdLayout.Footer>
);

export default Footer;
