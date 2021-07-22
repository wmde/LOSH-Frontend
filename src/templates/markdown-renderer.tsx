import * as React from "react";
import unified from "unified";
import { Typography } from "antd";
import rehypeReact from "rehype-react";

const processor = unified().use(rehypeReact, {
	createElement: React.createElement,
	components: {
		h1: (props: any) => <Typography.Title level={1} {...props} />,
		h2: (props: any) => <Typography.Title level={2} {...props} />,
		h3: (props: any) => <Typography.Title level={3} {...props} />,
		h4: (props: any) => <Typography.Title level={4} {...props} />,
		h5: (props: any) => <Typography.Title level={5} {...props} />
	}
});

export const renderAst = (ast: any): JSX.Element => {
	return (processor.stringify(ast) as unknown) as JSX.Element;
};
