import * as React from "react";
import Layout from "../components/layout";
import { Typography, Row, Col, Card } from "antd";
import SEO from "../components/seo";

const gridStyle: React.CSSProperties = {
	width: "50%",
	textAlign: "center"
};

const openNextCards = {
	title: "OPEN!NEXT Project",
	cards: [
		{
			cardTitle: "Wikimedia Deutschland",
			cardContent: "Lorem Ipsum dolor sit"
		},
		{
			cardTitle: "Fraunhofer",
			cardContent: "Lorem Ipsum dolor sit amet lorem"
		},
		{
			cardTitle: "Wikifactory",
			cardContent: "Lorem Ipsum dolor sit"
		}
	]
};

const openHardwareCards = {
	title: "Open Hardware Ecosystem",
	cards: [
		{
			cardTitle: "OSHWA",
			cardContent: "Lorem Ipsum dolor sit"
		},
		{
			cardTitle: "HardwareX",
			cardContent: "Journal for OSH news"
		},
		{
			cardTitle: "HardwareX",
			cardContent: "Journal for OSH news"
		},
		{
			cardTitle: "HardwareX",
			cardContent: "Journal for OSH news"
		}
	]
};

interface CardSet {
	title: string;
	cards: Array<{
		cardTitle: string;
		cardContent: string;
	}>;
}

interface EcosystemCardGridProps {
	cardSet: CardSet;
}

const EcosystemCardGrid = ({ cardSet }: EcosystemCardGridProps) => (
	<Col>
		<Card title={cardSet.title}>
			{cardSet.cards.map(({ cardTitle, cardContent }) => (
				<Card.Grid hoverable={false} style={gridStyle} key={cardTitle}>
					<Card type="inner" title={cardTitle}>
						{cardContent}
					</Card>
				</Card.Grid>
			))}
		</Card>
	</Col>
);
const EcosystemPage = () => (
	<Layout>
		<SEO title="Ecosystem" />
		<Typography.Title>Ecosystem</Typography.Title>
		<Typography.Text>Lorem Ipsum dolor sit amet</Typography.Text>
		<Row>
			<EcosystemCardGrid cardSet={openNextCards} />
			<EcosystemCardGrid cardSet={openHardwareCards} />
		</Row>
	</Layout>
);

export default EcosystemPage;
