import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined";
import { Button, Col, Row, Typography } from "antd";
import { Link } from "gatsby";
import React from "react";
import { DataValue } from "../controller/types";
import DetailRowDownload from "./detail-rows/detail-row-download";
import DetailRowLinkedFiles from "./detail-rows/detail-row-linked-files";
import DetailRowOuterDimensions from "./detail-rows/detail-row-outer-dimensions";
import DetailRowParts from "./detail-rows/detail-row-parts";
import DetailRowPatentClass from "./detail-rows/detail-row-patent-class";
import DetailRowReadinessLevel from "./detail-rows/detail-row-readiness-level";
import DetailRowString from "./detail-rows/detail-row-string";
import DetailRowUrl from "./detail-rows/detail-row-url";
import SEO from "./seo";
import "./detail-content.css";
import Layout from "./layout";
import useWindowSize from "../hooks/useWindowSize";

interface DetailContentProps {
	pageData: any;
}
const renderImage = (property: DataValue | undefined, isNarrow: boolean) => {
	if (
		!property ||
		property.datatype !== "wikibase-item" ||
		!property.datavalue.result.fileURL
	) {
		return;
	}

	return (
		<img
			src={property.datavalue.result.fileURL.datavalue.value}
			width={"100%"}
			style={{
				marginBottom: "1rem",
				maxWidth: !isNarrow ? "400px" : "100%",
				minWidth: !isNarrow ? "400px" : "unset",
			}}
		/>
	);
};

const DetailContent: React.FC<DetailContentProps> = ({ pageData }) => {
	const { width } = useWindowSize();

	const isNarrow = width < 768;

	return (
		<Layout>
			<SEO title={pageData.name} />
			<Row>
				<Col>
					<Link to={"/"}>
						<Button
							id="back"
							icon={<LeftOutlined />}
							style={{ marginRight: "1rem" }}
						>{`Back`}</Button>
					</Link>
				</Col>
				<Col>
					<Typography.Title level={3} style={{ margin: 0 }}>
						Explore Data: Component Details
					</Typography.Title>
				</Col>
			</Row>

			<Row
				wrap={false}
				style={{
					maxWidth: "960px",
					marginTop: "2rem",
					flexDirection: isNarrow ? "column-reverse" : "row",
				}}
			>
				<Col order={2} flex={2}>
					{renderImage(pageData.hasImage, isNarrow)}
				</Col>
				<Col order={1} style={{ paddingRight: "1rem" }} flex={3}>
					<Typography.Title level={2}>{pageData.name}</Typography.Title>

					<DetailRowString value={pageData.function?.datavalue.value} />

					<a
						href={pageData.repo?.datavalue.value}
						target="_blank"
						rel="noreferrer"
					>
						<Button id="repoBtn" style={{ marginBottom: "1rem" }}>
							To {pageData.name} repo <ArrowRightOutlined />
						</Button>
					</a>

					<DetailRowString
						title="Version"
						value={pageData.version?.datavalue.value}
					/>

					<DetailRowString
						title="License"
						value={pageData.spdxLicense?.datavalue.value}
					/>
					<DetailRowString
						title="Licensor"
						value={pageData.licensor?.datavalue.value}
					/>
					<DetailRowString
						title="Organisation"
						value={pageData.organisation?.datavalue.value}
					/>
					<DetailRowDownload repoUrl={pageData.repo?.datavalue.value} />
					<DetailRowLinkedFiles data={pageData} />

					<DetailRowReadinessLevel
						title="Technology Readiness Level"
						value={pageData.technologyReadinessLevel?.datavalue.value}
					/>
					<DetailRowReadinessLevel
						title="Documentation Readiness Level"
						value={pageData.documentationReadinessLevel?.datavalue.value}
					/>
					<DetailRowOuterDimensions
						value={pageData.outerDimensionsMM?.datavalue.value}
					/>
					<DetailRowParts hasComponents={pageData.hasComponent} />

					<DetailRowPatentClass
						value={pageData.cpcPatentClass?.datavalue.value}
					/>

					<DetailRowString
						title="Timestamp"
						value={
							pageData.timestamp &&
							new Date(pageData.timestamp.datavalue.value).toLocaleDateString()
						}
					/>

					<DetailRowUrl
						title="Related Technology-specific Documentation Criteria (TsDC)"
						value={pageData.relatedTsDC?.datavalue.value}
					/>
				</Col>
			</Row>
		</Layout>
	);
};

export default DetailContent;
