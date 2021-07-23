import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Table as AntTable, Typography, Row, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import Filter from "../components/filter";
import QueryController from "../query-controller";
import "../styles/search-box.css";
import { QueryProvider } from "../context/query-context";
import { SearchBox } from "../components/search-box";

interface HardwareData {
	name: string;
	identifier: string;
	repository: string;
	version: string;
	license: string;
	organization: string;
	language: string;
	tsdcId: number;
}

const tableHeaders: ColumnsType<HardwareData> = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Identifier",
		dataIndex: "identifier",
		key: "identifier",
	},
	{
		title: "Repository",
		dataIndex: "repository",
		key: "repository",
	},
	{
		title: "Version",
		dataIndex: "version",
		key: "version",
	},
	{
		title: "License",
		dataIndex: "license",
		key: "license",
	},
	{
		title: "Organization",
		dataIndex: "organization",
		key: "organization",
	},
	{
		title: "Language",
		dataIndex: "language",
		key: "language",
	},
	{
		title: "TsdcId",
		dataIndex: "tsdcId",
		key: "tsdcId",
	},
];

interface HardwarePageProps {
	dataSource: HardwareData[];
	columns: ColumnsType<HardwareData>;
}

const HardwareTable = ({
	dataSource,
	columns,
}: HardwarePageProps): JSX.Element => (
	<AntTable<HardwareData>
		columns={columns}
		dataSource={dataSource}
		size="middle"
		style={{ overflowX: "scroll" }}
		pagination={{ position: ["bottomLeft"] }}
		rowKey={(r: HardwareData): number => r.tsdcId}
	/>
);

const IndexPage: React.FC = () => {
	const query = new QueryController();
	const items = query.getItems({ search });

	return (
		<QueryProvider>
			<Layout>
				<SEO title="Explore Data" />
				<Typography.Title>Explore Data</Typography.Title>
				<SearchBox />
				<Filter />
				<HardwareTable dataSource={items} columns={tableHeaders} />
			</Layout>
		</QueryProvider>
	);
};

export default IndexPage;
