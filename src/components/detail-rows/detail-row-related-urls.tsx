import { Typography } from "antd";
import React from "react";
import { HardwareData } from "../../controller/types";

interface DetailRowRelatedUrlsProps {
	data: HardwareData;
}

const generateRelatedUrls = (data: HardwareData) => {
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

function DetailRowRelatedUrls({ data }: DetailRowRelatedUrlsProps) {
	const relatedUrls = generateRelatedUrls(data);

	if (!relatedUrls.length) return null;

	return (
		<p>
			<Typography.Text strong>Related URLs</Typography.Text>
			<ul>
				{relatedUrls.map((url) => (
					<li key={url.title}>
						<a href={url.value} target="_blank" rel="noreferrer">
							{url.title}
						</a>
					</li>
				))}
			</ul>
		</p>
	);
}

export default DetailRowRelatedUrls;
