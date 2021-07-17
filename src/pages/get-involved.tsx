import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { Typography, Row, Col, Card, List } from "antd";
import SEO from "../components/seo";

const getInvolvedPageCards = [
	{
		title: "For Makers",
		links: [
			{
				url: "/",
				content: "OSH data submission guideline"
			},
			{
				url: "/",
				content: "Optimize stored OSH data"
			}
		]
	},
	{
		title: "For Developers",
		links: [
			{
				url: "/",
				content: "Improve the LOSH experience"
			},
			{
				url: "/",
				content: "Fix bugs in the LOSH app"
			}
		]
	}
];

interface GetInvolvedPageCard {
	title: string;
	links: Array<{
		url: string;
		content: string;
	}>;
}

interface GetInvolvedPageCardProps {
	card: GetInvolvedPageCard;
}

const GetInvolvedCard = ({
	card: { title, links }
}: GetInvolvedPageCardProps) => (
	<Col>
		<Card title={title}>
			<Typography.Text>
				Learn how you can help grow the open source hardware ecosystem
			</Typography.Text>
			<List
				bordered={false}
				dataSource={links}
				renderItem={link => (
					<List.Item>
						<Link to={link.url}>{link.content}</Link>
					</List.Item>
				)}
			/>
		</Card>
	</Col>
);

const GetInvolvedPage = () => (
	<Layout>
		<SEO title="Get Involved" />
		<Typography.Title>Get Involved</Typography.Title>
		<Typography.Text>Lorem Ipsum dolor sit amet</Typography.Text>
		<Row>
			{getInvolvedPageCards.map(card => {
				return <GetInvolvedCard card={card} key={card.title} />;
			})}
		</Row>
	</Layout>
);

export default GetInvolvedPage;
