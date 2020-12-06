import React from 'react'


class AddressForm extends React.Component {
	constructor(/*props*/) {
		super(/*props*/);
		this.state = {
			name: "Form",
		};

		this.onFormChange = this.onFormChange.bind(this);
		this.onButtonChange = this.onButtonChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	onFormChange(event) {
		this.setState({
			street_number: "",
			street_name: "",
			city: "",
			state: "",
			zip_code: "",
		});
	}

	onButtonChange(event) {
		this.setState({
			selectedOption: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.selectedOption)
	}

	render () {
	return  (
		<div className="home-page">
		<form onSubmit={this.handleSubmit}>
			<div className="text-fields">
			<label>
				Street Number
				<input name="street_number" onChange={this.onFormChange} />
			</label>
		<br />
			<label>
				Street Name
				<input name="street_name" onChange={this.onFormChange} />
			</label>
		<br />
			<label>
				City
				<input name="city" onChange={this.onFormChange} />
			</label>
		<br />
			<label>
				State	
				<input name="state" onChange={this.onFormChange} />
			</label>
		<br />
			<label>
				Zip Code 	
				<input name="zip_code" onChange={this.onFormChange} />
			</label>
			</div>
		<br />
		<hr />
		<div className="radio-buttons-home-page" >
			<input type="radio" 
			value="Biking" 
			name="trail-type" 
			checked={this.state.selectedOption === "Biking"} 
			onChange={this.onButtonChange} />Biking
			<br />
			<input type="radio" 
			value="Hiking" 
			name="trail-type" 
			checked={this.state.selectedOption === "Hiking"} 
			onChange={this.onButtonChange} />Hiking
		</div>
			<button onClick={this.handleSubmit}>Submit</button>
		</form>
		</div>


	);
};
};

export default AddressForm;
