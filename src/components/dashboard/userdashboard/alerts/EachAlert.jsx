import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EachAlert({ alert }) {
	const navigate = useNavigate()
	
	return (
		<div 
			style={{cursor: 'pointer'}}
			onClick={() => navigate(`/alert/${alert.alertname}`)}
		>
			{ alert.alertname }
		</div>
	)
}
