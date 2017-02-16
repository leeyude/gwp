import React from 'react';
import { Markets } from '../../../../imports/collections/markets/markets';
import { Cities, Districts } from '../../../../imports/collections/city_county/district_Collection';
import { Transactions, TransactionsSummary } from '../../../../imports/collections/transactions/transactions';

export default TransactionDashboard = React.createClass({
  getInitialState: function() {
    return {
      numRecords: 0,
      startDate: 0,
      endDate: 0,
      numRecordsLatestDate: [],
    }
  },

  componentWillMount(){
    // count number of records.
   Meteor.call("countRecords", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

        this.setState({ numRecords: result.toLocaleString()})
      }
    }.bind(this));

    Meteor.call("earliestDate", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

        this.setState({ startDate: result});
      }
    }.bind(this));

    Meteor.call("mostCurrentDate", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

        this.setState({ endDate: result})
      }
    }.bind(this));

    Meteor.call("countRecordsLatestDate", this.state.endDate,function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

        this.setState({ numRecordsLatestDate: result});
      }
    }.bind(this));
  },

  updateTransactions: function(){
    Meteor.call("updateTransactions", this.state.endDate, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log(result);
      }
    });
  },

  renderRecentRecords: function(){
    if(this.state.numRecordsLatestDate){
      return this.state.numRecordsLatestDate.map(function(item){

        return (
          <tr key={item.queryDate}>
            <td>{item.queryDate}</td>
            <td>{item.numRecordsOfTheDay}</td>
            <td>{item.numRecordsSource}</td>
            <td>{item.numRecordsSource - item.numRecordsOfTheDay}</td>
          </tr>
        );
      }.bind(this));
    }else{
      return (
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    };
  },

  render(){

    return (
      <div>
        <div className='container-fluid'>
          <h2>交易資料管理</h2>

          <div className="col-md-12 controlPanel">
            <div className="row">
              <div className="col-md-6">
                <div className="panelBlock">
                  <h4>交易資料總覽</h4>
                  <div className="divider"></div>
                  <div className="panelContent">
                    <label>總筆數</label>
                    <div className="panelContentDetail">{this.state.numRecords}</div>
                  </div>
                  <div className="panelContent">
                    <label>資料起訖時間</label>
                    <div className="panelContentDetail">{this.state.startDate} 至 {this.state.endDate}</div>
                  </div>
                  <div className="panelContent">
                    <label>資料庫內最近日資料筆數</label>
                    <div className="panelContentDetail">
                      <table className='table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Records in DB</th>
                            <th>Records in Source</th>
                            <th>Diff. </th>

                          </tr>
                        </thead>
                        <tbody>
                          {this.renderRecentRecords()}
                        </tbody>
                      </table>


                    </div>
                  </div>
                  <div className="panelContent">
                    <label>資料源該日資料筆數</label>
                    <div className="panelContentDetail"></div>
                  </div>
                  <div className="panelContent">
                    <button onClick={this.updateTransactions}>更新資料至最近</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">

              </div>
            </div>
            <div className="row">
            </div>
            <div className="row">
            </div>
          </div>
          <div className="col-md-12 infoPanel">
            <div className="row">
            </div>
            <div className="row">
            </div>
            <div className="row">
            </div>
          </div>




        </div>
      </div>

    );
  }
});
