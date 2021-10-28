import { Typography } from "antd";
import React from "react";
import { DataValueItem } from "../../controller/types";

interface DetailRowPartsProps {
	hasComponents: DataValueItem | undefined;
}

function DetailRowParts({ hasComponents }: DetailRowPartsProps) {
	if (!hasComponents) return null;
	return (
		<div>
			<Typography.Text strong>Designed parts</Typography.Text>
			<br></br>
			<ul>
				<li>
					<Typography.Text>
						{hasComponents.datavalue.result.name}
					</Typography.Text>
				</li>
			</ul>
		</div>
	);
}

export default DetailRowParts;
