import React from "react";
import { graphql } from "gatsby";
import { Typography } from "antd";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { renderAst } from "./markdown-renderer";

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
			<div className="markdown-content">{renderAst(htmlAst)}</div>
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
