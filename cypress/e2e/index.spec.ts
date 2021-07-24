/// <reference types="Cypress" />
describe("Accessibility tests", () => {
	beforeEach(() => {
		cy.visit("/").get("main");
	});
	it("renders the logo", () => {
		cy.get(".logo__text").should("exist");
	});
});
