import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QueryController, { HardwareData } from "../query-controller";

export const QueryContext = React.createContext({
	search: "",
	setSearch: (value: string): void => undefined,
	items: [] as HardwareData[],
});

export const QueryProvider: React.FC = ({ children }) => {
	const [search, setSearch] = useState("");
	const [items, setItems] = useState<HardwareData[]>([]);
	const [page, setPage] = useState<number>(1);
	const controller = new QueryController();

	const executeQuery = () => {
		const query = {
			search,
			page,
		};

		const newItems = controller.getItems({ search, page });
		setItems(newItems);
	};

	useEffect(() => {
		executeQuery();
	}, [search]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(location.search);

		const initialSearch = urlSearchParams.get("search") || "";

		const initialPage = Number(urlSearchParams.get("page")) || 1;

		setSearch(initialSearch);
		if (initialPage) {
			setPage(initialPage);
		}
	}, []);

	return (
		<QueryContext.Provider value={{ search, setSearch, items }}>
			{children}
		</QueryContext.Provider>
	);
};
