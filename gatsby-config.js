module.exports = {
	siteMetadata: {
		title: `Library of Open Source Hardware`,
		description: `TypeScript version of the default Gatsby starter`,
		author: `@jongwooo`,
		headerLinks: [
			{
				to: "/",
				title: "Explore Data",
			},
			{
				to: "/contribute-data",
				title: "Contribute Data",
			},
			{
				to: "/ecosystem",
				title: "Ecosystem",
			},
			{
				to: "/get-involved",
				title: "Get involved",
			},
		],
		footerLinks: [
			{
				to: "/",
				title: "(c) OPEN!NEXT",
			},
			{
				to: "/about",
				title: "About the Project",
			},
			{
				to: "/disclaimer",
				title: "Legal Disclaimer",
			},
			{
				to: "/issue",
				title: "Submit an issue",
			},
		],
	},
	plugins: [
		`gatsby-plugin-eslint`,
		`gatsby-plugin-typescript`,
		`gatsby-plugin-ts-checker`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/src/markdown-pages`,
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: "gatsby-plugin-web-font-loader",
			options: {
				google: {
					families: [
						"Source Code Pro:400,500,600,900",
						"Source Sans Pro:400,500,600,900",
					],
				},
			},
		},
		{
			resolve: "gatsby-plugin-antd",
			options: {
				style: true,
			},
		},
		{
			resolve: "gatsby-plugin-less",
			options: {
				lessOptions: {
					modifyVars: {
						"font-family": "'Source Sans Pro', Helvetica",
						"body-background": "#ededed",
						"layout-header-background": "#ededed",
						"layout-body-background": "#ededed",
						"layout-footer-background": "#ededed",
						"component-background": "#ededed",
						"primary-color": "#46749F",
						"link-color": "#5087BC",
						"input-bg": "#FFFFFF",
						"btn-default-bg": "#FFFFFF",
						"dropdown-menu-bg": "#FFFFFF",
					},
					javascriptEnabled: true,
				},
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Library of Open Source Hardware`,
				short_name: `LOSH`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
