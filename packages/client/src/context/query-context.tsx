import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HardwareData } from "../controller/types";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEMS } from "../controller/get-items";
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

	const [search, setSearch] = useState("");
	const [currentPage, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

	const [filters, setFilters] = useState<any>({
		license: "",
		dataSource: "",
	});

	const [getItems, { loading, error, data }] = useLazyQuery(GET_ITEMS);

	const executeQuery = async () => {
		const variables = {
			query: search,
			page: currentPage,
			pageSize,
			license: filters.license,
			dataSource: filters.dataSource,
		};
		getItems({ variables });
	};

	const generateSearchParams = (
		searchValue: string,
		pageValue: number,
		pageSizeValue: number,
		filters: any
	) => {
		let params = "";

		if (searchValue) {
			params += `?search=${searchValue}`;
		}

		if (pageValue > 1) {
			if (params.length) {
				params += "&";
			} else {
				params += "?";
			}

			params += `page=${pageValue}`;
		}

		if (pageSizeValue !== DEFAULT_PAGE_SIZE) {
			if (params.length) {
				params += "&";
			} else {
				params += "?";
			}

			params += `size=${pageSizeValue}`;
		}

		if (filters) {
			Object.entries(filters).map(([key, value]) => {
				if (!value) {
					return;
				}
				if (params.length) {
					params += "&";
				} else {
					params += "?";
				}

				params += `filter_${key}=${value}`;
			});
		}

		return params;
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
	}, [search, currentPage, pageSize, filters.license, filters.dataSources]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);
		const searchValue = urlSearchParams.get("search") || "";
		const pageValue = Number(urlSearchParams.get("page")) || 1;
		const pageSizeValue = Number(urlSearchParams.get("size")) || 10;
		const filterLicenseValue = Number(urlSearchParams.get("filter_licences"));

		if (searchValue !== search) setSearch(searchValue);
		if (pageValue !== currentPage) setPage(pageValue);
		if (pageSizeValue !== pageSizeValue) setPageSize(pageSizeValue);

		const filtersValue = {
			license: filterLicenseValue,
		};

		setFilters(filtersValue);
	}, [location.search]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);
		const initialSearch = urlSearchParams.get("search") || "";
		const initialPage = Number(urlSearchParams.get("page")) || 1;
		const initialPageSize =
			Number(urlSearchParams.get("size")) || DEFAULT_PAGE_SIZE;

		setSearch(initialSearch);
		setPage(initialPage);
		setPageSize(initialPageSize);
	}, []);

	return (
		<QueryContext.Provider
			value={{
				search,
				items: data?.searchItems.items,
				filters,
				currentPage,
				pageSize,
				totalHits: data?.searchItems.hits.total || 0,
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
