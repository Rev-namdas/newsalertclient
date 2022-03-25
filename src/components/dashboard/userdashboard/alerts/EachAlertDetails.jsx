import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from '../../../../api/apiCalls'
import "../userdashboard.css"
import CustomHeader from "./paper/CustomHeader";
import CustomSubHeader from "./paper/CustomSubHeader";
import IndustryContent from "./paper/IndustryContent";
import MainContent from "./paper/MainContent";
import MidContent from "./paper/MidContent";
import PaperFooter from "./paper/PaperFooter";
import PaperHeader from "./paper/PaperHeader";

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
					<div className="link-box" onClick={() => navigate('/dashboard')}>
						<span>{`${userType === 'admin' ? "Upload" : "List"}`}</span>
					</div>
					{
						userType && 
						userType === "admin" &&
							<div className="link-box" onClick={() => navigate('/dashboard/list')}>
								<span>List</span>
							</div>
								
					}
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