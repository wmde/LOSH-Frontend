import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QueryController, { HardwareData } from "../query-controller";

interface QueryContextState {
	search: string;
	setSearch: (value: string) => void;
	items: HardwareData[];
	currentPage: number;
	setPage: (value: number) => void;
	properties: Record<string, string>
}

export const QueryContext = React.createContext<QueryContextState>({
	search: "",
	setSearch: () => undefined,
	items: [],
	currentPage: 1,
	setPage: () => undefined,
	properties: {}
});

export const QueryProvider: React.FC = ({ children }) => {
	const [search, setSearch] = useState("");
	const [items, setItems] = useState<HardwareData[]>([]);
	const [currentPage, setPage] = useState<number>(1);
	const [controller, setController] = useState<QueryController>();

	const [properties, setProperties] = useState<Record<string, string>>({})

	const setupController = async () => {
		const c = new QueryController({
			url: 'https://wikibase-reconcile-testing.wmcloud.org'
		});

		setProperties(await c.getProperties());
		setController(c)
		executeQuery(c);
	}

	const executeQuery = async (c: QueryController) => {

		const query = {
			search,
			page: currentPage,
		};

		const newItems = await c.getItems(query);
		console.log({ newItems })
		setItems(newItems);
	};

	useEffect(() => {
		if(controller)
		executeQuery(controller);
	}, [search, currentPage]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);

		const initialSearch = urlSearchParams.get("search") || "";

		const initialPage = Number(urlSearchParams.get("page")) || 1;

		setSearch(initialSearch);

		setupController()

		if (initialPage) {
			setPage(initialPage);
		}
	}, []);

	return (
		<QueryContext.Provider
			value={{ search, setSearch, items, currentPage, setPage, properties }}
		>
			{children}
		</QueryContext.Provider>
	);
};
