import React from 'react';

export default CityList = React.createClass({
  render(){
    return (
      <option>
       {this.props.name}
      </option>
    );
  }
});
