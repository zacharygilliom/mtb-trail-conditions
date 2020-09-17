import React from 'react'

const Trails = ( {trails} ) => {
	return (
		<div>
			<h1>Trails List</h1>
		{
			trails.map( (trail) => (
			<div class="card">
			<div class="card-body">
				<h5>{trail.name}</h5>
			</div>
			</div>
		))}
		</div>
	)
};

export default Trails;
