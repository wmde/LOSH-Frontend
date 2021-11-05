///<reference types="cypress"/>

describe("detail view page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.fixture("detail-view-fixtures").then((data) => {
			const { getDetailsRes, getAllPost } = data;
			cy.intercept("POST", "/graphql", (req) => {
				if (req.body.query.includes("getItem")) {
					req.reply(getDetailsRes);
					return;
				}
				req.reply(getAllPost);
			}).as("getEntity");
			cy.visit("/detail/Q438");
			cy.wait("@getEntity");
		});
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
			.location("pathname")
			.should("eq", "/");
	});
});
