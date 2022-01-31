import { Typography } from "antd";
import React from "react";
import { HardwareData } from "../../types";

interface DetailRowLinkedFilesProps {
	data: HardwareData;
}

const generateLinkedFiles = (data: HardwareData) => {
	const relatedUrls: { title: string; value: string }[] = [];

	[
		"hasReadme",
		"hasUserManual",
		"hasManufacturingInstructions",
		"hasManifestFile",
	].forEach((propertyName) => {
		if (data[propertyName]) {
			const url =
				data[propertyName].datavalue.result.originalUrl ||
				data[propertyName].datavalue.result.identifier;
			relatedUrls.push({
				title: data[propertyName].datavalue.result.name,
				value: url?.datavalue.value,
			});
		}
	});

	return relatedUrls;
};

function DetailRowLinkedFiles({ data }: DetailRowLinkedFilesProps) {
	const linkedFiles = generateLinkedFiles(data);

	if (!linkedFiles.length) return null;

	return (
		<div>
			<Typography.Text strong>Linked Files</Typography.Text>
			<ul>
				{linkedFiles.map((url) => (
					<li key={url.title}>
						<a href={url.value} target="_blank" rel="noreferrer">
							{url.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default DetailRowLinkedFiles;
