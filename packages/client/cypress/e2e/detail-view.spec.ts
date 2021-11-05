///<reference types="cypress"/>

describe("detail view page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.fixture("test-fixtures").then((data) => {
			const { ohLoom, getAllPosts } = data;
			cy.intercept("POST", "/graphql", (req) => {
				if (req.body.variables.id === "Q438") {
					req.reply(ohLoom);
					return;
				}
				const { page } = req.body.variables;
				req.reply(getAllPosts[`page${page}`]);
			}).as("getData");
			cy.visit("/detail/Q438");
			cy.wait("@getData");
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
