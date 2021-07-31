import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { HardwareData, LIMIT } from "../query-controller";
import { PaginationProps } from "antd/lib/pagination/Pagination";

const columns: ColumnsType<HardwareData> = [
	{
		title: "Name",
		key: "name",
		dataIndex: "name",
	},
	{
		title: "Version",
		key: "version",
		dataIndex: "version",
	},
	{
		title: "License",
		key: "license",
		dataIndex: "spdxLicense",
	},
	{
		title: "Data Source",
		key: "data-source",
		dataIndex: "repo",
	},
	{
		title: "Organization",
		key: "organization",
		dataIndex: "organisation",
	},
];

const HardwareTable = (): JSX.Element => {
	const { items, setPage, currentPage, totalHits } = useContext(QueryContext);

	const paginationState: PaginationProps = {
		pageSize: LIMIT,
		current: currentPage,
		onChange: setPage,
		total: totalHits,
	};
	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"], ...paginationState }}
			rowKey={(r: HardwareData): string => r.id}
		/>
	);
};

export default HardwareTable;
