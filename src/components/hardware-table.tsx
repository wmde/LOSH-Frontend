import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { HardwareData } from "../query-controller";
import { PaginationProps } from 'antd/lib/pagination/Pagination'

const columns: ColumnsType<HardwareData> = [
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

const HardwareTable = (): JSX.Element => {
	const { items, setPage, currentPage } = useContext(QueryContext);

    const pagination: PaginationProps = {
        pageSize: 5,
        current: currentPage,
        onChange: setPage,
        total: 200
    }

	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"], ...pagination}}
			rowKey={(r: HardwareData): number => r.tsdcId}
		/>
	);
};

export default HardwareTable;
