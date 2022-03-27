import React, { useEffect, useState } from "react";
import AdminDashboard from './admindashboard/AdminDashboard'
import UserDashboard from './userdashboard/UserDashboard'
import Error404 from '../404/Error404'

export default function Dashboard() {
    const [userType, setUserType] = useState(null);
	const [client, setClient] = useState(null)

    useEffect(() => {
		setClient(localStorage.getItem('client'))
		setUserType(localStorage.getItem('role'))
    }, 
	//eslint-disable-next-line
	[]);

	return (
		userType
		?
			(userType === 'admin'
				?
					<AdminDashboard />
				:
					<UserDashboard userRole={userType} client={client} />
			)
		:
			<Error404 />
	)
}
