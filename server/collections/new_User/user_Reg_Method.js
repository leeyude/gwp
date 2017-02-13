Meteor.methods({
  user_reg: function(email, password, city){
    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        regProgress: {
          cartIsSet: false,
          deliveryIsSet: false,
          planConfirmed: false
        },
        location: city,
        cart: [],
      },
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

  addEmptyCart: function(){
    var user= Meteor.users.findOne({_id: this.userId});

    if(user.profile.cart.length<7){
      user.profile.cart.push(
        {
          deliveryDays: [],
          cropItems: [],
          itemDetails: [],
        }
      );

      Meteor.users.update({_id: this.userId}, {$set:{
        'profile.cart': user.profile.cart
      }});


    }else{
      return 'max';
    }

  },

  deleteCart: function(location){
    var user= Meteor.users.findOne({_id: this.userId});
    user.profile.cart.splice(location, 1);
    Meteor.users.update({_id: this.userId}, {$set:{
      'profile.cart': user.profile.cart
    }});
  },

  addDeliveryDay: function(cartSelection, thisDay){
    var user= Meteor.users.findOne({_id: this.userId});

    for(i=0; i< user.profile.cart.length; i++){
      if(cartSelection==i){
        user.profile.cart[i].deliveryDays.push(thisDay);
      }else{
        var deleteThisDay = user.profile.cart[i].deliveryDays.indexOf(thisDay);

        if(deleteThisDay==-1){

        }else{
          user.profile.cart[i].deliveryDays.splice(deleteThisDay, 1);
        }

      }
    }
    Meteor.users.update({_id: this.userId}, {$set:{
      'profile.cart': user.profile.cart
    }});
  },

  removeDeliveryDay: function(cartSelection, thisDay){
    var user= Meteor.users.findOne({_id: this.userId});

    var deleteThisDay = user.profile.cart[cartSelection].deliveryDays.indexOf(thisDay);
    user.profile.cart[cartSelection].deliveryDays.splice(deleteThisDay, 1);

    Meteor.users.update({_id: this.userId}, {$set:{
      'profile.cart': user.profile.cart
    }});
  },

  insertItemToCart: function(cartNum, itemId, itemDetails){
    var user= Meteor.users.findOne({_id: this.userId});
    var cart = user.profile.cart;

    cart[cartNum].cropItems.push(itemId);
    cart[cartNum].itemDetails.push(itemDetails);

    Meteor.users.update({_id: this.userId}, {$set:{
      'profile.cart': cart
    }});

    return 'ok';
  },

  deleteCartItem: function(cartNum, itemLoc){
    var user= Meteor.users.findOne({_id: this.userId});
    var cart = user.profile.cart;

    cart[cartNum].cropItems.splice(itemLoc, 1);
    cart[cartNum].itemDetails.splice(itemLoc, 1);

    Meteor.users.update({_id: this.userId}, {$set:{
      'profile.cart': cart
    }});

    return 'ok';
  },
});
