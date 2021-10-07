import React from "react";
import DetailRowString from "./detail-row-string";

interface DetailRowOuterDimensionsProps {
	value: string | undefined;
}

const parseOpenSCADPrimitive = (value: string) => {
	let parsed = "";

	if (value?.startsWith("cube")) {
		const regex = /\[(.*?)\]/;
		const matched = regex.exec(value);
		const dimensions = matched && matched[1];
		if (dimensions) {
			parsed = `${dimensions?.split(",").join("mm × ")}mm`;
		}
	} else if (value?.startsWith("sphere")) {
		const regex = /\((.*?)\)/;
		const matched = regex.exec(value);
		const dimensions = matched && matched[1];

		const RADIUS_DIAMETER: Record<string, string> = {
			r: "radius",
			d: "diameter",
		};
		if (dimensions) {
			const radiusOrDiameter = RADIUS_DIAMETER[dimensions[0]];
			parsed = `${dimensions.substr(
				3,
				dimensions.length - 3
			)}mm ${radiusOrDiameter}`;
		}
	} else if (value?.startsWith("cylinder")) {
		const regex = /\((.*?)\)/;
		const matched = regex.exec(value);
		const dimensions = matched && matched[1].split(", ");

		const HEIGHT_WIDTH: Record<string, string> = {
			h: "height",
			r: "radius",
		};

		if (dimensions) {
			parsed = dimensions
				?.map((d) => {
					const v = d.split("=");
					return `${v[1]}mm ${HEIGHT_WIDTH[v[0]]}`;
				})
				.join(", ");
		}
	}

	return parsed || value;
};

function DetailRowOuterDimensions({ value }: DetailRowOuterDimensionsProps) {
	if (!value) return null;

	const parsedValue = parseOpenSCADPrimitive(value);

	return <DetailRowString title={"Outer Dimensions"} value={parsedValue} />;
}

export default DetailRowOuterDimensions;
