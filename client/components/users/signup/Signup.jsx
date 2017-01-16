import React from 'react';
import RegHeader from '../../../components/header/header_SignUp';
import Footer from '../../../components/footer/footer';

Signup = React.createClass({
  getInitialState: function() {
      return {
        email: '',
        password: '',
        email_verify_format:'',
      };
  },

  userSubmit(e){
    e.preventDefault();
    email = $('.email_input').val();
    password = $('.password_input').val();


    if ( email.length > 5 ){
      if(!/@/.test(email)) {
        alert("請輸入一個正確的電子信箱");
      }else{
        console.log(email+" "+password);
        Meteor.call("user_reg", email, password, function (error, result) {
              if(error){
                console.log(error);

              }else if (result) {
                console.log(result);

              }
        });
      };
    }else{
      alert("請輸入一個電子信箱");

    };

/*    */

  },

  render(){
    return (
      <div>
        <RegHeader/>
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
                                 className="form-control email_input"/>
                      </div>
                      <div className="form-group">
                          <label className="form-label">密碼 Password</label>
                          <input type="password" placeholder="Password" ref="password"
                                 className="form-control password_input"/>
                      </div>
                      <button type="submit" onClick={this.userSubmit} className="btn btnGrad btn-md btn-success"> 下一步</button>
                      <span className={this.state.messageClass}>{this.state.message}</span>
                      <div className="note">
                        <p>
                        當你確認加入會員之後，表示您已經閱讀、瞭解且同意接受本條款所有的內容與約定。並完全接受本服務現有與未來衍生之服務項目。
                        </p>
                      </div>

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
