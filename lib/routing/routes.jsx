import {mount} from 'react-mounter';

publicRoutes = FlowRouter.group({
  name: 'publicroutes'
});
privateRoutes = FlowRouter.group({
  name: 'privateroutes'
});

publicRoutes.route('/', {
  name: 'Home',
  action: function(){
    mount(Homepage,{
    })
  }
});

publicRoutes.route('/howItWorks', {
  name: 'How It Works',
  action: function(){
    mount(HowItWorks,{
    })
  }
});

publicRoutes.route('/ourServices', {
  name: 'Our Services',
  action: function(){
    mount(OurServices,{
    })
  }
});

publicRoutes.route('/signup', {
  name: 'Sign Up',
  action: function(){
    mount(Signup,{
    })
  },
  subscriptions: function() {
    this.register('currentUser', Meteor.subscribe('currentUser'));
  }
});

publicRoutes.route( '/verify-email/:token', {
  name: 'Verify Email',
  action: function( params ) {
    Accounts.verifyEmail( params.token, function(error, result){
      if ( error ) {
        return error
      } else {
        FlowRouter.go( '/signup' );
      }
    });
  }
});

publicRoutes.route('/login', {
  name: 'Log In',
  action: function(){
    mount(UserLogin,{
    })
  },
});

publicRoutes.route('/user_test', {
  name: 'User_test',
  action: function(){
    mount(RegDelivery,{
    })
  }
});

publicRoutes.route('/upload', {
  name: 'Upload',
  action: function(){
    mount(Upload,{
    })
  }
});

privateRoutes.route('/dashboard', {
  name: 'Dashboard',
  action: function(){
    mount(Dashboard,{
    })
  }
});
