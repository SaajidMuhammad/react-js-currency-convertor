import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class CurrencyDropDown extends Component {
    render() {
        return (
            <div>
                <p className="labelText"> Convert {this.props.type} </p>
                <select className="select is-medium selectWidth" onChange={(e) => {
                    this.props.handleCurrencyChange(e, this.props.type)
                }}> 
                    {this.props.currencyList.map((item, i) => {
                        return (
                            <option key={i} value={item.value}>{item.value} - {item.name}</option>
                        )
                    })}
                </select>
            </div>
        );
    }
}

export default CurrencyDropDown;