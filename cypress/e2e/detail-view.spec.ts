///<reference types="cypress"/>

describe("detail view page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.intercept(
			"GET",
			"https://losh.ose-germany.de/w/api.php?action=wbgetentities&ids=Q438&format=json&origin=*",
			{ fixture: "detailViewGetResponse.json" }
		).as("getEntity");
		cy.visit("/detail/Q438");
		cy.wait("@getEntity");
	});

	it("has download button", () => {
		cy.get("#downloadBtn")
			.should("be.visible")
			.parents("a")
			.should("have.attr", "href");
	});
	it("has external repo link", () => {
		cy.get("#repoBtn")
			.should("be.visible")
			.parents("a")
			.should("have.attr", "href");
	});

	it("has back button", () => {
		cy.get("#back")
			.should("be.visible")
			.click()
			.wait(2000)
			.location("pathname")
			.should("eq", "/");
	});
});
