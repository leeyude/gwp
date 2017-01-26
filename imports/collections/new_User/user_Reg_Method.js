Meteor.methods({
  user_reg: function(email, password){
    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        regProgress: {
          cartIsSet: false,
          deliveryIsSet: false,
          planConfirmed: false
        },


      }
    });
    var user= Meteor.users.findOne({'emails.0.address': email});

    if ( user._id ) {
      return Accounts.sendVerificationEmail( user._id );

    };

  },

  userRequestPasswordReset: function(email){
    var user= Meteor.users.findOne({'emails.0.address': email});
    if(!user){
      // user does not exist according to the email. send the email anyways to invite email owner to join our service.
    }else{
      // User exists on the email query. Start sending password reset email.

    }

  },

  verification_resend: function(userId){
    var currentTime = new Date();
    var thisTime = moment(currentTime);

    var user = Meteor.users.findOne({_id: userId});
    var tokenTimes = user.services.email.verificationTokens.length;

    var lastTime = moment(user.services.email.verificationTokens[tokenTimes-1].when);

    var timeDiff = thisTime.diff(lastTime, 'minutes');
    var timeRemain = 15- timeDiff;

    if(timeDiff<=15){
      return timeRemain;
    }

    return Accounts.sendVerificationEmail(userId);
  },




});
