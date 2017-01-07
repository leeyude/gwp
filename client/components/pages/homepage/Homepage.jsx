import React from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

Homepage = React.createClass({
  render(){
    return (
      <div>
        <Header/>
        <div id="homepage">
          <div className="landing">
            <div className="container">
              <div className="col-md-6">
              <div className="contentHolder">
                <div>
                </div>

                <h1>
                  找菜蟲叫菜
                </h1>
                <h1>
                  超新鮮
                </h1>
                <h1>
                  更省錢
                </h1>
                <h1>
                  好安心
                </h1>
              </div>
              </div>
              <div className="col-md-6">

              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>

    )
  }
});

export default Homepage;
