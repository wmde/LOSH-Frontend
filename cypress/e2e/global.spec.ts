/// <reference types="Cypress" />

describe("navbar tests", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("check logo link", () => {
		cy.get(".logo").should("be.visible").and("have.attr", "href", "/");
	});

	it("checks menu's page links", () => {
		cy.viewport("macbook-15")
			.wait(200)
			.get(".ant-menu-horizontal>li>span>a")
			.should("be.visible")
			.linkChecker("navSlugs", "slugs");
	});

	it("checks for collapsed (mobile) menu and it's page links", () => {
		cy.viewport("ipad-mini")
			.wait(200)
			.get("#mobile-menu-button")
			.should("be.visible")
			.click();
		cy.get(".ant-dropdown-menu-vertical>li>span>a")
			.should("be.visible")
			.linkChecker("navSlugs", "slugs");
	});
});
describe("footer tests", () => {
	it("checks footer links", () => {
		cy.visit("/")
			.get(".ant-layout-footer>div>a")
			.should("be.visible")
			.each((link) => {
				cy.request(link.prop("href")).then((res) => {
					expect(res.status).eq(200);
				});
			});
	});
});
