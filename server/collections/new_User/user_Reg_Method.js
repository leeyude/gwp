Meteor.methods({
  user_reg:function(email, password){
    Accounts.createUser({
      email: email,
      password: password
    });
  console.log(Meteor.users.find().fetch());

  }
});
