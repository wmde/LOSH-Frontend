import * as React from "react";
import { Link } from "gatsby";
import { Layout as AntdLayout, Row, Typography } from "antd";
import "./footer.css";

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
				<a key={link.title} href={link.to} target="_blank" rel="noreferrer">
					<Typography.Text>{link.title}</Typography.Text>
				</a>
			))}
		</Row>
	</AntdLayout.Footer>
);

export default Footer;
