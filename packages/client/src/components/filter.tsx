import * as React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";
import { QueryContext } from "../context/query-context";

type MenuItems = Array<{
	name: string;
	value: string;
}>;

const menu = (
	items: MenuItems,
	onClickItem: any,
	menuName: string,
	currentValue: string
) => (
	<Menu>
		{items.map((item) => (
			<Menu.Item
				key={item.name}
				onClick={() => onClickItem(menuName, item)}
				icon={currentValue === item.value && <CheckOutlined />}
			>
				{item.name}
			</Menu.Item>
		))}
	</Menu>
);

const certifiedProjects = [
	{
		name: "True",
		value: "true",
	},
	{
		name: "Cert type 2",
		value: "false",
	},
];

const organisations = [
	{
		name: "True",
	},
];

const licences = [
	{
		name: "Weak",
		value: "weak",
	},
	{
		name: "Strong",
		value: "strong",
	},
	{
		name: "Non Copyleft",
		value: "non",
	},
];

const dataSources = [
	{
		name: "Github",
		value: "github",
	},
	{
		name: "GitLab",
		value: "gitlab",
	},
	{
		name: "Appropedia",
		value: "appropedia",
	},
	{
		name: "Wikifactory",
		value: "Wikifactory",
	},
	{
		name: "OSHWA",
		value: "oshwa",
	},
];

function Filter(): JSX.Element {
	const { filters, handleFilterChange } = React.useContext(QueryContext);

	const handleClickItem = (name: string, item: any) => {
		handleFilterChange(name, item.value);
	};

	return (
		<Space wrap className="filter">
			<Dropdown
				overlay={menu(licences, handleClickItem, "licences", filters.licences)}
				trigger={["click"]}
			>
				<Button>
					License <DownOutlined />
				</Button>
			</Dropdown>
			{/* <Dropdown overlay={menu(certifiedProjects, handleClickItem, "certifiedProjects", filters.certifiedProjects)} trigger={["click"]}>
				<Button>
					Certified Project <DownOutlined />
				</Button>
			</Dropdown> */}
			<Dropdown
				overlay={menu(
					dataSources,
					handleClickItem,
					"dataSources",
					filters.dataSources
				)}
				trigger={["click"]}
			>
				<Button>
					Data Source <DownOutlined />
				</Button>
			</Dropdown>
			{/* <Dropdown overlay={menu(organisations, handleClickItem, "organisations")} trigger={["click"]}>
				<Button>
					Organisation <DownOutlined />
				</Button>
			</Dropdown> */}
		</Space>
	);
}

export default Filter;
