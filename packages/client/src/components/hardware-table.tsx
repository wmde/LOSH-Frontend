import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { DEFAULT_PAGE_SIZE, QueryContext } from "../context/query-context";
import { PaginationProps } from "antd/lib/pagination/Pagination";
import { TablePaginationConfig } from "antd/lib/table/interface";
import { HardwareData } from "../controller/types";
import { Properties } from "../controller/constants";
import { Link } from "gatsby";
import "./hardware-table.css";

const columns: ColumnsType<HardwareData> = [
	{
		title: "Name",
		key: "name",
		dataIndex: "name",
		render: (value, record) => record.name,
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
		render: (v, record) =>
			record.spdxLicense?.datavalue.value.replace(
				"https://spdx.org/licenses/",
				""
			),
	},
	{
		title: "Repo",
		key: Properties.REPO,
		dataIndex: Properties.REPO,
		ellipsis: true,
		className: "repo",
		render: (v, record) =>
			record.repo && (
				<a
					href={record.repo.datavalue.value}
					onClick={(e) => e.stopPropagation()}
					target="_blank"
					rel="noreferrer"
				>
					{record.repo?.datavalue.value
						.replace("https://", "")
						.replace("www.", "")}
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
	const {
		items,
		handlePageChange,
		handlePageSizeChange,
		currentPage,
		pageSize,
		totalHits,
	} = useContext(QueryContext);

	const paginationState: PaginationProps = {
		pageSize,
		current: currentPage,
		total: totalHits,
	};

	const handleChange = (pagination: TablePaginationConfig) => {
		if (currentPage !== pagination.current)
			handlePageChange(pagination.current || 1);
		if (pageSize !== pagination.pageSize)
			handlePageSizeChange(pagination.pageSize || DEFAULT_PAGE_SIZE);
	};

	return (
		<Table<HardwareData>
			columns={columns}
			dataSource={items}
			size="middle"
			style={{ overflowX: "scroll" }}
			pagination={{ position: ["bottomLeft"], ...paginationState }}
			components={{
				body: {
					row: (props: any) => {
						return (
							<Link
								{...props}
								className="table-row"
								to={`/detail/${props["data-row-key"]}`}
							/>
						);
					},
				},
			}}
			rowKey={(r: HardwareData): string => r.id}
			onChange={handleChange}
		/>
	);
};

export default HardwareTable;
