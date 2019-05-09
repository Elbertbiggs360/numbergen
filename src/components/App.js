import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';

class App extends Component {

  state = {
    quantity: 1,
    numberlist: [],
    error: false,
    message: ""
  }

  render = () => {
    const { numberlist } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Number Generator 'Phone' Edition
          </p>
        </header>
        <div className="container">
          <div className="actions">
            <input type="number" onChange={this.onChange} placeholder="Quantity of numbers to generate" />
            <button onClick={this.generateNumber}>Generate</button>
          </div>
          <div className="list">
            <header>
              <span>Numbers generated</span>
              <div className="sorter">
                <span>Sort by:</span>
                <select>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </header>
            <div className="numbers">
              <ul className="numberlist">
                {
                  numberlist && numberlist.map(number => (
                    <li className="listNumber" key={number}>{number}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="stats">
            <span>Stats</span>
            <div className="total">
              <span>Total numbers generated: </span> #
            </div>
            <div className="min">
              <span>Min number: </span> #
            </div>
            <div className="max">
              <span>Max number: </span> #
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateNumber = event => {
    event.preventDefault();
    const {quantity} = this.state;

    while (quantity <=1 || quantity > 10000) {
      this.setState({
        error: true,
        message: "Invalid Number: Number should be greater than 0 and less than 10000"
      });
      return;
    }
    let number;
    let numberlist = [];
    for (let phoneNumber=0; phoneNumber<quantity;phoneNumber++) {
      number = '0' + Math.floor(Math.random() * 900000000 + 100000000);
      numberlist.push(number);
    }
    this.setState({numberlist});
  }
  
  onChange = event => {
    event.preventDefault();
    const quantity = event.target.value;
    this.setState({
      quantity
    });
  }
}

export default App;
