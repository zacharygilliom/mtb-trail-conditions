import React from 'react'

const initialFormData = Object.freeze({
	street_number: "",
	street_name: "",
	city: "",
	state: "",
	zip_code: "",
});

class AddressForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {initialFormData};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			street_number: "",
			street_name: "",
			city: "",
			state: "",
			zip_code: "",
		});
	}
	handleSubmit(event) {
		event.preventDefault();
	}



/*const addressForm = () =>  {
	const [formData, updateFormData] = this.setState(initialFormData);

	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// Pass data to API
	};
	
*/
	render () {
	return  (
		<div className="home-page">
		<div className="home-bar">
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
				<input name="street_number" onChange={this.handleChange} />
			</label>
		<br />
			<label>
				street_name
				<input name="street_name" onChange={this.handleChange} />
			</label>
		<br />
			<label>
				city
				<input name="city" onChange={this.handleChange} />
			</label>
		<br />
			<label>
				state	
				<input name="state" onChange={this.handleChange} />
			</label>
		<br />
			<label>
				zip_code	
				<input name="zip_code" onChange={this.handleChange} />
			</label>
		<br />
			<button onClick={this.handleSubmit}>Submit</button>
		</div>
		</div>
	);
};
};

export default AddressForm;
