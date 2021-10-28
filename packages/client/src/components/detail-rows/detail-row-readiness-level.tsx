import { Typography } from "antd";
import React from "react";

const READINESS_LEVEL_COMMENTS: Record<string, string> = {
	1: "Basic principles observed",
	2: "Technology concept formulated",
	3: "Experimental proof of concept",
	4: "Technology validated in lab",
	5: "Technology validated in relevant environment",
	6: "Technology demonstrated in relevant environment",
	7: "System prototype demonstration in operational environment",
	8: "System complete and qualified",
	9: "Actual system proven in operational environment",
};

interface DetailRowReadinessLevelProps {
	title: string;
	value?: string;
}

function DetailRowReadinessLevel({
	title,
	value,
}: DetailRowReadinessLevelProps) {
	if (!value) return null;

	const readinessLevel = value.substr(value.length - 6);
	return (
		<p>
			<Typography.Text strong>{title}</Typography.Text>
			<br></br>
			<Typography.Text>
				{readinessLevel} (
				{READINESS_LEVEL_COMMENTS[readinessLevel.substring(5)]})
			</Typography.Text>
		</p>
	);
}

export default DetailRowReadinessLevel;
