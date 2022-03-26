import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from '../../api/apiCalls'
import "../dashboard/userdashboard/userdashboard.css"
import CustomHeader from "../alerts/paper/CustomHeader";
import CustomSubHeader from "../alerts/paper/CustomSubHeader";
import IndustryContent from "../alerts/paper/IndustryContent";
import MainContent from "../alerts/paper/MainContent/MainContent";
import MidContent from "../alerts/paper/MidContent/MidContent";
import PaperHeader from "../alerts/paper/PaperHeader";
import PaperFooter from "../alerts/paper/PaperFooter";

export default function EachAlertDetails() {
    const [data, setData] = useState([])
	const [userType, setUserType] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	const fetchAlert = async () => {
		const res = await api.generateAlert({ alertname: params.alertname })

		setData(res.data)
		setUserType(localStorage.getItem('role'))
	}

	useEffect(() => {
		fetchAlert()
	}, 
	//eslint-disable-next-line
	[])

	const handleLogut = (e) => {
		e.preventDefault();

		localStorage.removeItem('token')
		localStorage.removeItem('role')
		navigate('/')
	}

	return (
		<div>
			<div className="header sticky-header">
				<span>{`${userType === 'admin' ? "Admin" : "User"}`} Dashboard</span>
				<span className="grow"></span>
				<div className="linkbar">
					{
						userType && 
						userType === "admin" &&
							<div className="link-box" onClick={() => navigate('/dashboard/list')}>
								<span>List</span>
							</div>
								
					}
					<div className="link-box" onClick={() => navigate('/dashboard')}>
						<span>{`${userType === 'admin' ? "Upload" : "List"}`}</span>
					</div>
					<div className="link-box" onClick={handleLogut}>
						<span>Log Out</span>
					</div>
				</div>
			</div>
			<br />

			<div className="paper-wrapper">
			<div className="paper">
				
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
				<PaperFooter />

			</div>
			</div>
		</div>
	)
}