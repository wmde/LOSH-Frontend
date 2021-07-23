import React from "react";
import { Row, Input } from "antd";
import { QueryContext } from "../context/query-context";

export const SearchBox = () => {
	const queryContext = React.useContext(QueryContext);

	return (
		<Row className="search-box">
			<label htmlFor="search">Search</label>
			<Input.Search
				id="search"
				placeholder="input search text"
				onSearch={(value) => {
					queryContext.setSearch(value);
				}}
				style={{ maxWidth: 400 }}
			/>
		</Row>
	);
};
