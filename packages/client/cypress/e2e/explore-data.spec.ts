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

	it("table displays search results", () => {
		cy.intercept(
			"GET",
			"https://losh.ose-germany.de/w/api.php?action=query&list=search&srsearch=robi+haswbstatement%3AP1426%3Dhttps%3A%2F%2Fgithub.com%2FOPEN-NEXT%2FOKH-LOSH%2Fraw%2Fmaster%2FOKH-LOSH.ttl%23Module&format=json&srnamespace=120&srlimit=10&sroffset=0&origin=*",
			{ fixture: "queryResponse" }
		).as("query");
		cy.intercept(
			"GET",
			"https://losh.ose-germany.de/w/api.php?action=wbgetentities&ids=Q513%7CQ599%7CQ608%7CQ601%7CQ535&format=json&origin=*",
			{ fixture: "getEntitiesResponse" }
		).as("getEntities");
		cy.get("#search").should("be.visible").type("robi");
		cy.get(".ant-input-search-button").should("be.visible").click();
		cy.wait("@query");
		cy.wait("@getEntities");
		cy.get(".ant-table-tbody")
			.find("tr")
			.should("have.length", 5)
			.should("be.visible");
	});
});
