import React from 'react';

export default Upload_crops = React.createClass({
  submitFDetails(e){
    e.preventDefault();

    Papa.parse( e.target.files[0], {
      header: true,
      complete( result ) {
        console.log(result);

        Meteor.call("parseUpload_cropDetails", result.data, function(error, result){
          if(error){

          }
          if(result){

          }
        });
      }
    });
  },

  submitItems(e){
    e.preventDefault();

    Papa.parse( e.target.files[0], {
      header: true,
      complete( result ) {
        console.log(result);

        Meteor.call("parseUpload_cropItems", result.data, function(error, result){
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
      <h4 className="page-header"><strong>for Crop Details! </strong>Upload a CSV</h4>
      <input onChange={this.submitFDetails} type="file" name="uploadCSV" />

      <div>
      <h4 className="page-header"><strong>for Crop Items! </strong>Upload a CSV</h4>
      <input onChange={this.submitItems} type="file" name="uploadCSV" />


      </div>

      </div>


    )
  }
});
