import { Typography } from "antd";
import React from "react";

interface DetailRowUrlProps {
	title: string;
	value?: string;
	label?: string;
}

function DetailRowUrl({ title, value, label }: DetailRowUrlProps) {
	if (!value) return null;

	console.log({ value });
	return (
		<p>
			<Typography.Text strong>{title}</Typography.Text>
			<br></br>
			<Typography.Text>
				<a href={value} target="_blank" rel="noreferrer">
					{label || value}
				</a>
			</Typography.Text>
		</p>
	);
}

export default DetailRowUrl;
