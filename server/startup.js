import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  process.env.MAIL_URL = "smtp://thevegworm%40gmail.com:ntu313op*@smtp.gmail.com:465";

  Meteor.publish("currentUser", function(){
    return Meteor.users.find({_id: this.userId});
  });

});
