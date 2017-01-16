import React from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

UserLogin = React.createClass({

  userLogin(e){
    e.preventDefault();
    email = $('.email_input').val();
    password = $('.password_input').val();

    Meteor.loginWithPassword(email, password, function(error, result){
      if(error){
        console.log(error);

      }else{
        FlowRouter.go("/user_test");

      }
    });
  },


  render(){
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
                        <label>記住我</label>
                      </div>
                      <div className="col-xs-6 text-right">
                        <a className="login-forgot-password " href="">忘記密碼？</a>
                      </div>
                    </div>
                  </div>
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
  }
});
