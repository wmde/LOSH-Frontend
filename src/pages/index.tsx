import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Typography } from "antd";
import Filter from "../components/filter";
import { QueryProvider } from "../context/query-context";
import { SearchBox } from "../components/search-box";
import HardwareTable from "../components/hardware-table";

const IndexPage: React.FC = () => {
	return (
		<QueryProvider>
			<Layout>
				<SEO title="Explore Data" />
				<Typography.Title>Explore Data</Typography.Title>
				<SearchBox />
				<Filter />
				<HardwareTable />
			</Layout>
		</QueryProvider>
	);
};

export default IndexPage;
