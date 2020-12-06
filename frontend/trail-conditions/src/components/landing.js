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

	render () {
	return  (
		<div className="home-page">
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
