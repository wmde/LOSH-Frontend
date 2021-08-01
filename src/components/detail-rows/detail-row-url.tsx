import { Typography } from "antd";
import React from "react";

interface DetailRowUrlProps {
	title: string;
	value?: string;
}

function DetailRowUrl({ title, value }: DetailRowUrlProps) {
	if (!value) return null;

	return (
		<p>
			<Typography.Text strong>{title}</Typography.Text>
			<br></br>
			<Typography.Text>
				<a href={value} target="_blank" rel="noreferrer">
					{value}
				</a>
			</Typography.Text>
		</p>
	);
}

export default DetailRowUrl;
