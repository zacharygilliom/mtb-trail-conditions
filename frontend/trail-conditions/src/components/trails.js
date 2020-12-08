import React from 'react';

const Trails = ( {trails} ) => {
	return (
		<div>
			<div className="list-body">
				<h1>Trails List</h1>
				{
					Object.entries(trails)
					.map( ([key, trail]) =>
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
					)}
			</div>
		</div>
	)
}

export default Trails;

//TODO: Add key value to satisfy React Message
