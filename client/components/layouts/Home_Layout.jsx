import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Homepage from '../../components/pages/homepage/Homepage';

HomeLayout = React.createClass({

  render(){
    return (
      <div>
        <Header/>
        <Homepage/>
        <Footer/>
      </div>
    )
  }
});
