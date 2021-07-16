import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Layout as AntdLayout } from "antd";

import Header from "./header";
import Footer from "./footer";

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

	return (
		<AntdLayout>
			<Header
				siteTitle={data.site.siteMetadata.title}
				headerLinks={data.site.siteMetadata.headerLinks}
			/>
			<AntdLayout.Content>{children}</AntdLayout.Content>

			<Footer footerLinks={data.site.siteMetadata.footerLinks} />
		</AntdLayout>
	);
};

export default Layout;
