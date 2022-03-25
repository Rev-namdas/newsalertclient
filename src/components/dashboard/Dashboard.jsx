import React, { useEffect, useState } from "react";
import AdminDashboard from './admindashboard/AdminDashboard'
import UserDashboard from './userdashboard/UserDashboard'
import Error404 from '../404/Error404'

export default function Dashboard() {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');

		setUserRole(role)
    }, 
	//eslint-disable-next-line
	[]);

	return (
		userRole
		?
			(userRole === 'admin'
				?
					<AdminDashboard />
				:
					<UserDashboard />
			)
		:
			<Error404 />
	)
}
