import React, { useContext, useState, useEffect } from "react";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Typography } from "antd";
import { QueryContext } from "../../context/query-context";
import { DataValue, HardwareData } from "../../controller/types";
import { navigate } from "@reach/router";
import DetailRowString from "../../components/detail-rows/detail-row-string";
import DetailRowUrl from "../../components/detail-rows/detail-row-url";
import DetailRowDownload from "../../components/detail-rows/detail-row-download";
import DetailRowParts from "../../components/detail-rows/detail-row-parts";
import DetailRowReadinessLevel from "../../components/detail-rows/detail-row-readiness-level";
import DetailRowLinkedFiles from "../../components/detail-rows/detail-row-linked-files";
import DetailRowOuterDimensions from "../../components/detail-rows/detail-row-outer-dimensions";
import DetailRowPatentClass from "../../components/detail-rows/detail-row-patent-class";

const renderImage = (property: DataValue | undefined) => {
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
			width={400}
			style={{ marginBottom: "1rem" }}
		/>
	);
};

interface DetailViewPageProps {
	params: {
		id: string;
	};
}

const DetailViewPage = ({ params }: DetailViewPageProps): JSX.Element => {
	const query = useContext(QueryContext);

	const [pageData, setPageData] = useState<HardwareData>();

	const loadData = async () => {
		try {
			const data = await query?.controller?.getItem(params.id);
			setPageData(data);
		} catch (e) {
			navigate("/404", { replace: true });
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	if (!pageData) {
		return <></>;
	}

	console.log(pageData);
	return (
		<Layout>
			<SEO title={pageData.name} />
			<Typography.Title>{pageData.name}</Typography.Title>

			<div>
				{renderImage(pageData.hasImage)}
				<DetailRowString
					title="Functional Description"
					value={pageData.function?.datavalue.value}
				/>

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
					// label={pageData.cpcPatentClass?.datavalue.value}
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
					title="Data source"
					value={pageData.repo?.datavalue.value}
				/>

				<DetailRowUrl
					title="Related TsDC"
					value={pageData.relatedTsDC?.datavalue.value}
				/>
				<DetailRowLinkedFiles data={pageData} />

				<DetailRowDownload repoUrl={pageData.repo?.datavalue.value} />
			</div>
		</Layout>
	);
};

export default DetailViewPage;
