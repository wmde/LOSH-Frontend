///<reference types="cypress"/>

describe("explore data page tests", () => {
	beforeEach("match query and stub response", () => {
		cy.fixture("test-fixtures").then((data) => {
			const { miniCncMachine, searchResults, getAllPosts } = data;
			cy.intercept("POST", "/graphql", (req) => {
				if (req.body.variables.id === "Q587") {
					req.reply(miniCncMachine);
					return;
				} else if (req.body.variables.query === "ohloom") {
					req.reply(searchResults);
					return;
				}
				const { page } = req.body.variables;
				req.reply(getAllPosts[`page${page}`]);
			}).as("getData");
			cy.visit("/");
			cy.wait("@getData");
		});
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
		cy.fixture("test-fixtures").then((data) => {
			const { items } = data.searchResults.data.searchItems;
			const SEARCHTERM = "ohloom";
			cy.get("#search").should("be.visible").type(SEARCHTERM);
			cy.get(".ant-input-search-button").should("be.visible").click();
			cy.wait("@getData");
			cy.get(".ant-table-tbody")
				.find("a.table-row")
				.should("have.length", items.length)
				.should("be.visible");
		});
	});

	// TODO: Flaky test in pipeline
	// it("checks if table data changes with page", () => {
	// 	cy.get(".ant-table", { timeout: 10000 })
	// 		.should("be.visible")
	// 		.then(() => {
	// 			cy.get(".ant-pagination-next").as("pageFwd").pageChecker("@getData");
	// 			cy.get(".ant-pagination-item-4")
	// 				.as("pageNumber")
	// 				.pageChecker("@getData");
	// 			cy.get(".ant-pagination-prev").as("pageBack").pageChecker("@getData");
	// 		});
	// });

	it("accessess table entry's detail page", () => {
		cy.fixture("test-fixtures").then((data) => {
			const { id } = data.miniCncMachine.data.getItem;
			cy.contains(".ant-table-cell", "Mini CNC machine(stub)")
				.should("be.visible")
				.click();
			cy.wait("@getData");
			cy.location("href").should("contain", id);
		});
	});
});
