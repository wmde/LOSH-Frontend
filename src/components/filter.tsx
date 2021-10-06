import * as React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";
import { QueryContext } from "../context/query-context";

type MenuItems = Record<string, boolean>;

const menu = (
	items: MenuItems,
	parentName: string,
	handleFilterChange: any
) => (
	<Menu>
		{Object.entries(items).map(([childName, value]) => {
			return (
				<Menu.Item
					key={childName}
					onClick={() => handleFilterChange(parentName, childName, !value)}
					icon={value && <CheckOutlined />}
				>
					{childName}
				</Menu.Item>
			);
		})}
	</Menu>
);

const certifiedProjects = [
	{
		name: "True",
	},
	{
		name: "Cert type 2",
	},
];

const organisations = [
	{
		name: "True",
	},
];

const licences = [
	{
		name: "True",
	},
];

const dataSources = [
	{
		name: "True",
	},
];

function Filter(): JSX.Element {
	const { filters, handleFilterChange } = React.useContext(QueryContext);

	return (
		<Space wrap className="filter">
			{Object.entries(filters).map(([key, value]) => (
				<Dropdown
					key={key}
					overlay={menu(value, key, handleFilterChange)}
					trigger={["click"]}
				>
					<Button>
						{key} <DownOutlined />
					</Button>
				</Dropdown>
			))}
		</Space>
	);
}

export default Filter;
