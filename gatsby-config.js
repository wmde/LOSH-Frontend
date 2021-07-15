/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
	siteMetadata: {
		title: `Library of Open Source Hardware`,
		description: `TypeScript version of the default Gatsby starter`,
		author: `@jongwooo`,
		headerLinks: [
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
		],
		footerLinks: [
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
		]
	},
	plugins: [
		`gatsby-plugin-eslint`,
		`gatsby-plugin-typescript`,
		`gatsby-plugin-ts-checker`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-antd`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	]
};
