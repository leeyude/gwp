import React from 'react';

Footer = React.createClass({
  render(){
    return (
      <div id="mainFooter">
        <div className="container clearfix mainFooter">
          <div className='row'>
            <div className='col-md-8'>
              <div className='footerItem col-sm-2'> 關於我們   </div>
              <div className='footerItem col-sm-2'> 常見問題   </div>
              <div className='footerItem col-sm-2'> 聯絡我們   </div>
              <div className='footerItem col-sm-2'> 服務條款   </div>
            </div>
            <div className='col-md-4'>

              <div className='footerItem col-sm-8'>
                  ©菜蟲農食 2017
              </div>
              <div className= "footerLogo col-sm-4">
                  <img src="images/Logo_only-white.png" alt="菜蟲農食" width="105" height="auto"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
});

export default Footer;
