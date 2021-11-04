import * as React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";

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

const licenses = [
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

interface FilterProps {
	filters: Record<string, string>;
	onFilterChange: (name: string, value: any) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
	const handleClickItem = (name: string, item: any) => {
		onFilterChange(name, item.value);
	};

	return (
		<Space wrap className="filter">
			<Dropdown
				overlay={menu(licenses, handleClickItem, "license", filters.license)}
				trigger={["click"]}
			>
				<Button>
					License <DownOutlined />
				</Button>
			</Dropdown>
			{/* <Dropdown
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
			</Dropdown> */}
		</Space>
	);
};

export default Filter;
