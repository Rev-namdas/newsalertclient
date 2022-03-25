import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as api from '../../../api/apiCalls'
import EachAlert from "./alerts/EachAlert";
import "./userdashboard.css"

export default function UserDashboard() {
	const [alerts, setAlerts] = useState(null)
	const [userType, setUserType] = useState(null)
	const navigate = useNavigate()

	const fetchAlerts = async () => {
		const res = await api.getalerts()

		setAlerts(res.data)
		setUserType(localStorage.getItem('role'))
	}

	useEffect(() => {
		fetchAlerts()
	}, 
	//eslint-disable-next-line
	[])
	
	const handleLogut = (e) => {
		e.preventDefault();

		localStorage.removeItem('token')
		localStorage.removeItem('role')
		navigate('/')
	}

    return <div>
		<div className="header">
			<span>{`${userType === 'admin' ? "Admin" : "User"}`} Dashboard</span>
			<span className="grow"></span>
			<div className="linkbar">
			{
				userType && 
				userType === "admin" &&
						<div className="link-box" onClick={() => navigate('/dashboard')}>
							<span>Upload</span>
						</div>
			}
				<div className="link-box" onClick={handleLogut}>
					<span>Log Out</span>
				</div>
			</div>
		</div>

		<div className="alert-list-container">
			<div className="alert-list-title"><span>Alert List</span></div>
			{alerts && alerts.map((each, index) => (
				<EachAlert key={index} alert={each} />
			))}
		</div>
	</div>;
}
