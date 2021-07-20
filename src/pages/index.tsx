import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Table as AntTable, Typography, Row, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import Filter from "../components/filter";

import '../styles/search-box.css';

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
		key: "name"
	},
	{
		title: "Identifier",
		dataIndex: "identifier",
		key: "identifier"
	},
	{
		title: "Repository",
		dataIndex: "repository",
		key: "repository"
	},
	{
		title: "Version",
		dataIndex: "version",
		key: "version"
	},
	{
		title: "License",
		dataIndex: "license",
		key: "license"
	},
	{
		title: "Organization",
		dataIndex: "organization",
		key: "organization"
	},
	{
		title: "Language",
		dataIndex: "language",
		key: "language"
	},
	{
		title: "TsdcId",
		dataIndex: "tsdcId",
		key: "tsdcId"
	}
];

const tableData: HardwareData[] = [
	{
		name: "in hac",
		identifier:
			"https://latimes.com/habitasse/platea/dictumst/aliquam/augue.json?",
		repository: "in",
		version: "0.73",
		license: "donec",
		organization: "Lakin, Ondricka and Thiel",
		language: "Maltese",
		tsdcId: 1
	},
	{
		name: "imperdiet",
		identifier:
			"http://unc.edu/tristique.html?velit=quis&vivamus=tortor&vel=id&nul",
		repository: "mattis",
		version: "6.0",
		license: "etiam",
		organization: "Orn Inc",
		language: "Greek",
		tsdcId: 2
	},
	{
		name: "volutpat",
		identifier: "http://google.pl/non/lec",
		repository: "at",
		version: "1.09",
		license: "ut",
		organization: "Gutkowski LLC",
		language: "Danish",
		tsdcId: 3
	},
	{
		name: "sit",
		identifier: "https://ameblo.jp/in/blandit/ultrices/enim/lor",
		repository: "nunc",
		version: "0.19",
		license: "ligula",
		organization: "Bernhard-Kuhn",
		language: "Kashmiri",
		tsdcId: 4
	},
	{
		name: "justo sit",
		identifier:
			"https://miitbeian.gov.cn/nulla.aspx?bibendum=venenatis&morbi=tri",
		repository: "at",
		version: "1.7",
		license: "erat",
		organization: "Kunze, Dickinson and Zboncak",
		language: "Spanish",
		tsdcId: 5
	},
	{
		name: "nunc nisl",
		identifier: "https://epa.gov/fusce/congue/diam.html?",
		repository: "nulla",
		version: "2.5.1",
		license: "lacus",
		organization: "Green Group",
		language: "Hiri Motu",
		tsdcId: 6
	},
	{
		name: "nisi",
		identifier: "https://google.com.br/euismod/scelerisque/quam/turpis",
		repository: "in",
		version: "0.4.6",
		license: "nulla",
		organization: "Brakus and Sons",
		language: "Maltese",
		tsdcId: 7
	},
	{
		name: "mi nulla",
		identifier: "http://google.co.jp/at/velit.json?aliquam",
		repository: "morbi",
		version: "7.6",
		license: "tortor",
		organization: "Ernser-Gorczany",
		language: "Danish",
		tsdcId: 8
	},
	{
		name: "odio",
		identifier: "http://netlog.com/turpis/adipiscing/lorem/v",
		repository: "quam",
		version: "8.5",
		license: "quisque",
		organization: "Doyle and Sons",
		language: "Nepali",
		tsdcId: 9
	},
	{
		name: "est",
		identifier:
			"https://mysql.com/risus/dapibus.js?consequat=libero&lectus=convallis&in=eget&est=eleifend&risus=luctus&auctor=ultricies&sed=eu&tristique=nibh&",
		repository: "quis",
		version: "0.30",
		license: "quam",
		organization: "Denesik Group",
		language: "Nepali",
		tsdcId: 10
	}
];

interface HardwarePageProps {
	dataSource: HardwareData[];
	columns: ColumnsType<HardwareData>;
}

const HardwareTable = ({
	dataSource,
	columns
}: HardwarePageProps): JSX.Element => (
	<AntTable<HardwareData>
		columns={columns}
		dataSource={dataSource}
		size="middle"
		style={{ overflowX: 'scroll' }}
		pagination={{ position: ["bottomLeft"] }}
		rowKey={(r: HardwareData): number => r.tsdcId}
	/>
);

const IndexPage: React.FC = () => (
	<Layout>
		<SEO title="Explore Data" />
		<Typography.Title>Explore Data</Typography.Title>
		<Row className="search-box">
			<label htmlFor="search">Search</label>
			<Input.Search
				id="search"
				placeholder="input search text"
				onSearch={() => {
					console.log("Search")
				}}
				style={{ maxWidth: 400 }}
			/>
		</Row>
		<Filter />
		<HardwareTable dataSource={tableData} columns={tableHeaders} />
	</Layout>
);

export default IndexPage;
