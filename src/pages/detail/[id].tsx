import React, { useContext, useState, useEffect } from "react";

import { QueryContext } from "../../context/query-context";
import { HardwareData } from "../../controller/types";
import { navigate } from "@reach/router";
import "../../components/detail-rows/detail-rows.css";
import useWindowSize from "../../hooks/useWindowSize";
import DetailContent from "../../components/detail-content";

interface DetailPageProps {
	params: {
		id: string;
	};
}

const DetailPage = ({ params }: DetailPageProps): JSX.Element => {
	const query = useContext(QueryContext);

	const [pageData, setPageData] = useState<HardwareData>();
	const { width } = useWindowSize();
	const loadData = async () => {
		try {
			const data = await query?.controller?.getItem(params.id);
			setPageData(data);
		} catch (e) {
			navigate("/404", { replace: true });
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	if (!pageData) {
		return <></>;
	}

	return <DetailContent pageData={pageData}></DetailContent>;
};

export default DetailPage;
