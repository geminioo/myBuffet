import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Content/>
        </div>
    );
  }
}


class Header extends React.Component {
   render() {
      return (
          <div className="App-header">
            <h2>Hasty Code Buffet</h2>
            <p className="detailHeader">All you can code.</p>
          </div>
      );
   }
}

class Content extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            couponUsedList: [],
            numOfCus: 0,
            couponInput: '',
            invalidCoupon: '',
            totalPrice: 0,
            totalPriceVisible: false,
        }

        this.calucatePrice = this.calucatePrice.bind(this);
        this.updateCouponList = this.updateCouponList.bind(this);
    }

    calucatePrice(){
        //call api for calucate
        var _pricePerPerson = 459
        var _couponList = this.state.couponUsedList
        var _numOfCus = this.state.numOfCus
        var _basicPrice = _numOfCus*_pricePerPerson
        var _remainPerson = 0
        if(_numOfCus*_pricePerPerson > 6000){
            _basicPrice = _basicPrice*0.75
        }
        else{
            if(_couponList.indexOf('4PAY3') != -1){
                _remainPerson = _numOfCus%4
                _numOfCus = _numOfCus - Math.floor(_numOfCus/4)
                _basicPrice = _numOfCus*_pricePerPerson
            }

            if(_couponList.indexOf('LUCKY TWO') != -1 && _remainPerson >= 2){
                var _remainPersonPrice = 0;
                if(_remainPerson%2 == 0){
                    _remainPersonPrice = _remainPerson*_pricePerPerson*0.8
                }
                else{
                    _remainPersonPrice = ((_remainPerson-1)*_pricePerPerson*0.8)+_pricePerPerson
                }
                _basicPrice = (_basicPrice-(_pricePerPerson*_remainPerson))+_remainPersonPrice
            }

            if(_couponList.indexOf('LUCKY ONE') != -1 || _basicPrice > 1000){
                _basicPrice = _basicPrice*0.85
            }
        }

        this.setState({
            totalPriceVisible: true,
            totalPrice: _basicPrice.toFixed(2),
        })
    }

    checkCoupon(code){
        //call api for check
        if(code == 'LUCKY ONE' || code == '4PAY3' || code == 'LUCKY TWO'){
            return true;
        }
        else{
            return false;
        }
    }

    updateCouponList() {
        if(this.checkCoupon(this.state.couponInput)){
            if(this.state.couponUsedList.indexOf(this.state.couponInput) == -1){
                this.setState({
                    couponUsedList: this.state.couponUsedList.concat([this.state.couponInput]),
                    invalidCoupon: "",
                    couponInput: "",
                })
            }
        }
        else{
            this.setState({invalidCoupon: "invalid coupon"})
        }
    }


    onChangeNumOfCusInput(evt) {
        this.setState({ numOfCus: evt.target.value });
    }

    onChangeCouponInput(evt) {
        this.setState({ couponInput: evt.target.value });
    }

    render() {
        return (
          <div className="container">
            <label>Number of customer : </label>
            <input type="number" value={this.state.numOfCus} onChange={evt => this.onChangeNumOfCusInput(evt)} />

            <br /><br />

            <label>Coupon Code : </label>
            <input type="text" value={this.state.couponInput} onChange={evt => this.onChangeCouponInput(evt)} />
            <button onClick={this.updateCouponList}>Add</button>
            <p className="invalid">{this.state.invalidCoupon}</p>

            <h3>Used Coupons List</h3>   
            {this.state.couponUsedList.map((item, index) => (
               <p className='indent' key={index}>- {item}</p>
            ))}

            <button onClick={this.calucatePrice}>Calucate</button>

            {
                this.state.totalPriceVisible ?
                    <h3>Total price {this.state.totalPrice} Baht</h3>
                : 
                    null
            }
          </div>
        );
    }
}

export default App;













