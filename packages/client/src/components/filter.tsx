import * as React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";
import { GET_ORGANIZATIONS } from "../queries/get-organizations";
import { useQuery } from "@apollo/client";

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
		name: "Strong Copyleft",
		value: "strong",
	},
	{
		name: "Weak Copyleft",
		value: "weak",
	},
	{
		name: "Permissive",
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

	const orgsQuery = useQuery(GET_ORGANIZATIONS);
	const organizations =
		orgsQuery.data &&
		orgsQuery.data.organizations.map(({ name }: { name: string }) => ({
			name,
			value: name,
		}));

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
			<Dropdown
				overlay={menu(
					orgsQuery.loading || orgsQuery.error ? [] : organizations,
					handleClickItem,
					"organization",
					filters.organization
				)}
				trigger={["click"]}
			>
				<Button>
					Organization <DownOutlined />
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
