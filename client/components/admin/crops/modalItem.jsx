import React from 'react';

export default ModalItem = React.createClass({

  render(){
    return (
      <div>
        <div className="modal">
          {this.props.children}
        </div>
      </div>

    );
  }
});
