import React from 'react'

const Trails = ({ trails }) => {
	return (
		<div>
		<center><h1>Trail List</h1></center>
		{
			trails.map( (trails) => (
			<div> class="card">
			<div> class="card-body">
				<h5> class="card-title">{trails.name}</h5>
			</div>
			</div>
		))}
		</div>
	)
};

export default Trails
