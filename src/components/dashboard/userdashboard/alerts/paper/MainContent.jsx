import React, { useEffect, useState } from "react";
import EachMainDataContent from "./EachMainDataContent";

export default function MainContent({ content }) {
    const [data, setData] = useState([])

	useEffect(() => {
		const arr = [];
		for(let each in content) {
			if(!arr.includes(each)){
				arr.push(each)
			}
		}
		setData(arr)
	}, 
	//eslint-disable-next-line
	[content])

	return <div>
		{
			data.map((each, index) => (
				<>
				<div 
					key={index} 
					style={{ 
						backgroundColor: `${content[each].company_bg.split(";")[0].split(":")[1]}`,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginBottom:  "0.3em",
					}}
				>
					<span className="company-logo">
						<img src={content[each].company_logo} alt="Company Logo" />
					</span>
					<h5
						style={{ 
							color: `${content[each].company_color.split(";")[0].split(":")[1]}`,
							height: `${content[each].company_color.split(";")[1].split(":")[1]}`,
							margin: `${content[each].company_color.split(";")[2].split(":")[1]}`,
							padding: "0.4em",
							lineHeight: "1.7"
						}}
					>
						{content[each].company_name}
					</h5>
				</div>
				{content[each].data.map((eachContent, index) => (
					<EachMainDataContent key={index} content={eachContent} />
				))}
				</>
			))
		}
	</div>;
}
