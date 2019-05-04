import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
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
          <input type="text" placeholder="Quantity of numbers to generate" />
          <button>Generate</button>
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
          <div className="numbers" />
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

export default App;
