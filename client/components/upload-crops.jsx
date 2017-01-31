import React from 'react';

export default Upload_crops = React.createClass({
  submitFile(e){
    e.preventDefault();
    console.log("submit");

    Papa.parse( e.target.files[0], {
      header: true,
      complete( result ) {
        console.log(result);

        Meteor.call("parseUpload_crops", result.data, function(error, result){
          if(error){

          }
          if(result){

          }
        });
      }
    });
  },


  render(){
    return (
      <div>
      <h4 className="page-header"><strong>for Crops! </strong>Upload a CSV</h4>
      <input onChange={this.submitFile} type="file" name="uploadCSV" />
      </div>


    )
  }
});
