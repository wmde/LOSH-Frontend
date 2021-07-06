/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "gatsby";
import { Layout } from 'antd'

interface HeaderProps {
	siteTitle: string;
	headerLinks: Array<{
		to: string;
		title: string;
	}>
}

const Header = ({ siteTitle, headerLinks }: HeaderProps) => (
	<Layout.Header>
		<Link
			to="/"
			style={{
				color: `white`,
				textDecoration: `none`
			}}
		>
			{siteTitle}
		</Link>
		{headerLinks.map(link =>
			<Link key={link.title}
				to={link.to}
				style={{
					color: `white`,
					textDecoration: `none`
				}}
			>
				{link.title}
			</Link>
		)}

	</Layout.Header>
);

export default Header;
