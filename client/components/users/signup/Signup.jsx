import React from 'react';
import RegHeader from '../../../components/header/header_SignUp';
import Footer from '../../../components/footer/footer';
import { Cities } from '../../../../imports/collections/city_county/district_Collection';


Signup = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var handle = Meteor.subscribe("currentUser");
    var city_handle = Meteor.subscribe("cities");
    var cities = [];
    if(city_handle.ready()){
      cities = Cities.find().fetch();
    };

    return {
      userLoading: !handle.ready(),
      currentUser: Meteor.users.findOne({_id: Meteor.userId()}),
      city_handle: city_handle.ready(),
      cities: cities,
    };
  },

  getInitialState: function() {
    return {
      email: '',
      emailIsVerified:'',
      cityIsSelected: 'hidden',
      submitSpin: 'hidden',
      cartIsSet:'',
      deliveryIsSet: '',
      planConfirmed: '',
      emailIsCorrect:'hidden',
      passwordIsEntered: 'hidden',
      emailExisted: 'hidden',
    }
  },

  renderCities(){

    var cities = this.data.cities.map(function(city){

      return <CityList key={city._id} name={city.name}/>;
    });
    return cities;
  },

  userSubmit(e){
    e.preventDefault();
    var email = $('.email_input').val();
    var password = $('.password_input').val();
    var city = $('#citySelect').val();

    this.setState( { email: email} );


    if ( email.length > 5 ){
      if(!/@/.test(email)) {
        this.setState( { emailIsCorrect:'error'} );

      }else{
        this.setState( { emailIsCorrect:'hidden'} );
        // Email format is fine. Now check for password entry.
        if(password){
          this.setState( { passwordIsEntered:'hidden'} );

          if(city==='-'){
            this.setState( { cityIsSelected:'error'} );

          }else{
            // email is entered; password is set; and city is selected.
            this.setState( { cityIsSelected:'hidden'} );
            this.setState( { submitSpin:'fa fa-spinner fa-pulse fa-fw'} );

            Meteor.call("user_reg", email, password, city, function (error, result) {
              if(error){
                this.setState( { emailExisted:'error'} );
                // The state gives user a link to login page. Do nothing.

              }else{
                this.setState( {
                  emailExisted:'hidden',
                  emailIsVerified: 'waiting'
                } );
                // account and password are correct.
                Meteor.loginWithPassword(email, password, function(){

                });
              };
            }.bind(this));
          }

        }else{
        // no password entry
          this.setState( { passwordIsEntered:'error'} );

        };

      };
    }else{
      this.setState( { emailIsCorrect:'error'} );

    };

  },

  render(){
    if(!Meteor.userId()){
      // user does not exist.
      if(this.state.emailIsVerified == ''){
      // only email and password exists in account creation

        return (
          <div>
            <RegHeader
              cartIsSet={this.state.cartIsSet}
              deliveryIsSet = {this.state.deliveryIsSet}
              planConfirmed = {this.state.planConfirmed}
            />

    // sign up form for email and password starts here.
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
                            <label className="form-label">電子信箱 E-mail：</label>
                            <p className={this.state.emailIsCorrect}>請輸入正確的電子信箱 E-mail</p>
                            <input type="text" placeholder="Email" ref="email"
                                     className="form-control email_input"/>
                          </div>
                          <div className="form-group">
                              <label className="form-label">密碼 Password：</label>
                              <p className={this.state.passwordIsEntered}>密碼 Password 請勿空白</p>
                              <input type="password" placeholder="Password" ref="password"
                                     className="form-control password_input"/>
                          </div>

                          <div className="form-group">
                            <label  htmlFor="city">所在縣市：</label>
                            <p className={this.state.cityIsSelected}>請輸入您所在的縣市</p>

                            <div >
                              <select className="form-control" id="citySelect">
                                <option>-</option>
                                {this.renderCities()}
                              </select>
                            </div>
                          </div>

                          <p className={this.state.emailExisted}>電子信箱E-mail帳號已經存在，請從此<a href="/login">登入</a>。</p>
                          <button type="submit" onClick={this.userSubmit} className="btn btnGrad btn-md btn-success"> 下一步
                          <i className={this.state.submitSpin}></i>
                          </button>
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

      }else if(this.state.emailIsVerified == 'waiting'){
  // verification email is sent to user. waiting for confirmation.
        return (
          <div>
            <RegHeader
              cartIsSet={this.state.cartIsSet}
              deliveryIsSet = {this.state.deliveryIsSet}
              planConfirmed = {this.state.planConfirmed}
            />
            <EmailVerification email={this.props.email}/>

            <Footer/>

          </div>
        );


      }else{
  // email verification is complete. Move on to Cart setting.
      <div>
        going to registration next step

      </div>

      }

    }else{
      // user exists.
      if(this.data.userLoading){
        return <Footer/>
      }else{
      // user exists and user data is loaded.
        if(this.data.currentUser.emails[0].verified){
          console.log("email verified");

          return (
            <div>
              <RegHeader
                cartIsSet={this.state.cartIsSet}
                deliveryIsSet = {this.state.deliveryIsSet}
                planConfirmed = {this.state.planConfirmed}
              />
              <RegCart/>
              <Footer/>
            </div>
          );
        }else{
          console.log("email NOT verified");
          return (
            <div>
              <RegHeader
                cartIsSet={this.state.cartIsSet}
                deliveryIsSet = {this.state.deliveryIsSet}
                planConfirmed = {this.state.planConfirmed}
              />
              <EmailVerification email={this.data.currentUser.emails[0].address}/>
              <Footer/>
            </div>
          );
        }


      };
    };
  }
});
