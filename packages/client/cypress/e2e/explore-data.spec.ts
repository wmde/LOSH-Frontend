///<reference types="cypress"/>

describe("explore data page tests", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("search box displays placeholder", () => {
		cy.get("#search[placeholder='input search text']").should("be.visible");
	});

	it("search box displays input", () => {
		cy.get("#search")
			.should("be.visible")
			.invoke("attr", "value", "foo")
			.should("have.value", "foo")
			.should("be.visible");
	});

	it("displays search results in data table", () => {
		cy.fixture("explore-data-fixtures").then((data) => {
			const { resBody } = data.searchPost;
			const tblData = resBody.data.searchItems.items;
			cy.intercept("POST", "http://localhost:3000/graphql", {
				statusCode: 201,
				body: resBody,
			}).as("query");
			const SEARCHTERM = "ohloom";
			cy.get("#search").should("be.visible").type(SEARCHTERM);
			cy.get(".ant-input-search-button").should("be.visible").click();
			cy.wait("@query");
			cy.get(".ant-table-tbody")
				.find("a.table-row")
				.should("have.length", tblData.length)
				.should("be.visible");
		});
	});

	it("checks if table data changes with page", () => {
		cy.fixture("explore-data-fixtures").then((data) => {
			const responses = data.getAllPosts;
			cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
				const { page } = req.body.variables;
				req.reply((res) => {
					res.body = responses[`page${page}`];
				});
			}).as("getAll");
			cy.get(".ant-table", { timeout: 10000 })
				.should("be.visible")
				.then(() => {
					cy.get(".ant-pagination-next").as("pageFwd").pageChecker();
					cy.get(".ant-pagination-item-4").as("pageNumber").pageChecker();
					cy.get(".ant-pagination-prev").as("pageBack").pageChecker();
				});
		});
	});

	it("accessess table entry's detail page", () => {
		cy.get(".ant-table-tbody>a.table-row>td", { timeout: 10000 })
			.first()
			.as("detailLink")
			.invoke("attr", "href")
			.then((url) => {
				cy.get("@detailLink").click();
				cy.location("href").should("contain", url);
			});
	});
});
