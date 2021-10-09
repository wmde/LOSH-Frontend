module.exports = {
	pathPrefix: process.env.PATH_PREFIX || "",
	siteMetadata: {
		title: `Library of Open Source Hardware`,
		description: `We are aiming to build the (real) Internet of Things – the Internet of Open Hardware.`,
		author: `OPEN-NEXT`,
		headerLinks: [
			{
				to: "/",
				title: "Explore Data",
			},
			{
				to: "/contribute-specifications",
				title: "Contribute specifications",
			},
			{
				to: "/about",
				title: "About the Project",
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
				to: "https://opennext.eu/",
				title: "Imprint",
			},
			{
				to: "https://opennext.eu/",
				title: "Legal Disclaimer",
			},
			{
				to: "https://github.com/wmde/LOSH-Frontend/issues/new/choose",
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
						"Source Code Pro:400,500,600,700,900",
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
						"font-family": "'Source Sans Pro', Helvetica, sans-serif",
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
						"ease-in-out": "cubic-bezier(.01,.4,0,.39)",
						"btn-text-shadow": "none",
						"btn-primary-color": "#000",
						"btn-primary-bg": "#97C5F1",
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
				icon: `src/images/icon-192x192.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
