import React from 'react';
import { CropTypes } from '../../../../imports/collections/crops/cropTypes';

export default CropList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var crops_handle = Meteor.subscribe("cropTypes");
    var crops = [];

    if(crops_handle.ready()){
      crops = CropTypes.find().fetch();
    };

    return {
      crops_handle: !crops_handle.ready(),
      crops: crops,
    };
  },

  getInitialState: function() {
    return {
      cropId: false,
      category: false,
      name_crop: false,
      isModalOpen: false,
      name_variety: false,
      isServing: false,
      isImported: false
    }
  },

  renderCropList(){

    if(this.data.crops.length==0){
    }else{
      var cropLine = this.data.crops.map(function(crop){

        return(
          <tr key={crop._id} onClick={(e)=>this.onModalOpen(crop)} data-toggle="modal" data-target="#cropEditModal">
            <td>{crop.category}</td>
            <td>{crop.name_crop}</td>
            <td>{crop.name_variety}</td>
            <td>{crop.isServing}</td>
            <td>{crop.isImported}</td>
          </tr>
        );
      }.bind(this));
      return cropLine;
    };
  },

  onModalOpen(crop){
    this.setState( { cropId: crop._id} );
    this.setState( { category: crop.category} );
    this.setState( { name_crop: crop.name_crop} );

    this.setState( { name_variety: crop.name_variety} );
    this.setState( { isServing: crop.isServing} );
    this.setState( { isImported: crop.isImported} );

  },

  handleIsServingChange(e){
    e.preventDefault();
    this.setState( { isServing: event.target.value} );
  },

  handleIsImportedChange(e){
    e.preventDefault();
    this.setState( { isImported: event.target.value} );
  },

  confirmEdit(crop){
    var cropObject = {
      _id: this.state.cropId,
      name_variety: $('.name_variety_input').val(),
      isServing: $('.isServing_input').val(),
      isImported: $('.isImported_input').val()
    };


    Meteor.call("editCropContent", cropObject, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },

  render(){
    return (
      <div>
        <div className='container-fluid'>
          <h2>管理服務品項</h2>
          <table className='table table-hover table-striped table-responsive'>
          <thead>
            <tr>
              <th>大類</th>
              <th>品項</th>
              <th>品種</th>
              <th>為目前服務品項？</th>
              <th>為進口類別？</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCropList()}
          </tbody>
          </table>


          <div id="cropEditModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">修改品項內容</h4>
                </div>
                <div className="modal-body">
                  <div className='row'>

                    <div className='col-md-12'>

                      <h4>大類：{this.state.category}</h4>
                      <h4>品項名：{this.state.name_crop}</h4>

                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-md-12'>

                      <label>品種名稱</label>
                      <input type="text" value={this.state.name_variety} className="form-control name_variety_input"/>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-md-12'>

                      <label>目前服務品項</label>
                      <select className="form-control isServing_input"      value={this.state.isServing} onChange={this.handleIsServingChange}>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>

                      <label>為進口品項</label>
                      <select className="form-control isImported_input" value={this.state.isImported} onChange={this.handleIsImportedChange}>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                      </select>
                    </div>
                  </div>


                </div>
                <div className="modal-footer">
                  <button onClick={this.confirmEdit} type="button" className="btn btn-warning" data-dismiss="modal">確認修改</button>
                  <button type="button" className="btn btn-default" data-dismiss="modal">關閉</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
});
