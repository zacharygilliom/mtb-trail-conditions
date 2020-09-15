import React, { Component } from 'react';
import './App.css';
import Trails from './components/trails';

class App extends Component {
	state = {
		trails : []
	};
	componentDidMount() {
		fetch('/v1/bike/555%20Bower%20Road/Milton/PA/17847/20')
		.then(res => res.json())
		.then((data) => {
			this.setState({ trails: data })
		})
		.catch(console.log);
	}
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
	render () {
		return (
			<Trails trails={this.state.trails} />
		)
	}
}

export default App;