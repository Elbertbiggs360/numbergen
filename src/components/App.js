import React, { Component } from 'react';
import '../App.css';
import saveAs from 'file-saver';
import Header from './Header';
import Sorter from './Sorter';
import Export from './Export';
import Numberlist from './Numberlist';
import Stats from './Stats';
import Actions from './Actions';

class App extends Component {

  state = {
    quantity: "",
    numberlist: [],
    error: false,
    message: "",
    asc: "asc",
    min: undefined,
    max: undefined,
    total: 0,
    fileSaved: false
  }

  render = () => {
    const { numberlist, min, max, total, quantity, error, message, fileSaved } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Actions
            onChange={this.onChange}
            generateNumber={this.generateNumber}
            quantity={quantity}
            error={error}
            message={message}
          />
          <div className="list">
            <header>
              <span>Numbers generated</span>
              <Sorter
                onChange={this.onChange}
              />
              <Export
                onClick={this.exportNumbers}
                fileSaved={fileSaved}
              />
            </header>
            <Numberlist numberlist={numberlist}/>
          </div>
          <Stats
            total={total}
            min={min}
            max={max}
          />
        </div>
      </div>
    );
  }

  generateNumber = event => {
    event.preventDefault();
    const {quantity, error, message } = this.state;

    while (quantity <=1 || quantity > 10000) {
      this.setState({
        error: true,
        message: "Invalid Number: Number should be greater than 0 and less than 10000"
      });
      return;
    }
    error && message.length && this.setState({error: false, message: "", fileSaved: false});
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
        break;
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
    const generateFile = new Promise(() => {saveAs(new Blob(numberlist, { type: "text/csv;charset=utf-8" }), 'phoneNumbers.csv')});
    generateFile.then(this.setState({fileSaved: true}));
  };
}

export default App;
