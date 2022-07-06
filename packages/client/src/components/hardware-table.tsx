import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useContext } from "react";
import { DEFAULT_PAGE_SIZE, QueryContext } from "../context/query-context";
import { PaginationProps } from "antd/lib/pagination/Pagination";
import { HardwareData } from "../types";
import { Properties } from "../constants";
import { Link } from "gatsby";
import "./hardware-table.css";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import { Pagination } from "antd";
import Papa from "papaparse";

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
		responsive: ["lg"],
		ellipsis: true,
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
		responsive: ["lg"],
	},
	{
		title: "Repository",
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
		responsive: ["lg"],
	},
	{
		title: "Organisation",
		key: Properties.ORGANISATION,
		dataIndex: Properties.ORGANISATION,
		render: (v, record) => record.organisation?.datavalue.value,
		responsive: ["lg"],
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

	const handleChange = (page: number, newPageSize?: number) => {
		if (currentPage !== page) handlePageChange(page || 1);
		if (newPageSize !== pageSize)
			handlePageSizeChange(newPageSize || DEFAULT_PAGE_SIZE);
	};

	const downloadResultsAsCSV = () => {
		const results = items.map((result) => ({
			Name: result.name,
			ID: result.id,
			Version: result.version?.datavalue.value,
			License: result.spdxLicense?.datavalue.value,
			Repository: result.repo?.datavalue.value,
			Organisation: result.organisation?.datavalue.value,
		}));
		const csv = Papa.unparse(results);
		const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		let csvURL = null;
		// For IE support
		if ((navigator as any).msSaveBlob) {
			csvURL = (navigator as any).msSaveBlob(csvData, "download.csv");
		} else {
			csvURL = window.URL.createObjectURL(csvData);
		}
		const tempLink = document.createElement("a");
		tempLink.href = csvURL as string;
		tempLink.setAttribute(
			"download",
			`LOSHExploreData-${new Date().getTime()}.csv`
		);
		tempLink.click();
	};

	return (
		<>
			<Table<HardwareData>
				columns={columns}
				dataSource={items}
				size="middle"
				pagination={false}
				style={{ overflowX: "scroll" }}
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
			/>
			<div className="hardware-table__footer">
				<Pagination onChange={handleChange} {...paginationState}></Pagination>
				<Button
					icon={<DownloadOutlined />}
					onClick={downloadResultsAsCSV}
					id="download-results-csv"
				>
					Download Results
				</Button>
			</div>
		</>
	);
};

export default HardwareTable;
