import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bulma/css/bulma.css'
import CurrencyDropDown from './components/currencyDropDown';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      input: 0,
      output : 0,
      selectedCurrencyFrom: "",
      selectedCurrencyTo: "",
      currencyList: []
    }
  }
  //Compenet mounted
  componentDidMount() {
    let cCodes = [];

    axios.get('https://free.currconv.com/api/v7/currencies?apiKey=b2926387e0a03a02fa74')

    .then(res => {
      let allCurrency = res.data.results;
      let currencyCodes = Object.keys(allCurrency);
    
      currencyCodes.forEach(cc => {
        cCodes.push({
          value: cc,
          name: allCurrency[cc] && allCurrency[cc].currencyName
        })
      })
      this.setState({
        currencyList: cCodes
      })
    })
  }


  // converting currency
  convertCurrecny = async () => {

    let inputValue = this.state.input;
    let toCurrency = this.state.selectedCurrencyFrom;
    let fromCurrency = this.state.selectedCurrencyTo;
    
    const baseEndpoint = 'https://free.currconv.com/api/v7/convert?';
    const APIkey = 'b2926387e0a03a02fa74';

    const convertorEndpoint = `${baseEndpoint}q=${toCurrency}_${fromCurrency}&compact=ultra&apiKey=${APIkey}`;

    try {
      const res = await axios.get(convertorEndpoint)
      let idOfCurrency = toCurrency+'_'+fromCurrency;
      let singleCurrency = res.data[idOfCurrency]; 
      let outputValue = (singleCurrency*inputValue)

      this.setState({
        output : outputValue
      })
    } catch(e) {
      // console.log(e);
    }
  };

  // handle convert from currency 
  handleCurrencyChange = (e, type) => {

    if (type === 'from') {

      console.log(e.target.value);
      this.setState({
        selectedCurrencyFrom: e.target.value
      }, () => {
        this.convertCurrecny()
      })
    } else if (type === 'to') {
      console.log(e.target.value);
      this.setState({
        selectedCurrencyTo: e.target.value
      }, () => {
        this.convertCurrecny()
      })
    }
  };



  // handle amount input
  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input: parseInt(e.target.value, 10)
    }, () => {
      this.convertCurrecny()
    })
  } 

  
  // redering
  render() {
    return (
      <div className="App">
        <div className = "notification is-dark has-text-centered myBox">
          <h2 className="title">Currency Convertor</h2>
        </div>
        <div className="container box myBox boxWidth has-text-centered">
          <div>
            <p className="labelText"> Amount to Transfer </p>
            <input type="number" className="input is-medium" onChange={(e) => {
              this.handleInputChange(e)
            }}/>
            <hr/>
          </div>
          
          <CurrencyDropDown 
            currencyList={this.state.currencyList} 
            type="from"
            handleCurrencyChange={this.handleCurrencyChange}
          />

          <CurrencyDropDown
            currencyList={this.state.currencyList}
            type="to"
            handleCurrencyChange={this.handleCurrencyChange}
          />
        </div>
        <div>
      
          {/* <button className="button is-link" onClick={this.convertCurrecny}> Convert </button> */}
        </div><hr/>
        <div className="container box has-text-centered myBox boxWidth"> 
          <p className="outputText">  {this.state.output ? this.state.output : "Select Amount & Currencies to Convert"}</p>
        </div>

      </div> 
    );
  }
}

export default App;
