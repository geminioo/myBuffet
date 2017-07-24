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


      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}


class Header extends React.Component {
   render() {
      return (
          <div className="App-header">
            <h2>Hurry Code Buffet</h2>
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
         couponInput: '',
         invalidCoupon: '',
      }


      this.updateCouponList = this.updateCouponList.bind(this);


   }

    updateCouponList() {
        if(this.state.couponInput == 'LUCKY ONE' || this.state.couponInput == '4PAY3' || this.state.couponInput == 'LUCKY TWO'){
            console.log(this.state.couponUsedList.indexOf(this.state.couponInput))
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

   updateInputValue(evt) {
        this.setState({
          couponInput: evt.target.value
        });
    }

   render() {
      return (
          <div className="container">
            <label>Number of customer</label>
            <input type="number" name="numOfCus" />

            <br />

            <label>Coupon Code</label>
            <input type="text" value={this.state.couponInput} onChange={evt => this.updateInputValue(evt)} />
            <button onClick={this.updateCouponList}>Add</button>
            <p className="invalid">{this.state.invalidCoupon}</p>
            {/* for (var i=0; i < 5; i++) { */}

            <h3>Used Coupons: {this.state.couponUsedList}</h3>    
          </div>
      );
   }
}

Content.defaultProps = {
  couponUsedList: [1,2,3],
}

export default App;













