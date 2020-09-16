import React from 'react'

const Trails = ( {trails} ) => {
	return (
		<div>
		<center><h1>Trail List</h1></center>
		{
			trails.map( (trail) => (
			<div> class="card">
			<div> class="card-body">
				<h5> class="card-title">{trail.name}</h5>
			</div>
			</div>
		))}
		</div>
	)
};

export default Trails;
