import React, { Component } from 'react';
import './App.css';
import Trails from './components/trails';


var bikeURL = 'http://localhost:5000/v1/bike/555%20Bower%20Road/Milton/PA/17847/50'
var hikeURL = 'http://localhost:5000/v1/hike/555%20Bower%20Road/Milton/PA/17847/50'



/*
class App extends Component {
	state = {
		trails: data 
	};
	
	//componentDidMount() {
	//	fetch(targetURL)
	//	.then(res => res.json())
	//	.then((data) => { 
			//console.log(data)
	//		this.setState({ trails: data });
	//	})
	//	.catch(console.log);
	//}
	render () {
		return (
			<Trails trails={this.state.trails} />
		)
	}
}
*/


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
			name: "Form",
			trails: ""
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

		switch(this.state.selectedOption) {
			case "Biking":
				console.log("Going for a Bike Ride, I See!")
				fetch(bikeURL)
				.then(response => response.json())
				.then(data => this.setState({trails: data}));
				break;
			case "Hiking":
				console.log("Going for a Hike, I See!")
				fetch(hikeURL)
				.then(response => response.json())
				.then(data => this.setState({trails: data}));
				break;
			default:
				alert("Invalid Form Submitted") 	
		}
		alert("Form Has Been Submitted")
		console.log(this.state.trails)

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

//TODO: Pass form parameters to API call
//TODO: Separate classes into files.