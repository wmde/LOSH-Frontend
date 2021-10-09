import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface DetailRowDownload {
	repoUrl?: string;
}

const generateDownloadUrl = (repositoryUrl: string) => {
	if (repositoryUrl.includes("gitlab.com")) {
		const split = repositoryUrl.split("/");
		const repoName = split[split.length - 1];
		return `${repositoryUrl}-/archive/master/${repoName}-master.zip`;
	} else if (repositoryUrl.includes("github.com")) {
		return `${repositoryUrl}/archive/refs/heads/master.zip`;
	} else if (repositoryUrl.includes("wikifactory.com")) {
		return `${repositoryUrl}/files`;
	}
};

function DetailRowDownload({ repoUrl }: DetailRowDownload) {
	if (!repoUrl) return null;

	return (
		<p>
			<a href={generateDownloadUrl(repoUrl)} target="_blank" rel="noreferrer">
				<Button icon={<DownloadOutlined />}>Download Bundle</Button>
			</a>
		</p>
	);
}

export default DetailRowDownload;
