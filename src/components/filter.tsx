import * as React from "react";
import { Menu, Dropdown, Button, message, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import '../styles/filter.css';

function handleMenuClick(e: any) {
	message.info("Click on menu item.");
	console.log("click", e);
}

const menu = (
	<Menu onClick={handleMenuClick}>
		<Menu.Item key="1" icon={<UserOutlined />}>
			1st menu item
		</Menu.Item>
		<Menu.Item key="2" icon={<UserOutlined />}>
			2nd menu item
		</Menu.Item>
		<Menu.Item key="3" icon={<UserOutlined />}>
			3rd menu item
		</Menu.Item>
	</Menu>
);

function Filter() {
	return (
		<Space wrap className="filter">
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button>
					Actions <DownOutlined />
				</Button>
			</Dropdown>
		</Space>
	);
}

export default Filter;
