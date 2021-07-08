import * as React from "react";
import Layout from "../components/layout";
import { Typography, Row, Col, Card } from "antd";

const gridStyle = {
	width: "50%",
	textAlign: "center"
};

const openNextCards = [
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
];

const openHardwareCards = [
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
];

const EcosystemPage = () => (
	<Layout>
		<Typography.Title>Ecosystem</Typography.Title>
		<Typography.Text>Lorem Ipsum dolor sit amet</Typography.Text>
		<Row>
			<Col>
				<Card title="OPEN!NEXT Project">
					{openNextCards.map(({ cardTitle, cardContent }) => {
						return (
							<Card.Grid hoverable={false} style={gridStyle}>
								<Card type="inner" title={cardTitle}>
									{cardContent}
								</Card>
							</Card.Grid>
						);
					})}
				</Card>
			</Col>
			<Col>
				<Card title="Open Hardware Ecosystem">
					{openHardwareCards.map(({ cardTitle, cardContent }) => {
						return (
							<Card.Grid hoverable={false} style={gridStyle}>
								<Card type="inner" title={cardTitle}>
									{cardContent}
								</Card>
							</Card.Grid>
						);
					})}
				</Card>
			</Col>
		</Row>
	</Layout>
);

export default EcosystemPage;
