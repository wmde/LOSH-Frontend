import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Typography } from "antd";
import Filter from "../components/filter";
import { SearchBox } from "../components/search-box";
import HardwareTable from "../components/hardware-table";

const IndexPage: React.FC = () => {
	return (
		<Layout>
			<SEO title="Explore Data" />
			<Typography.Title>Explore Data</Typography.Title>
			<Typography.Text>
				Find Open Source Hardware matching your use case. LOSH crawls data from
				several platforms for you and connects it in a graph database. Go ahead
				and search for free/open designs by the search bar below.
			</Typography.Text>
			<SearchBox />
			<Filter />
			<HardwareTable />
		</Layout>
	);
};

export default IndexPage;
