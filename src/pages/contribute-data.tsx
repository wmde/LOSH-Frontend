import * as React from "react";
import Layout from "../components/layout";
import { Typography, Row, Col, Card } from "antd";
import SEO from "../components/seo";

const submissionPageCards = [
	{
		number: 1,
		title: "Download the template",
		text:
			"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."
	},
	{
		number: 2,
		title: "Add your data",
		text:
			"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit"
	},
	{
		number: 3,
		title: "Upload your data to a repository",
		text:
			"Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit"
	}
];
interface SubmissionPageCard {
	number: number;
	title: string;
	text: string;
}
interface SubmissionCardProps {
	submissionPageCard: SubmissionPageCard;
}

const SubmissionCard = ({
	submissionPageCard: { number, title, text }
}: SubmissionCardProps) => (
	<Row>
		<Col>
			<Typography.Title>{number}</Typography.Title>
		</Col>
		<Col>
			<Card title={title}>{text}</Card>
		</Col>
	</Row>
);

const ContributeDataPage = () => (
	<Layout>
		<SEO title="Contribute Data" />
		<Typography.Title>Contribute Data</Typography.Title>
		<Typography.Text>
			We will guide you in a step-by-step guide through the process of
			submitting OSH Data. Please consult...
		</Typography.Text>
		<Typography.Title level={3}> Submission Guideline</Typography.Title>
		{submissionPageCards.map(card => (
			<SubmissionCard submissionPageCard={card} key={card.title} />
		))}
		<Typography.Title level={3}> Something Else</Typography.Title>
		<Typography.Text>Something else entirely...</Typography.Text>
	</Layout>
);

export default ContributeDataPage;
