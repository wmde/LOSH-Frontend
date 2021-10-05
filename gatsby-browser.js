import React from "react";
import { QueryProvider } from "./src/context/query-context";

export const wrapPageElement = ({ element }) => (
	<QueryProvider>{element}</QueryProvider>
);
