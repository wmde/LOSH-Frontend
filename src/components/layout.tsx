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

	const paddingValue = md ? "4rem" : "1rem";

	const pagePadding = {
		paddingLeft: paddingValue,
		paddingRight: paddingValue
	};

	return (
		<AntdLayout style={{ maxWidth: 1440, margin: "auto" }}>
			<Header
				headerLinks={data.site.siteMetadata.headerLinks}
				pagePadding={pagePadding}
			/>
			<AntdLayout.Content style={{ ...pagePadding }}>
				{children}
			</AntdLayout.Content>

			<Footer
				footerLinks={data.site.siteMetadata.footerLinks}
				pagePadding={pagePadding}
			/>
		</AntdLayout>
	);
};

export default Layout;
