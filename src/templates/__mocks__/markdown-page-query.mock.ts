export const markdownQuery = {
	data: {
		markdownRemark: {
			html:
				'<p>The Library of Open Source Hardware was created by the <a href="https://opennext.eu/">OPEN!NEXT</a> working group. They are a team of institutions and organizations that support the growth of Open Source hardware. Tasked by the <a href="https://cordis.europa.eu/project/id/869984">European Commission</a> to create a consolidated database for Open Source Hardware specifications, the OPEN!NEXT working group created this library for use by the maker community.</p>\n<p>These organizations are part of the working group:</p>\n<ul>\n<li><a href="https://wikimedia.de">Wikimedia Germany</a></li>\n<li><a href="">Fraunhofer IPK</a></li>\n<li><a href="">TU Berlin</a></li>\n<li><a href="">Wikifactory</a></li>\n</ul>\n<h3>Our mission</h3>\n<ol>\n<li>Development of standards for the open source community to enable sharing and reuse of data and hardware</li>\n<li>Providing an accessible open source database that allows for easy exploration of the stored data and guides makers in contributing their open source hardware specifications.</li>\n</ol>',
			htmlAst: {
				type: "root",
				children: [
					{
						type: "element",
						tagName: "p",
						properties: {},
						children: [
							{
								type: "text",
								value: "The Library of Open Source Hardware was created by the "
							},
							{
								type: "element",
								tagName: "a",
								properties: {
									href: "https://opennext.eu/"
								},
								children: [
									{
										type: "text",
										value: "OPEN!NEXT"
									}
								]
							},
							{
								type: "text",
								value:
									" working group. They are a team of institutions and organizations that support the growth of Open Source hardware. Tasked by the "
							},
							{
								type: "element",
								tagName: "a",
								properties: {
									href: "https://cordis.europa.eu/project/id/869984"
								},
								children: [
									{
										type: "text",
										value: "European Commission"
									}
								]
							},
							{
								type: "text",
								value:
									" to create a consolidated database for Open Source Hardware specifications, the OPEN!NEXT working group created this library for use by the maker community."
							}
						]
					},
					{
						type: "text",
						value: "\n"
					},
					{
						type: "element",
						tagName: "p",
						properties: {},
						children: [
							{
								type: "text",
								value: "These organizations are part of the working group:"
							}
						]
					},
					{
						type: "text",
						value: "\n"
					},
					{
						type: "element",
						tagName: "ul",
						properties: {},
						children: [
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "element",
										tagName: "a",
										properties: {
											href: "https://wikimedia.de"
										},
										children: [
											{
												type: "text",
												value: "Wikimedia Germany"
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "element",
										tagName: "a",
										properties: {
											href: ""
										},
										children: [
											{
												type: "text",
												value: "Fraunhofer IPK"
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "element",
										tagName: "a",
										properties: {
											href: ""
										},
										children: [
											{
												type: "text",
												value: "TU Berlin"
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "element",
										tagName: "a",
										properties: {
											href: ""
										},
										children: [
											{
												type: "text",
												value: "Wikifactory"
											}
										]
									}
								]
							},
							{
								type: "text",
								value: "\n"
							}
						]
					},
					{
						type: "text",
						value: "\n"
					},
					{
						type: "element",
						tagName: "h3",
						properties: {},
						children: [
							{
								type: "text",
								value: "Our mission"
							}
						]
					},
					{
						type: "text",
						value: "\n"
					},
					{
						type: "element",
						tagName: "ol",
						properties: {},
						children: [
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "text",
										value:
											"Development of standards for the open source community to enable sharing and reuse of data and hardware"
									}
								]
							},
							{
								type: "text",
								value: "\n"
							},
							{
								type: "element",
								tagName: "li",
								properties: {},
								children: [
									{
										type: "text",
										value:
											"Providing an accessible open source database that allows for easy exploration of the stored data and guides makers in contributing their open source hardware specifications."
									}
								]
							},
							{
								type: "text",
								value: "\n"
							}
						]
					}
				],
				data: {
					quirksMode: false
				}
			},
			frontmatter: {
				slug: "/about",
				title: "About our project"
			}
		}
	},
	extensions: {}
};
