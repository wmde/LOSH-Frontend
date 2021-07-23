import React from "react";

export const QueryProvider: React.FC = ({ children }) => {
	const [search, setSearch] = React.useState("");
	return (
		<QueryContext.Provider value={{ search, setSearch }}>
			{children}
		</QueryContext.Provider>
	);
};

export const QueryContext = React.createContext({
	search: "",
	setSearch = (value: string) => null,
});
