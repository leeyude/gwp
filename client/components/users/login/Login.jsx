import React from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

UserLogin = React.createClass({
  getInitialState: function() {
    if(Accounts._autoLoginEnabled){
      return {
        logInError: "hidden",
        rememberMe: "fa fa-check rememberMeChecked",
        passwordReset: false,
      };
    }else{
      return {
        logInError: "hidden",
        rememberMe: "rememberMe",
        passwordReset: false,

      };
    }
  },

  rememberMe(e){
    e.preventDefault();
    if(this.state.rememberMe == "rememberMe"){
      this.setState( { rememberMe:'fa fa-check rememberMeChecked'} );
    }else{
      this.setState( { rememberMe:'rememberMe'} );
    };
    return false;
  },

  userLogin(e){
    e.preventDefault();
    var email = $('.email_input').val();
    var password = $('.password_input').val();
    var rememberMeChecked = this.state.rememberMe;



    if(rememberMeChecked=="fa fa-check rememberMeChecked"){
      // user requested "remember me."
      Meteor.loginWithPassword(email, password, function(error, result){
        if(error){
          console.log(error);
          this.setState( { logInError:'error'} );

        }else{
          this.setState( { logInError:'hidden'} );
          FlowRouter.go("/user_test");
        }
      }.bind(this));

    }else{
      // user would drop token if session finished.
      Meteor.loginWithPassword(email, password, function(error, result){
        if(error){
          console.log(error);
          this.setState( { logInError:'error'} );

        }else{
          this.setState( { logInError:'hidden'} );
          // remove client storage of login data
          Accounts._unstoreLoginToken();
          Accounts._autoLoginEnabled = false;
          FlowRouter.go("/user_test");
        }
      }.bind(this));
    };
  },

  passwordReset(e){
    e.preventDefault();
    this.setState( { passwordReset: true} );

  },

  cancelReset(e){
    e.preventDefault();
    this.setState( { passwordReset: false} );

  },

  sendPassReset(e){
    e.preventDefault();
    var email = $('.email_input').val();

    Meteor.call("userRequestPasswordReset", email, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },


  render(){
    if(!this.state.passwordReset){
      return (
        <div>
          <Header/>
          <div id="userLogin">
            <div className="container">
             <div className="row">
               <div className="col-sm-6 col-md-5 col-lg-4 col-center">
                 <div className="login-group">
                  <h2>登入</h2>
                  <form>
                    <div className="form-group">
                      <label className="form-label">電子信箱 E-mail</label>
                      <input type="text" placeholder="Email" ref="email" className="form-control email_input"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">密碼 Password</label>
                      <input type="password" placeholder="Password" ref="password" className="form-control password_input"/>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-6">
                          <div onClick={this.rememberMe} className={this.state.rememberMe}>
                          </div>
                          <p>記住我</p>
                        </div>
                        <div className="col-xs-6 text-right">
                          <a onClick={this.passwordReset} data-toggle="modal" data-target="#exampleModal" className="login-forgot-password" href="">忘記密碼？</a>
                        </div>
                      </div>
                    </div>
                    <p className={this.state.logInError}>帳號密碼輸入有誤，請重新輸入</p>
                    <div className="form-group">
                      <button type="submit" onClick={this.userLogin} className="btn btnGrad btn-md btn-success">登入</button>
                    </div>

                    <div className="form-divider">

                    </div>

                    <div className="form-group">
                      <div className="signin-link">
                        還沒擁有菜蟲帳號嗎？ <a className="" href="/signup">現在加入！</a>
                      </div>
                    </div>

                  </form>
                 </div>
               </div>
             </div>
            </div>
          </div>
          <Footer/>

        </div>

      )
    }else{
      return (
        <div>
          <Header/>
          <div id="passwordReset">
            <div className="container">
             <div className="row">
               <div className="col-sm-6 col-md-5 col-lg-4 col-center">
                <div className="passReset-group">
                  <div className="resetTitle">
                    <h2>密碼重設</h2>
                    <div className="resetCancel" onClick={this.cancelReset}>
                      <div className="fa fa-times">

                      </div>
                    </div>

                  </div>
                  <div className="form-divider">

                  </div>
                  <form>
                    <div className="form-group">
                      <label className="form-label">欲重設密碼之電子信箱 E-mail</label>
                      <input type="text" placeholder="Email" ref="email" className="form-control email_input"/>
                    </div>

                    <div className="form-group">
                      <button type="submit" onClick={this.sendPassReset} className="btn btnGrad btn-md btn-success">開始重設密碼</button>
                    </div>

                  </form>
                 </div>
               </div>
             </div>
            </div>
          </div>
          <Footer/>

        </div>


      )


    };
  }
});
