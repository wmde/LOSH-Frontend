import { Typography } from "antd";
import React from "react";
import { HardwareData } from "../../types";

interface DetailRowLinkedFilesProps {
	data: HardwareData;
}

const generateLinkedFiles = (data: HardwareData) => {
	const relatedUrls = [];

	if (data.hasReadme) {
		const url =
			data.hasReadme.datavalue.result.originalUrl ||
			data.hasReadme.datavalue.result.identifier;
		relatedUrls.push({
			title: data.hasReadme.datavalue.result.name,
			value: url?.datavalue.value,
		});
	}

	if (data.hasUserManual) {
		const url =
			data.hasUserManual.datavalue.result.originalUrl ||
			data.hasUserManual.datavalue.result.identifier;
		relatedUrls.push({
			title: data.hasUserManual.datavalue.result.name,
			value: url?.datavalue.value,
		});
	}

	if (data.hasManufacturingInstructions) {
		const url =
			data.hasManufacturingInstructions.datavalue.result.originalUrl ||
			data.hasManufacturingInstructions.datavalue.result.identifier;
		relatedUrls.push({
			title: data.hasManufacturingInstructions.datavalue.result.name,
			value: url?.datavalue.value,
		});
	}

	if (data.hasManifestFile) {
		const url =
			data.hasManifestFile.datavalue.result.originalUrl ||
			data.hasManifestFile.datavalue.result.identifier;

		relatedUrls.push({
			title: data.hasManifestFile.datavalue.result.name,
			value: url?.datavalue.value,
		});
	}

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
