import React from 'react';
import AddressForm from './landing';

const Trails = ( {trails} ) => {
	return (
		<div>
		<div>
			<nav class="navbar navbar-expand-lg navbar-light">
				<a class="navbar-brand" href="/">Home</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
					  		<a class="nav-link" href="/bike">Biking</a>
						</li>
						<li class="nav-item">
					  		<a class="nav-link" href="/hike">Hiking</a>
						</li>
				  	</ul>
				</div>
			</nav>
		</div>
		<div className="list-body">
			<h1>Trails List</h1>
		{
			trails.map( (trail) => (
			<div class="card">
			<div class="card-body">
				<ul class="trails">
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
		</div>
	)
};

export default Trails;
