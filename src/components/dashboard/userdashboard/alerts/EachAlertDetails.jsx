import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from '../../../../api/apiCalls'
import "../userdashboard.css"
import CustomHeader from "./paper/CustomHeader";
import CustomSubHeader from "./paper/CustomSubHeader";
import IndustryContent from "./paper/IndustryContent";
import MainContent from "./paper/MainContent";
import MidContent from "./paper/MidContent";
import PaperHeader from "./paper/PaperHeader";

export default function EachAlertDetails() {
    const [data, setData] = useState([])
	const params = useParams()

	const fetchAlert = async () => {
		const res = await api.generateAlert({ alertname: params.alertname })

		setData(res.data)
	}

	useEffect(() => {
		fetchAlert()
	}, 
	//eslint-disable-next-line
	[])

	return <div className="paper">
		<PaperHeader />
		{ data['main'] && <MainContent content={data['main']} /> }
		{ data['mid'] && <MidContent content={data['mid']} /> }
		{
			data['industry']
			&&
			<IndustryContent 
				content={data['industry']} 
				title="Industry Content"
				color="#6a1be9" 
			/>
		}
		{
			(data['print'] || data['online'])
			&&
			<CustomHeader
				title="Advertisement"
				color="#039da8" 
			/>
		}
		{ 
			data['print'] 
			&& 
			<>
				<CustomSubHeader subtitle="Print" />
				<MidContent content={data['print']} /> 
			</>
		}
		{ 
			data['online'] 
			&& 
			<>
				<CustomSubHeader subtitle="Online" />
				<MidContent content={data['online']} /> 
			</>
		}
	</div>;
}