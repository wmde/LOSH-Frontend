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
import { Link } from "gatsby";
import { parseDataSource } from "../utils/parse-data-source";

const columns: ColumnsType<HardwareData> = [
	{
		title: "Name",
		key: "name",
		dataIndex: "name",
		render: (value, record) => (
			<Link to={`/detail/${record.id}`}>{record.name}</Link>
		),
	},
	{
		title: "Version",
		key: Properties.VERSION,
		dataIndex: Properties.VERSION,
		render: (v, record) => record.version?.datavalue.value,
	},
	{
		title: "License",
		key: Properties.SPDX_LICENSE,
		dataIndex: Properties.SPDX_LICENSE,
		render: (v, record) => record.spdxLicense?.datavalue.value,
	},
	{
		title: "Data Source",
		key: Properties.REPO,
		dataIndex: Properties.REPO,
		render: (v, record) =>
			record.repo && (
				<a href={record.repo.datavalue.value} target="_blank" rel="noreferrer">
					{parseDataSource(record.repo?.datavalue.value)}
				</a>
			),
	},
	{
		title: "Organisation",
		key: Properties.ORGANISATION,
		dataIndex: Properties.ORGANISATION,
		render: (v, record) => record.organisation?.datavalue.value,
	},
];

const HardwareTable = (): JSX.Element => {
	const { items, handlePageChange, currentPage, totalHits } =
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
				handlePageChange(pagination.current || 1);
				break;
			case "sort":
				// console.log(sorter);
				// setSorting(sorter);
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
			onChange={handleChange}
		/>
	);
};

export default HardwareTable;
