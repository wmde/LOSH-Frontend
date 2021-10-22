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
			const { entitiesResponse, searchResponse } = data;

			cy.intercept(
				"GET",
				"https://losh.ose-germany.de/w/api.php?action=query&list=search&srsearch=robi+haswbstatement%3AP1426%3Dhttps%3A%2F%2Fgithub.com%2FOPEN-NEXT%2FOKH-LOSH%2Fraw%2Fmaster%2FOKH-LOSH.ttl%23Module&format=json&srnamespace=120&srlimit=10&sroffset=0&origin=*",
				searchResponse
			).as("query");
			cy.intercept(
				"GET",
				"https://losh.ose-germany.de/w/api.php?action=wbgetentities&ids=Q513%7CQ599%7CQ608%7CQ601%7CQ535&format=json&origin=*",
				entitiesResponse
			).as("getEntities");
		});
		const searchTerm = "robi";
		cy.get("#search").should("be.visible").type(searchTerm);
		cy.get(".ant-input-search-button").should("be.visible").click();
		cy.wait("@query");
		cy.wait("@getEntities");
		cy.get(".ant-table-tbody")
			.find("a.table-row")
			.should("have.length", 5)
			.should("be.visible");
	});

	it("checks if table data changes with page", () => {
		cy.fixture("explore-data-fixtures").then((data) => {
			const { getAllResponse, tableDataRes, pageQueryRes, pageEntitiesRes } =
				data;

			interceptMaker(tableDataRes, "tableData");
			interceptMaker(pageQueryRes, "pageQuery");
			interceptMaker(pageEntitiesRes, "pageEntities");

			cy.intercept(
				"GET",
				"https://losh.ose-germany.de/w/api.php?action=query&list=allpages&apnamespace=122&aplimit=max&format=json&origin=*",
				getAllResponse
			).as("getAll");

			function interceptMaker(dataArray, varName) {
				for (let i = 0; i < dataArray.length; i++) {
					cy.intercept("GET", dataArray[i].req, dataArray[i].res).as(
						`${varName + i}`
					);
				}
			}
		});

		cy.get(".ant-table", { timeout: 10000 })
			.should("be.visible")
			.then(() => {
				cy.get(".ant-pagination-next")
					.as("pageFwd")
					.pageChecker("@pageEntities1");
				cy.get(".ant-pagination-item-4")
					.as("pageNumber")
					.pageChecker("@pageEntities3");
				cy.get(".ant-pagination-prev")
					.as("pageBack")
					.pageChecker("@pageEntities2");
			});
	});

	it("accessess table entry's detail page", () => {
		cy.get(".ant-table-tbody>a.table-row>td>a", { timeout: 10000 })
			.first()
			.as("detailLink")
			.invoke("attr", "href")
			.then((url) => {
				cy.get("@detailLink").click();
				cy.location("href").should("contain", url);
			});
	});
});
