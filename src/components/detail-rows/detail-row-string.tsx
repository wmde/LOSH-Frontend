import { Typography } from "antd";
import React from "react";

interface DetailRowStringProps {
	title: string;
	value?: string;
}

function DetailRowString({ title, value }: DetailRowStringProps) {
	if (!value) return null;

	return (
		<p>
			<Typography.Text strong>{title}</Typography.Text>
			<br></br>
			<Typography.Text>{value}</Typography.Text>
		</p>
	);
}

export default DetailRowString;
