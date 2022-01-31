import React, { useState } from "react";
import { Row, Input } from "antd";
import { QueryContext } from "../context/query-context";
import "./search-box.css";
import { useEffect } from "react";

export const SearchBox: React.FC = () => {
	const { search, handleSearchChange } = React.useContext(QueryContext);

	const [currentValue, setCurrentValue] = useState(search);

	useEffect(() => {
		if (!currentValue) {
			setCurrentValue(search);
		}
	}, []);

	return (
		<Row className="search-box">
			<label htmlFor="search">Search</label>
			<Input.Search
				id="search"
				placeholder="input search text"
				allowClear
				onSearch={handleSearchChange}
				onChange={(e) => setCurrentValue(e.target.value)}
				value={currentValue}
				style={{ maxWidth: 400 }}
			/>
		</Row>
	);
};
