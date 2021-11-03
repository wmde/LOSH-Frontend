///<reference types="cypress"/>

describe("detail view page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.fixture("detail-view-fixtures").then((data) => {
			const { getDetailsRes, getAllPost } = data;
			cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
				req.reply((res) => {
					if (req.body.getItem) {
						res.body = getDetailsRes;
					}
					res.body = getAllPost;
				});
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
