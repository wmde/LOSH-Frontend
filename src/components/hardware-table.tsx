import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { HardwareData } from "../query-controller";
import { PaginationProps } from "antd/lib/pagination/Pagination";

const getPropertyValue = (record: any, property: string) => record.claims && record.claims[property] && record.claims[property][0]?.mainsnak.datavalue.value

const generateColumns = (properties: Record<string, string>): ColumnsType<HardwareData> => [
	{
		title: "Name",
		key: "name",
		render: (record) => record.labels.en.value
	},
	{
		title: "Version",
		key: "version",
		render: (record) => getPropertyValue(record, properties.version)
	},
	{
		title: "License",
		key: "license",
		render: (record) => getPropertyValue(record, properties.spdxLicense)
	},
	{
		title: "Data Source",
		key: "data-source",
		render: (record) => getPropertyValue(record, properties.repo)
	},
	{
		title: "Organization",
		key: "organization",
		render: (record) => getPropertyValue(record, properties.organisation)
	},
];

const HardwareTable = (): JSX.Element => {
	const { items, setPage, currentPage, properties } = useContext(QueryContext);
	const columns = generateColumns(properties)

	const pagination: PaginationProps = {
		pageSize: 15,
		current: currentPage,
		onChange: setPage,
		total: 200,
	};
	console.log(properties)
	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"], ...pagination }}
			rowKey={(r: HardwareData): number => r.tsdcId}
		/>
	);
};

export default HardwareTable;
