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

export const RESET_FILTER = "-1";

const licenses = [
	{
		name: "Any License",
		value: RESET_FILTER,
	},
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
	const orgsQuery = useQuery(GET_ORGANIZATIONS);
	const organizations =
		orgsQuery.data &&
		orgsQuery.data.organizations
			.map(({ name }: { name: string }) => name)
			.sort();

	const reposQuery = useQuery(GET_REPOS);
	const repoHosts =
		reposQuery.data &&
		reposQuery.data.repos.map(({ host }: { host: string }) => ({
			name: host,
			value: host,
		}));
	if (repoHosts && repoHosts.length) {
		repoHosts.unshift({ name: "Any Repository Host", value: RESET_FILTER });
	}

	return (
		<Space wrap className="filter">
			<div className="filter-element">
				<label htmlFor="license">License</label>
				<Select
					style={{ width: 170 }}
					placeholder="Any License"
					value={filters.license}
					onChange={(val) => onFilterChange("license", val)}
					id="license"
				>
					{(licenses || []).map((element: Record<string, string>) => (
						<Option key={element.name} value={element.value}>
							{element.name}
						</Option>
					))}
				</Select>
			</div>
			<div className="filter-element">
				<label htmlFor="repositoryHost">Repository Host</label>
				<Select
					style={{ width: 210 }}
					placeholder="Any Repository Host"
					value={filters.repoHost}
					onChange={(val) => onFilterChange("repoHost", val)}
					id="repositoryHost"
				>
					{(reposQuery.loading || reposQuery.error ? [] : repoHosts).map(
						(element: Record<string, string>) => (
							<Option key={element.name} value={element.value}>
								{element.name}
							</Option>
						)
					)}
				</Select>
			</div>
			<div className="filter-element">
				<label htmlFor="organization">Organization</label>
				<Select
					mode="tags"
					style={{ width: 240 }}
					showSearch
					placeholder="Any Organization"
					value={filters.organization}
					optionFilterProp="children"
					onChange={(val) => {
						if (Array.isArray(val)) {
							val = val.pop();
						}
						onFilterChange("organization", val);
					}}
					filterOption={(input, option) =>
						option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					id="organization"
				>
					{(organizations || []).map((org: string) => (
						<Option key={org} value={org}>
							{org}
						</Option>
					))}
				</Select>
			</div>
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
