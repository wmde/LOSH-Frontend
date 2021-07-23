import * as React from "react";
import { Link } from "gatsby";
import { Layout as AntdLayout, Row, Typography } from "antd";

interface FooterProps {
	footerLinks: Array<{
		to: string;
		title: string;
	}>;
	pagePadding: {
		paddingLeft: string;
		paddingRight: string;
	};
}

const Footer = ({ footerLinks, pagePadding }: FooterProps): JSX.Element => (
	<AntdLayout.Footer style={{ ...pagePadding }}>
		<Row align="middle">
			<Typography.Text style={{ paddingRight: "1rem" }}>
				© OPEN!NEXT
			</Typography.Text>
			{footerLinks.map((link) => (
				<Link key={link.title} to={link.to}>
					<Typography.Text>{link.title}</Typography.Text>
				</Link>
			))}
		</Row>
	</AntdLayout.Footer>
);

export default Footer;
