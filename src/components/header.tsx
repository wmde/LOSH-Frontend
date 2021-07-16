import * as React from "react";
import { Link } from "gatsby";
import { PageHeader, Layout as AntdLayout, Menu, Typography } from "antd";

interface HeaderProps {
	siteTitle: string;
	headerLinks: Array<{
		to: string;
		title: string;
	}>;
}

const Header = ({ siteTitle, headerLinks }: HeaderProps): JSX.Element => (
	<AntdLayout.Header>
		<PageHeader
			ghost={false}
			className="site-page-header"
			title={<Link to="/">OPEN! NEXT</Link>}
			subTitle={<Link to="/">{siteTitle}</Link>}
			extra={
				<Menu mode="horizontal">
					{headerLinks.map(link => (
						<Menu.Item key={link.title}>
							<Link to={link.to}>
								<Typography.Text>{link.title}</Typography.Text>
							</Link>
						</Menu.Item>
					))}
				</Menu>
			}
		/>
	</AntdLayout.Header>
);

export default Header;
