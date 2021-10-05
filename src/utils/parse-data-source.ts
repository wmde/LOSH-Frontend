export const parseDataSource = (originalUrl: string | undefined): string => {
	if (!originalUrl) {
		return "";
	}

	if (originalUrl.includes("wikifactory")) {
		return "Wikifactory";
	}

	if (originalUrl.includes("appropedia")) {
		return "Appropedia";
	}

	if (originalUrl.includes("gitlab")) {
		return "Gitlab";
	}

	if (originalUrl.includes("github")) {
		return "Github";
	}

	return "";
};
