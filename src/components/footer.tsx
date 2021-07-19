import * as React from "react";
import { Link } from "gatsby";
import { Layout as AntdLayout, Row, Typography, Col } from "antd";

interface FooterProps {
	footerLinks: Array<{
		to: string;
		title: string;
	}>;
}

const Footer = ({ footerLinks }: FooterProps): JSX.Element => (
	<AntdLayout.Footer>
		<Row align="middle" gutter={[34, 4]}>
			{footerLinks.map(link => (
				<Link
					key={link.title}
					to={link.to}
					style={{
						textDecoration: `none`,
						paddingRight: '1rem'
					}}
				>
					<Typography.Text>{link.title}</Typography.Text>
				</Link>
			))}
		</Row>
	</AntdLayout.Footer>
);

export default Footer;
