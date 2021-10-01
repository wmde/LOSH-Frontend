/// <reference types="Cypress" />
describe("Accessibility tests", () => {
	beforeEach(() => {
		cy.visit("/").get("main");
	});
	it("renders the logo", () => {
		cy.get(".logo__text").should("exist");
	});
	it("renders the main menu", () => {
		cy.viewport("macbook-15");
		cy.wait(200);
		cy.get("#main-menu").should("exist");
	});
	it("opens the mobile menu", () => {
		cy.viewport("ipad-mini");
		cy.wait(200);
		cy.get("#mobile-menu-button").click();
		cy.get("#main-menu").should("exist");
	});
});
