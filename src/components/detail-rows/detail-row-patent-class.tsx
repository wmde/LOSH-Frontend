import React, { useEffect, useState } from "react";
import { Typography } from "antd";

interface DetailRowPatentClassProps {
	value: string | undefined;
}

function DetailRowPatentClass({ value }: DetailRowPatentClassProps) {
	if (!value) return null;

	const valueForApi = value.replace(/ /g, "").replace(/\//g, "-");

	const url = `https://data.epo.org/linked-data/def/cpc/${valueForApi}.json`;

	const [cpcDesignation, setCpcDesignation] = useState();

	async function fetchCpcLinkedData() {
		const cpcData = await fetch(url).then((d) => d.json());
		setCpcDesignation(cpcData.result.primaryTopic.fullTitle);
	}

	useEffect(() => {
		fetchCpcLinkedData();
	}, []);

	return (
		<p>
			<Typography.Text strong>CPC Patent Class</Typography.Text>
			<br></br>
			<Typography.Text>
				<span>
					<a
						href={`https://worldwide.espacenet.com/patent/cpc-browser#!/CPC=${value}`}
						target="_blank"
						rel="noreferrer"
					>
						{value}
					</a>
					{cpcDesignation && <span>&nbsp;({cpcDesignation})</span>}
				</span>
			</Typography.Text>
		</p>
	);
}

export default DetailRowPatentClass;
