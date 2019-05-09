import React, { Component } from 'react';
import logo from '../logo.png';
import '../App.css';
import saveAs from 'file-saver';

class App extends Component {

  state = {
    quantity: "",
    numberlist: [],
    error: false,
    message: "",
    asc: "asc",
    min: "",
    max: "",
    total: 0
  }

  render = () => {
    const { numberlist, min, max, total, quantity } = this.state;
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
            <input type="number" id="quantity" onChange={this.onChange} value={quantity} placeholder="Quantity of numbers to generate" />
            <button onClick={this.generateNumber}>Generate</button>
          </div>
          <div className="list">
            <header>
              <span>Numbers generated</span>
              <div className="sorter">
                <span>Sort by:</span>
                <select onChange={this.onChange} id="sorter">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className="export">
                <button onClick={this.exportNumbers} className="export-btn">Export as CSV</button>
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
              <span>Total numbers generated: </span> {total}
            </div>
            <div className="min">
              <span>Min number: </span> {min}
            </div>
            <div className="max">
              <span>Max number: </span> {max}
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateNumber = event => {
    event.preventDefault();
    const {quantity, asc } = this.state;

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
    return this.setState({
      numberlist
    }, async () => {
      await this.sortNumbers();
      this.setState({quantity: ''});
    });
  }

  sortNumbers = () => {
    const { numberlist, asc } = this.state;
    if(asc==="desc"){
      numberlist.sort();
    }
    if(asc==="asc") {
      numberlist.sort().reverse();
    }
    this.setState({
      numberlist,
      max: Math.max(...numberlist),
      min: Math.min(...numberlist),
      total: numberlist.length
    });
  }
  
  onChange = event => {
    event.preventDefault();
    switch(event.target.id){
      case 'quantity':
        return this.updateQuantity(event.target.value);
      case 'sorter':
        const { asc } = this.state;
        if(asc !== event.target.value){
          this.updateSortOrder(event.target.value);
          this.sortNumbers();
        }
      default:
        return;
    }
  }

  updateQuantity = quantity => {
    this.setState({quantity});
  }

  updateSortOrder = asc => {
    this.setState({asc});
  }

  exportNumbers = event => {
    event.preventDefault();
    const { numberlist } = this.state;
    return numberlist.length && saveAs(new Blob(numberlist, { type: "text/csv;charset=utf-8" }), 'phoneNumbers.csv');
  };
}

export default App;
