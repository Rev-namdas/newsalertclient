import React from 'react'

export default function EachMainDataContent({ content }) {
  return (
	<div className="each-content">
		<div className="each-content-title">{content.title}</div>
		<div style={{ textAlign: 'right' }}>
			<span className="each-content-title">Link: </span>
			{
				content.news_ref.map((eachLink, index) => (
					<React.Fragment key={index}>
						<a 
							href={eachLink[0]} 
							target="_blank"
							rel="noreferrer"
							className="news-link"
						>
							{ eachLink[1] }
						</a>
						<span className="news-link-divider"> | </span>
					</React.Fragment>
				))
			}
			<span className="news-link-count">({ content.news_ref.length })</span>
		</div>
		<hr className="each-content-break" />
	</div>
  )
}
