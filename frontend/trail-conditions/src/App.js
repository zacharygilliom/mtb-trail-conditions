import React, { Component } from 'react';
import './App.css';
import Trails from './components/trails';


class App extends Component{
	render () {
	return (
    <div>
    <AddressForm />
    </div>
  )
};
}

class AddressForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trails: "",
			street_number: "",
			street_name: "",
			city: "",
			states: "",
			zip_code: ""
		};

		this.onFormChange = this.onFormChange.bind(this);
		this.onButtonChange = this.onButtonChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	onFormChange(event) {
		const value = event.target.value;
		this.setState({
			[event.target.name]: value
		});
	}
	getAPI(type) {
		var makeURL = `http://localhost:5000/v1/${type}/${this.state.street_number}%20${this.state.street_name}/${this.state.city}/${this.state.states}/${this.state.zip_code}/50`
		fetch(makeURL)
		.then(res => res.json())
		.then(data =>  this.setState({ trails: data }));
	}

	onButtonChange(event) {
		this.setState({
			selectedOption: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault();


		switch(this.state.selectedOption) {
			case "Biking":
				this.getAPI('bike')
				console.log("Going for a Bike Ride, I See!")
				break;
			case "Hiking":
				console.log("Going for a Hike, I See!")
				this.getAPI('hike')
				break;
			default:
				alert("Invalid Form Submitted") 	
		}
		alert("Form Has Been Submitted")

		}

	render () {
	return  (
		<div className="home-page">
		<h1 className="welcome-title">
			Welcome to the Mountain Bike Trail Finder
		</h1>
		<br />
		<h5 className="welcome-direction">
			Simply enter the address where you are located and select whether you want to 
			search for Biking or Hiking trails.  Once you Submit the address all the trails
			near your location will display below.
		</h5>
		<br />
		<form onSubmit={this.handleSubmit}>
			<div className="text-fields">
			<label>
				Street Number
				<input 
					name="street_number"
					value={this.state.street_number}
					onChange={this.onFormChange} 
				/>
			</label>
		<br />
			<label>
				Street Name
				<input 
					name="street_name"
					value={this.state.street_name}
					onChange={this.onFormChange} 
				/>
			</label>
		<br />
			<label>
				City
				<input 
					name="city"
					value={this.state.city}
					onChange={this.onFormChange} 
				/>
			</label>
		<br />
			<label>
				State	
				<input 
					name="states"
					value={this.state.states}
					onChange={this.onFormChange} 
				/>
			</label>
		<br />
			<label>
				Zip Code 	
				<input 
					name="zip_code"
					value={this.state.zip_code}
					onChange={this.onFormChange} 
				/>
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
    <div>
      <br />
      <br />
        <div>
        <b>{this.state.trails ? <Trails trails={this.state.trails}/>: <br />}</b>
        </div>
    </div>
		</div>


	);
};
};

export default App;

//DONE: Pass form parameters to API call
//TODO: Style welcome page and style output from API
//TODO: Separate classes into files.
