import * as React from "react";
import { Menu, Dropdown, Button, Space, Select } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";
import { GET_ORGANIZATIONS } from "../queries/get-organizations";
import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../queries/get-repos";
const { Option } = Select;

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
		orgsQuery.data.organizations.map(({ name }: { name: string }) => name);

	const reposQuery = useQuery(GET_REPOS);
	const repoHosts =
		reposQuery.data &&
		reposQuery.data.repos.map(({ host }: { host: string }) => ({
			name: host,
			value: host,
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
					reposQuery.loading || reposQuery.error ? [] : repoHosts,
					handleClickItem,
					"repoHost",
					filters.repoHost
				)}
				trigger={["click"]}
			>
				<Button>
					Repo Host <DownOutlined />
				</Button>
			</Dropdown>
			<Select
				style={{ width: 240 }}
				showSearch
				placeholder="Organization"
				optionFilterProp="children"
				onChange={(val) => onFilterChange("organization", val)}
				filterOption={(input, option) =>
					option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{(organizations || []).map((org: string) => (
					<Option key={org} value={org}>
						{org}
					</Option>
				))}
			</Select>
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
