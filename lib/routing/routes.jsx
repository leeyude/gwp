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
  }
});

publicRoutes.route('/login', {
  name: 'Log In',
  action: function(){
    mount(UserLogin,{
    })
  }
});

publicRoutes.route('/user_test', {
  name: 'User_test',
  action: function(){
    mount(User_Test,{
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
