import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Layout as AntdLayout } from "antd";

import Header from "./header";
import Footer from "./footer";

const Layout: React.FC = ({ children }) => {
	const headerLinks = [
		{
			to: "/",
			title: "Explore OSH Data"
		},
		{
			to: "/submission",
			title: "Submit OSH Data"
		},
		{
			to: "/ecosystem",
			title: "Ecosystem"
		},
		{
			to: "/get-involved",
			title: "Get involved"
		}
	];

	const footerLinks = [
		{
			to: "/",
			title: "(c) OPEN!NEXT"
		},
		{
			to: "/about",
			title: "About the Project"
		},
		{
			to: "/disclaimer",
			title: "Legal Disclaimer"
		},
		{
			to: "/issue",
			title: "Submit an issue"
		}
	];

	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<>
			<Header
				siteTitle={data.site.siteMetadata.title}
				headerLinks={headerLinks}
			/>

			<AntdLayout.Content>{children}</AntdLayout.Content>

			<Footer footerLinks={footerLinks} />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
