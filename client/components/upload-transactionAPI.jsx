import React from 'react';
import { HTTP } from 'meteor/http'

export default Upload_transactions = React.createClass({
  syncNow(e){
    e.preventDefault();
    console.log("submit");

    Meteor.call("createTransactions", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log('result',result.content.length);

      }
    });

  },


  render(){
    return (
      <div>

      <button onClick={this.syncNow} name="uploadTransactions">Start Getting Transactions!</button>
      </div>


    )
  }
});
