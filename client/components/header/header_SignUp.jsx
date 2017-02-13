import React from 'react';

RegHeader = React.createClass({


  render(){

    return (
      <nav className="navbar navbar-default navbar-fixed-top" id="regHeader">
        <div className="container-fluid navHolder">
          <div id="logo">
            <a href="/"><img src="/images/Logo.png" alt="Good Worm"/></a>
          </div>
          <div id="regProgress">
            <div className="regStep col-md-3 col-xs-1">
              <span className="stepImg">
                <img src="/images/1_Green.png"></img>
              </span>
              <span className="stepText active">歡迎註冊</span>
            </div>
            <div className="regStep col-md-3 col-xs-1">
              <span className="stepImg">
                <img src="/images/2_off.png"></img>
              </span>
              <span className={this.props.cartIsSet} className="stepText" >設計菜車</span>
            </div>
            <div className="regStep col-md-3 col-xs-1">
              <span className="stepImg">
                <img src="/images/3_off.png"></img>
              </span>
              <span className={this.props.cartIsSet} className="stepText">基本資料 </span>
            </div>
            <div className="regStep col-md-3 col-xs-1">
              <span className="stepImg">
                <img src="/images/4_off.png"></img>
              </span>
              <span className={this.props.cartIsSet} className="stepText">開始省錢</span>
            </div>
          </div>


        </div>
      </nav>
    );
  }
});

export default RegHeader;
