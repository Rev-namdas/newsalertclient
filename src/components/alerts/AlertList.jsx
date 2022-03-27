import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as api from '../../api/apiCalls'
import EachAlert from "../alerts/EachAlert";
import "../dashboard/userdashboard/userdashboard.css"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function WrappedUserDashboard(){
	return (
		<QueryClientProvider client={queryClient}>
			<AlertList />
		</QueryClientProvider>
	)
}

function AlertList() {
	const { data } = useQuery('alerts', api.getalerts)
	const [userType, setUserType] = useState(null)
	const navigate = useNavigate()
	
	useEffect(() => {
		setUserType(localStorage.getItem('role'))
	}, 
	//eslint-disable-next-line
	[])
	
	const handleLogout = (e) => {
		e.preventDefault();

		localStorage.removeItem('token')
		localStorage.removeItem('role')
		localStorage.removeItem('client')
		navigate('/')
	}

    return <div>
		<div className="header sticky-header">
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
				<div className="link-box" onClick={handleLogout}>
					<span>Log Out</span>
				</div>
			</div>
		</div>

		<div className="alert-list-container">
			<div className="alert-list-title"><span>Alert List</span></div>
			{data && data.data.map((each, index) => (
				<EachAlert key={index} alert={each} />
			))}
		</div>
	</div>;
}