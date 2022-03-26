import React, { useEffect, useState } from "react";
import EachMidContent from "./MidContent/EachMidContent";

export default function IndustryContent({ content, title, color }) {
    const [data, setData] = useState([])

	useEffect(() => {
		const arr = []
		for(let each in content) {
			if(!arr.includes(each)){
				arr.push(each)
			}
		}
		setData(arr.sort())
	}, 
	//eslint-disable-next-line
	[content])

	return <div>
		{
			content && data &&
			data.map((each, index) => (
				<React.Fragment key={index}>
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
				{content[each].data.map((eachContent, index) => (
					<EachMidContent key={index} content={eachContent} />
				))}
				</React.Fragment>
			))
		}
	</div>;
}
