import React from 'react';

Header = React.createClass({
  links: [
    {_id: 1, href: '/ourServices', text: '服務簡介'},
    {_id: 2, href: '/howItWorks', text: '良食網絡'},
  ],

  render(){

    const navTitles = this.links.map(function(link){

      return (
        <li key={link._id}>
          <a className="navItem navComponent" href={link.href}> {link.text}</a>
        </li>
      )
    });

    return (

      <nav className="navbar navbar-default navbar-fixed-top" id="mainHeader">
        <div className="container-fluid navHolder">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div id="logo">
              <a href="/"><img src="/images/Logo.png" alt="Good Worm"/></a>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {navTitles}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="navItem navComponent" href="/login">登入</a></li>
              <li>
                <a href="/signup" className="btn sign-up btnGrad" id="signup">加入菜蟲</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    )
  }
});

export default Header;
