import React from "react";
import { QueryProvider } from "./src/context/query-context";

export const wrapRootElement = ({ element }) => (
	<QueryProvider>{element}</QueryProvider>
);
