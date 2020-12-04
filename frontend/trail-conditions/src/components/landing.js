import React from 'react'

const initialFormData = Object.freeze({
	street_number: "",
	street_name: "",
	city: "",
	state: "",
	zip_code: "",
});


const addressForm = () =>  {
	const [formData, updateFormData] = React.setState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,

		[e.target.name]: e.target.value.trim()
		});
	};
	
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData);
		// Pass data to API
	};

	return  (
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
		<div>
			<label>
				street_number
				<input name="street_number" onChange={handleChange} />
			</label>
		<br />
			<label>
				street_name
				<input name="street_name" onChange={handleChange} />
			</label>
		<br />
			<label>
				city
				<input name="city" onChange={handleChange} />
			</label>
		<br />
			<label>
				state	
				<input name="state" onChange={handleChange} />
			</label>
		<br />
			<label>
				zip_code	
				<input name="zip_code" onChange={handleChange} />
			</label>
		<br />
			<button onClick={handleSubmit}>Submit</button>
		</div>
		</div>
	);
};

export default addressForm;
