import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { HardwareData } from "../query-controller";

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
	const { items } = useContext(QueryContext);

	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"] }}
			rowKey={(r: HardwareData): number => r.tsdcId}
		/>
	);
};

export default HardwareTable;
