///<reference types="cypress"/>

describe("detail view page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.intercept(
			"GET",
			"https://losh.ose-germany.de/w/api.php?action=wbgetentities&ids=Q438&format=json&origin=*",
			{ fixture: "getEntityResponse" }
		).as("getEntity");
		cy.visit("/detail/Q438");
		cy.wait("@getEntity");
	});

	it("displays download button", () => {
		cy.get(".anticon-download")
			.should("be.visible")
			.parents("a")
			.should("have.attr", "href");
	});
});
