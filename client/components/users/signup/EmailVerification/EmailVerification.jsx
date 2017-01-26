import React from 'react';

EmailVerification = React.createClass({
  getInitialState: function() {
    return {
      withIn15Mins: "hidden",
      timeRemain: "",
    };
  },

  resend(e){
    e.preventDefault();
    Meteor.call("verification_resend", Meteor.userId(), function(error, result){
      if(result>-1 && result<16){
        this.setState( { withIn15Mins:'error'} );
        this.setState( { timeRemain: result} );
      }else{
        this.setState( { withIn15Mins:'hidden'} );
        this.setState( { timeRemain: ''} );
      }
    }.bind(this));
  },

  rereg(e){
    e.preventDefault();
    Meteor.logout();
    FlowRouter.go('/signup');
  },

  render(){

    return (
      <div>
        <div id="emailVerification">
          <div className="email_Verification_Main">
            <div className="verificationFrame">
              <h1 className="title">
                您的確認信將盡快寄送至
              </h1>
              <h1 className="title email">
                {this.props.email}
              </h1>
              <h4 className="subtitle">
                若您15分鐘後仍尚未收到確認信，您可以
              </h4>
              <div className={this.state.withIn15Mins}>
                <p>請在{this.state.timeRemain}分鐘後在重新發送確認信</p>
              </div>
              <div className="reverify">
                <button id="resend" className="btn btn-reverify" onClick={this.resend}>
                  重新發送認證信
                </button>
              </div>
            </div>

            <h4 className="subtitle">
              這不是您的電子信箱？<p id="rereg" onClick={this.rereg}>
                <a>
                重新開始註冊
                </a>
              </p>
            </h4>

          </div>
        </div>
      </div>


    )
  }
});
