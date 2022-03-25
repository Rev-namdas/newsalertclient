import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EachAlert({ alert }) {
	const navigate = useNavigate()
	
	return (
		<div 
			className='each-alert'
			style={{cursor: 'pointer'}}
			onClick={() => navigate(`/alert/${alert.alertname}`)}
			target="_blank"
		>
			{ alert.alertname }
		</div>
	)
}
