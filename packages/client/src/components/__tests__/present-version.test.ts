import { presentVersion } from "../present-version";

describe("Version presenter", () => {
	it("empty version remains an empty string", () => {
		expect(presentVersion("")).toBe("");
	});

	it("regular version remains unchanged", () => {
		expect(presentVersion("1.2.3")).toBe("1.2.3");
	});

	it("git commit sha is trimmed to 8 first characters", () => {
		expect(presentVersion("abcdef1234567890abcdef123456789012345678")).toBe(
			"abcdef12"
		);
	});

	it("39-character string reminiscing git sha remains unchanged", () => {
		expect(presentVersion("abcdef1234567890abcdef12345678901234567")).toBe(
			"abcdef1234567890abcdef12345678901234567"
		);
	});

	it("41-character string reminiscing git sha remains unchanged", () => {
		expect(presentVersion("abcdef1234567890abcdef1234567890123456789")).toBe(
			"abcdef1234567890abcdef1234567890123456789"
		);
	});
});
