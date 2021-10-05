import * as React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import "./filter.css";

type MenuItems = Array<{
	name: string;
}>;

const menu = (items: MenuItems) => (
	<Menu>
		{items.map((item) => (
			<Menu.Item key={item.name} icon={<CheckOutlined />}>
				{item.name}
			</Menu.Item>
		))}
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
	return (
		<Space wrap className="filter">
			<Dropdown overlay={menu(licences)} trigger={["click"]}>
				<Button>
					License <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu(certifiedProjects)} trigger={["click"]}>
				<Button>
					Certified Project <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu(dataSources)} trigger={["click"]}>
				<Button>
					Data Source <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu(organisations)} trigger={["click"]}>
				<Button>
					Organisation <DownOutlined />
				</Button>
			</Dropdown>
		</Space>
	);
}

export default Filter;
