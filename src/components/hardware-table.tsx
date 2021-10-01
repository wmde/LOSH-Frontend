import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { QueryContext } from "../context/query-context";
import { LIMIT } from "../controller/query-controller";
import { PaginationProps } from "antd/lib/pagination/Pagination";
import {
	SorterResult,
	TablePaginationConfig,
	FilterValue,
} from "antd/lib/table/interface";
import { HardwareData } from "../controller/types";
import { Properties } from "../controller/constants";
import { Link, navigate } from "gatsby";

const columns: ColumnsType<HardwareData> = [
	{
		title: "Name",
		key: "name",
		dataIndex: "name",
		sorter: true,
		render: (value, record) => (
			<Link to={`/detail/${record.id}`}>{record.name}</Link>
		),
	},
	{
		title: "Version",
		key: Properties.VERSION,
		dataIndex: Properties.VERSION,
	},
	{
		title: "License",
		key: Properties.SPDX_LICENSE,
		dataIndex: Properties.SPDX_LICENSE,
	},
	{
		title: "Data Source",
		key: Properties.REPO,
		dataIndex: Properties.REPO,
	},
	{
		title: "Organisation",
		key: Properties.ORGANISATION,
		dataIndex: Properties.ORGANISATION,
	},
];

const HardwareTable = (): JSX.Element => {
	const { items, setPage, currentPage, totalHits, setSorting } =
		useContext(QueryContext);

	const paginationState: PaginationProps = {
		pageSize: LIMIT,
		current: currentPage,
		total: totalHits,
	};

	const handleChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<HardwareData> | SorterResult<HardwareData>[],
		extra: any
	) => {
		switch (extra.action) {
			case "paginate":
				setPage(pagination.current || 1);
				break;
			case "sort":
				console.log(sorter);
				setSorting(sorter);
				break;
			default:
				return;
		}
	};

	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"], ...paginationState }}
			rowKey={(r: HardwareData): string => r.id}
			onRow={(record, rowIndex) => {
				return {
					onClick: () => navigate(`/detail/${record.id}`),
				};
			}}
			onChange={handleChange}
		/>
	);
};

export default HardwareTable;
