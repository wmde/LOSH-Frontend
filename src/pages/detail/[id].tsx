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
import DetailRowRelatedUrls from "../../components/detail-rows/detail-row-related-urls";
import DetailRowParts from "../../components/detail-rows/detail-row-parts";
import DetailRowReadinessLevel from "../../components/detail-rows/detail-row-readiness-level";

const renderImage = (property: DataValue | undefined) => {
	if (
		!property ||
		property.datatype !== "wikibase-item" ||
		!property.datavalue.result.fileURL
	) {
		return;
	}

	return (
		<img src={property.datavalue.result.fileURL.datavalue.value} width={300} />
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
				<DetailRowUrl
					title="Data source"
					value={pageData.repo?.datavalue.value}
				/>
				<DetailRowString
					title="Timestamp"
					value={
						pageData.timestamp &&
						new Date(pageData.timestamp.datavalue.value).toLocaleDateString()
					}
				/>
				<DetailRowString
					title="Licensor / Owner / Organisation"
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
				<DetailRowString
					title="Outer Dimensions MM"
					value={pageData.outerDimensionsMM?.datavalue.value}
				/>
				<DetailRowString
					title="CPC Patent Class"
					value={pageData.cpcPatentClass?.datavalue.value}
				/>
				<DetailRowUrl
					title="Related TsDC"
					value={pageData.relatedTsDC?.datavalue.value}
				/>
				<DetailRowString
					title="License"
					value={pageData.spdxLicense?.datavalue.value}
				/>
				{renderImage(pageData.hasImage)}

				<DetailRowParts hasComponents={pageData.hasComponent} />

				<DetailRowRelatedUrls data={pageData} />

				<DetailRowString
					title="Functional Description"
					value={pageData.function?.datavalue.value}
				/>
				<DetailRowDownload repoUrl={pageData.repo?.datavalue.value} />
			</div>
		</Layout>
	);
};

export default DetailViewPage;
