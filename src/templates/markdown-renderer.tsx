import * as React from "react";
import unified from "unified";
import { Typography, Button } from "antd";
import rehypeReact from "rehype-react";
import { DownloadOutlined } from "@ant-design/icons";

const processor = unified().use(rehypeReact, {
	createElement: React.createElement,
	components: {
		h1: (props: React.HTMLProps<HTMLTitleElement>) => (
			<Typography.Title level={1}>{props.children}</Typography.Title>
		),
		h2: (props: React.HTMLProps<HTMLTitleElement>) => (
			<Typography.Title level={2}>{props.children}</Typography.Title>
		),
		h3: (props: React.HTMLProps<HTMLTitleElement>) => (
			<Typography.Title level={3}>{props.children}</Typography.Title>
		),
		h4: (props: React.HTMLProps<HTMLTitleElement>) => (
			<Typography.Title level={4}>{props.children}</Typography.Title>
		),
		h5: (props: React.HTMLProps<HTMLTitleElement>) => (
			<Typography.Title level={5}>{props.children}</Typography.Title>
		),
		button: (props: React.HTMLProps<HTMLButtonElement>) => (
			<Button icon={props.name === "download" && <DownloadOutlined />}>
				{props.children}
			</Button>
		),
	},
});

export const renderAst = (ast: any): JSX.Element => {
	return processor.stringify(ast) as unknown as JSX.Element;
};
