import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QueryController from "../controller/query-controller";
import { HardwareData } from "../controller/types";

interface QueryContextState {
	search: string;
	setSearch: (value: string) => void;
	items: HardwareData[];
	currentPage: number;
	setPage: (value: number) => void;
	setSorting: (value: any) => void;
	properties: Record<string, string>;
	controller: QueryController | null;
	totalHits: number;
}

export const QueryContext = React.createContext<QueryContextState>({
	search: "",
	setSearch: () => undefined,
	items: [],
	currentPage: 1,
	setPage: () => undefined,
	setSorting: () => undefined,
	properties: {},
	controller: null,
	totalHits: 0,
});

export const QueryProvider: React.FC = ({ children }) => {
	const [search, setSearch] = useState("");
	const [items, setItems] = useState<HardwareData[]>([]);
	const [currentPage, setPage] = useState<number>(1);
	const [controller, setController] = useState<QueryController>();

	const [properties, setProperties] = useState<Record<string, string>>({});
	const [totalHits, setTotalHits] = useState(0);

	const [sorting, setSorting] = useState();

	const [ready, setReady] = useState(false);

	const setupController = async () => {
		const c = new QueryController({
			url: "https://losh.ose-germany.de",
		});

		setProperties(await c.getProperties());
		setController(c);
		executeQuery(c);
		setReady(true);
	};

	const executeQuery = async (c: QueryController) => {
		const query = {
			search,
			page: currentPage,
		};

		const newItems = await c.getItems(query);
		setItems(newItems.entities);
		setTotalHits(newItems.totalHits);
	};

	useEffect(() => {
		if (controller) executeQuery(controller);
	}, [search, currentPage]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);

		const initialSearch = urlSearchParams.get("search") || "";

		const initialPage = Number(urlSearchParams.get("page")) || 1;

		setSearch(initialSearch);

		setupController();

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
				setSearch,
				items,
				currentPage,
				setPage,
				properties,
				controller,
				totalHits,
				setSorting,
			}}
		>
			{children}
		</QueryContext.Provider>
	);
};
