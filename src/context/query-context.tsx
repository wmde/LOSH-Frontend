import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QueryController, {
	DEFAULT_PAGE_SIZE,
} from "../controller/query-controller";
import { HardwareData } from "../controller/types";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
interface QueryContextState {
	search: string;
	items: HardwareData[];
	currentPage: number;
	pageSize: number;
	properties: Record<string, string>;
	controller: QueryController | null;
	totalHits: number;
	handleSearchChange: (value: string) => void;
	handlePageChange: (value: number) => void;
	handlePageSizeChange: (value: number) => void;
}

export const QueryContext = React.createContext<QueryContextState>({
	search: "",
	items: [],
	currentPage: 1,
	pageSize: DEFAULT_PAGE_SIZE,
	properties: {},
	controller: null,
	totalHits: 0,
	handleSearchChange: () => undefined,
	handlePageChange: () => undefined,
	handlePageSizeChange: () => undefined,
});

export const QueryProvider: React.FC = ({ children }) => {
	const location = useLocation();

	const [search, setSearch] = useState("");
	const [items, setItems] = useState<HardwareData[]>([]);
	const [currentPage, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
	const [controller, setController] = useState<QueryController>();

	const [properties, setProperties] = useState<Record<string, string>>({});
	const [totalHits, setTotalHits] = useState(0);

	const [ready, setReady] = useState(false);

	const setupController = async () => {
		const c = new QueryController({
			url: "https://losh.ose-germany.de",
		});

		setProperties(await c.getProperties());
		setController(c);
		setReady(true);
	};

	const executeQuery = async (c: QueryController) => {
		const query = {
			search,
			page: currentPage,
			limit: pageSize,
		};

		const newItems = await c.getItems(query);
		setItems(newItems.entities);
		setTotalHits(newItems.totalHits);
	};

	const generateSearchParams = (
		searchValue: string,
		pageValue: number,
		pageSizeValue: number
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

			params += `limit=${pageSizeValue}`;
		}

		return params;
	};

	const handleSearchChange = (value: string) => {
		setSearch(value);
		const params = generateSearchParams(value, 1, pageSize);
		navigate(`/${params}`);
	};

	const handlePageChange = (value: number) => {
		setPage(value);
		const params = generateSearchParams(search, value, pageSize);
		navigate(`/${params}`);
	};

	const handlePageSizeChange = (value: number) => {
		setPageSize(value);
		setPage(1);
		const params = generateSearchParams(search, 1, value);
		navigate(`/${params}`);
	};

	useEffect(() => {
		if (controller) executeQuery(controller);
	}, [search, currentPage, controller]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);
		const searchValue = urlSearchParams.get("search") || "";
		const pageValue = Number(urlSearchParams.get("page")) || 1;

		if (searchValue !== search) setSearch(searchValue);
		if (pageValue !== currentPage) setPage(pageValue);
	}, [location.search]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);
		const initialSearch = urlSearchParams.get("search") || "";
		const initialPage = Number(urlSearchParams.get("page")) || 1;

		setupController();
		setSearch(initialSearch);
		if (initialPage) {
			setPage(initialPage);
		}
	}, []);

	if (!ready || !controller) {
		return <></>;
	}

	return (
		<QueryContext.Provider
			value={{
				search,
				items,
				currentPage,
				pageSize,
				properties,
				controller,
				totalHits,
				handleSearchChange,
				handlePageChange,
				handlePageSizeChange,
			}}
		>
			{children}
		</QueryContext.Provider>
	);
};
