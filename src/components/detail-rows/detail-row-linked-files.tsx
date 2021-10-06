import { Typography } from "antd";
import React from "react";
import { HardwareData } from "../../controller/types";

interface DetailRowLinkedFilesProps {
	data: HardwareData;
}

const generateLinkedFiles = (data: HardwareData) => {
	const relatedUrls = [];

	if (data.hasReadme) {
		relatedUrls.push({
			title: data.hasReadme.datavalue.result.name,
			value: data.hasReadme.datavalue.result.identifier?.datavalue.value,
		});
	}

	if (data.hasUserManual) {
		relatedUrls.push({
			title: data.hasUserManual.datavalue.result.name,
			value: data.hasUserManual.datavalue.result.identifier?.datavalue.value,
		});
	}

	if (data.hasManufacturingInstructions) {
		relatedUrls.push({
			title: data.hasManufacturingInstructions.datavalue.result.name,
			value:
				data.hasManufacturingInstructions.datavalue.result.identifier?.datavalue
					.value,
		});
	}

	if (data.hasManifestFile) {
		relatedUrls.push({
			title: data.hasManifestFile.datavalue.result.name,
			value: data.hasManifestFile.datavalue.result.identifier?.datavalue.value,
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
