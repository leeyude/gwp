import React from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

Signup = React.createClass({

  getInitialState(){
    return {
        message: '',
        messageClass: 'hidden'
    }
  },

  render(){
    return (
      <div>
        <Header/>
        <div id="registration">
          <div className="registration_Main">
            <div className="signup_Title">
              <h1 className="title">
                跟菜蟲買菜
              </h1>
              <h4 className="subtitle">
                今天就開始節省預算、食材產地直送、全程冷藏保鮮
              </h4>
            </div>

            <div className="registration-box clearfix">
              <div className="registration-column col-md-4 col-md-push-6">
                <form onSubmit={this.handleSubmit}>
                  <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">電子信箱 E-mail</label>
                        <input type="text" placeholder="Email" ref="email"
                                 className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label className="form-label">密碼 Password</label>
                          <input type="password" placeholder="Password" ref="password"
                                 className="form-control"/>
                      </div>
                      <button type="submit" className="btn btnGrad btn-md btn-success"> 下一步</button>
                      <span className={this.state.messageClass}>{this.state.message}</span>

                  </div>
                </form>
              </div>
              <div className="registration-column col-md-4 col-md-pull-2 text-center">
                <img src="/images/cabbage.png"/>

              </div>
            </div>
          </div>
        </div>
        <Footer/>

      </div>


    )
  }
});
