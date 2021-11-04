import React from "react";
import DetailContent from "../../components/detail-content";
import { useQuery } from "@apollo/client";
import { GET_ITEM } from "../../queries/get-item";
import { navigate } from "gatsby";
import "../../components/detail-rows/detail-rows.css";

interface DetailPageProps {
	params: {
		id: string;
	};
}

const DetailPage = ({ params }: DetailPageProps): JSX.Element => {
	const { data, error, loading } = useQuery(GET_ITEM, {
		variables: { id: params.id },
	});

	if (error) {
		navigate("/404", { replace: true });
	}

	if (!data) {
		return <></>;
	}

	return <DetailContent pageData={data.getItem}></DetailContent>;
};

export default DetailPage;
