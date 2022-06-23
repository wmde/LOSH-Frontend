function presentVersion(version: string) {
	if (version.length === 40 && version.match(/^[a-z0-9]+$/)) {
		return version.substr(0, 8);
	}
	return version;
}

export { presentVersion };
