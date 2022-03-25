import React, { useEffect, useState } from "react";
import * as api from '../../../api/apiCalls'
import EachAlert from "./alerts/EachAlert";

export default function UserDashboard() {
	const [alerts, setAlerts] = useState(null)

	const fetchAlerts = async () => {
		const res = await api.getalerts()

		setAlerts(res.data)
	}

	useEffect(() => {
		fetchAlerts()
	}, 
	//eslint-disable-next-line
	[])
	

    return <div>
		<div>User Dashboard</div>

		{alerts && alerts.map((each, index) => (
			<EachAlert key={index} alert={each} />
		))}
	</div>;
}
