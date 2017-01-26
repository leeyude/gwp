import React from 'react';

export default DistrictList = React.createClass({
  render(){
    return (
      <option>
       {this.props.name}
      </option>
    );
  }
});
