import React from "react";

import "../../components/detail-rows/detail-rows.css";
import DetailContent from "../../components/detail-content";
import { useQuery } from "@apollo/client";
import { GET_ITEM } from "../../controller/get-item";

interface DetailPageProps {
	params: {
		id: string;
	};
}

const DetailPage = ({ params }: DetailPageProps): JSX.Element => {
	// const query = useContext(QueryContext);

	const { data, error, loading } = useQuery(GET_ITEM, {
		variables: { id: params.id },
	});

	console.log({ data });

	// if(error) {
	// 	navigate("/404", { replace: true });
	// }

	if (!data) {
		return <></>;
	}

	return <DetailContent pageData={data.getItem}></DetailContent>;
};

export default DetailPage;
