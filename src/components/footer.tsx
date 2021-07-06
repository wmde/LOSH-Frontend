/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "gatsby";
import { Layout } from 'antd'


const Footer = () => (

  <Layout.Footer>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`
      }}
    >
      OPEN!NEXT
    </Link>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`
      }}
    >
      About the Project
    </Link>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`
      }}
    >
      Submit OSH Data
    </Link>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`
      }}
    >
      Legal Disclaimer
    </Link>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`
      }}
    >
      Submit an issue
    </Link>
  </Layout.Footer>
);

export default Footer;
