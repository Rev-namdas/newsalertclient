import React from "react";

export default function CustomHeader({ title, color }) {
	return <div>
			<div 
				style={{ 
					backgroundColor: color,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginBottom:  "0.3em"
				}}
			>
				<span className="company-logo">
					
				</span>
				<h5
					style={{ 
						color: "white",
						height: "30px",
						margin: "0",
						padding: "0.4em",
						lineHeight: "2.3"
					}}
				>
					{title}
				</h5>
			</div>
	</div>;
}
