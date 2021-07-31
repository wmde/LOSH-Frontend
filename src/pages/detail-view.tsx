/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Typography } from "antd";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { useEffect } from "react";
import { useState } from "react";

const DetailViewPage = (): JSX.Element => {
	const query = useContext(QueryContext);

	const [pageData, setPageData] = useState<any>();

	const loadData = async () => {
		const data = await query?.controller?.getItem("Q16");
		setPageData(data);
	};

	useEffect(() => {
		loadData();
	}, []);

	if (!pageData) {
		return <></>;
	}
	console.log(query.controller?.parseData(pageData));

	return (
		<Layout>
			<SEO title="Page two" />
			<Typography.Title>{pageData.labels.en.value}</Typography.Title>

			{/* <div>
		<Typography.Text>
			Data source
		</Typography.Text>
		<Typography.Text>
			{query.controller?.getPropertyValue(pageData, query.properties.source)}
		</Typography.Text>
		</div>

		<div>
		<Typography.Text>
			Timestamp
		</Typography.Text>
		<Typography.Text>
			{query.controller?.getPropertyValue(pageData, query.properties.timestamp).time}
		</Typography.Text>
		</div>

		<div>
		<Typography.Text>
			Repository URL
		</Typography.Text>
		<Typography.Text>
			{query.controller?.getPropertyValue(pageData, query.properties.repo)}
		</Typography.Text>
		</div>

		<div>
		<Typography.Text>
			Licensor / Owner / Organisation
		</Typography.Text>
		<Typography.Text>
			{query.controller?.getPropertyValue(pageData, query.properties.timestamp).time}
		</Typography.Text>
		</div> */}
		</Layout>
	);
};

export default DetailViewPage;
