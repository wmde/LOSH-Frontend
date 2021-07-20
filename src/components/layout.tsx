import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Layout as AntdLayout, Grid } from "antd";

import Header from "./header";
import Footer from "./footer";

import "./layout.css";

interface Props {
	children?: React.ReactNode;
}
const Layout: React.FC = ({ children }: Props) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
					headerLinks {
						to
						title
					}
					footerLinks {
						to
						title
					}
				}
			}
		}
	`);

	const { md } = Grid.useBreakpoint();

	const pagePadding = md ? '0 4rem' : '0 1rem';

	return (
		<AntdLayout style={{ maxWidth: 1440, margin: "auto" }}>
			<Header headerLinks={data.site.siteMetadata.headerLinks} />
			<AntdLayout.Content style={{ padding: pagePadding }}>
				{children}
			</AntdLayout.Content>

			<Footer footerLinks={data.site.siteMetadata.footerLinks} />
		</AntdLayout>
	);
};

export default Layout;
