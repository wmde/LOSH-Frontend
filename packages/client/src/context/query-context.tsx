import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { HardwareData } from "../types";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEMS } from "../queries/get-items";
interface QueryContextState {
	search: string;
	items: HardwareData[];
	filters: any;
	currentPage: number;
	pageSize: number;
	totalHits: number;
	handleSearchChange: (value: string) => void;
	handlePageChange: (value: number) => void;
	handlePageSizeChange: (value: number) => void;
	handleFilterChange: (name: string, value: any) => void;
}

export const DEFAULT_PAGE_SIZE = 10;

export const QueryContext = React.createContext<QueryContextState>({
	search: "",
	items: [],
	filters: {},
	currentPage: 1,
	pageSize: DEFAULT_PAGE_SIZE,
	totalHits: 0,
	handleSearchChange: () => undefined,
	handlePageChange: () => undefined,
	handlePageSizeChange: () => undefined,
	handleFilterChange: () => undefined,
});

export const QueryProvider: React.FC = ({ children }) => {
	const location = useLocation();
	const queryParams = queryString.parse(location.search);

	const [search, setSearch] = useState((queryParams.search as string) || "");
	const [currentPage, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

	const [filters, setFilters] = useState<any>({});

	const [getItems, { loading, error, data }] = useLazyQuery(GET_ITEMS);

	const executeQuery = async () => {
		const variables = {
			query: search,
			page: currentPage,
			pageSize,
			licenseFilter: filters.license,
		};

		getItems({ variables });
	};

	const generateSearchParams = (
		search: string,
		page: number,
		pageSize: number,
		filters: any
	) => {
		const query: any = {};

		if (search) query.search = search;
		if (page > 1) query.page = page;
		if (pageSize !== DEFAULT_PAGE_SIZE) query.pageSize = pageSize;
		if (Object.keys(filters).length > 0)
			query.filters = JSON.stringify(filters);

		const result = queryString.stringify(query);

		return result ? `?${result}` : "";
	};

	const handleSearchChange = (value: string) => {
		setSearch(value);
		const params = generateSearchParams(value, 1, pageSize, filters);
		navigate(`/${params}`);
	};

	const handlePageChange = (value: number) => {
		setPage(value);
		const params = generateSearchParams(search, value, pageSize, filters);
		navigate(`/${params}`);
	};

	const handlePageSizeChange = (value: number) => {
		setPageSize(value);
		setPage(1);
		const params = generateSearchParams(search, 1, value, filters);
		navigate(`/${params}`);
	};

	const handleFilterChange = (name: string, value: any) => {
		const newFilters = { ...filters };
		newFilters[name] = filters[name] === value ? "" : value;
		setFilters(newFilters);
		setPage(1);
		const params = generateSearchParams(search, 1, pageSize, newFilters);
		navigate(`/${params}`);
	};

	useEffect(() => {
		executeQuery();
	}, [search, currentPage, pageSize, filters]);

	useEffect(() => {
		const searchValue = (queryParams.search as string) || "";
		const pageValue = Number(queryParams.page) || 1;
		const pageSizeValue = Number(queryParams.size) || DEFAULT_PAGE_SIZE;

		if (searchValue !== search) setSearch(searchValue);
		if (pageValue !== currentPage) setPage(pageValue);
		if (pageSizeValue !== pageSizeValue) setPageSize(pageSizeValue);
		if (queryParams.filters) {
			const filtersValue = JSON.parse(queryParams.filters as string);
			setFilters(filtersValue);
		}
	}, []);

	return (
		<QueryContext.Provider
			value={{
				search,
				items: data?.searchItems.items,
				filters,
				currentPage,
				pageSize,
				totalHits: data?.searchItems.total || 0,
				handleSearchChange,
				handlePageChange,
				handlePageSizeChange,
				handleFilterChange,
			}}
		>
			{children}
		</QueryContext.Provider>
	);
};
