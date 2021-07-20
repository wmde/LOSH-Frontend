import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import unified from "unified";
import { Typography } from "antd";
import Layout from "../components/layout";
import SEO from "../components/seo";

const processor = unified().use(rehypeReact, {
	createElement: React.createElement,
	components: {
		h1: (props: any) => <Typography.Title level={1} {...props} />,
		h2: (props: any) => <Typography.Title level={2} {...props} />,
		h3: (props: any) => <Typography.Title level={3} {...props} />,
		h4: (props: any) => <Typography.Title level={4} {...props} />,
		h5: (props: any) => <Typography.Title level={5} {...props} />,
	},
});
export const renderAst = (ast: any): JSX.Element => {
	return processor.stringify(ast) as unknown as JSX.Element;
};

interface TemplateProps {
	data: any;
}

export default function Template({ data }: TemplateProps) {
	const { markdownRemark } = data; // Data injected from GraphQL
	const { frontmatter, htmlAst } = markdownRemark;

	return (
		<Layout>
			<SEO title={frontmatter.title} />
			<Typography.Title level={1}>{frontmatter.title}</Typography.Title>
			{renderAst(htmlAst)}
		</Layout>
	);
}
export const pageQuery = graphql`
	query ($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			htmlAst
			frontmatter {
				slug
				title
			}
		}
	}
`;
