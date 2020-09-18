import React from 'react'

const Trails = ( {trails} ) => {
	return (
		<div>
			<h1>Trails List</h1>
		{
			trails.map( (trail) => (
			<div className="card">
			<div className="card-body">
				<ul className="trails">
					<li><h3><b>{trail.name}</b></h3></li>
						<p>Summary - {trail.summary}</p>
						<p>Difficulty - {trail.difficulty}</p>
						<p>Average Temperature - {trail.temperature}</p>
						<p>Weather Summary - {trail.weather_summary}</p>

				</ul>
			</div>
			</div>
		))}
		</div>
	)
};

export default Trails;
