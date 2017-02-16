import React from 'react';
import { Markets } from '../../../../imports/collections/markets/markets';
import { Cities, Districts } from '../../../../imports/collections/city_county/district_Collection';


export default MarketCoverage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var market_handle = Meteor.subscribe("marketQuery");
    var markets = [];
    var city_handle = Meteor.subscribe("cities");
    var cities = [];

    if(market_handle.ready()){
      markets = Markets.find().fetch();
    };
    if(city_handle.ready()){
      cities = Cities.find().fetch();
    };

    return {
      markets: markets,
      cities: cities
    };
  },

  getInitialState: function() {
    return {
      marketId: false,
      name: false,
      servingVeggie: false,
      servingFruit: false,
      coverage: [],
    }
  },

  renderMarketList: function(){
    if(this.data.markets.length>0){
      return this.data.markets.map(function(eachMarket){

        return (
          <tr key={eachMarket._id} data-toggle="modal" data-target="#marketEditModal" onClick={(e)=>this.onModalOpen(eachMarket)}>
            <td>{eachMarket.name}</td>
            <td>{eachMarket.servingVeggie}</td>
            <td>{eachMarket.servingFruit}</td>
            <td>{this.coverageInfo(eachMarket)}</td>
          </tr>
        );
      }.bind(this));
    };
  },

  coverageInfo: function(eachMarket){
    return eachMarket.coverage.map(function(coveredCity){
      return coveredCity.name;
    });
  },

  onModalOpen: function(market){

    this.setState( { marketId: market._id} );
    this.setState( { name: market.name} );
    this.setState( { servingVeggie: market.servingVeggie} );
    this.setState( { servingFruit: market.servingFruit} );
    this.setState( { coverage: market.coverage} );
  },

  handleServingVeggie: function(e){
    e.preventDefault();
    if(this.state.servingVeggie==="Yes"){
      this.setState( { servingVeggie: "No"} );
    }else{
      this.setState( { servingVeggie: "Yes"} );
    };
  },

  handleServingFruit: function(e){
    e.preventDefault();
    if(this.state.servingFruit==="Yes"){
      this.setState( { servingFruit: "No"} );
    }else{
      this.setState( { servingFruit: "Yes"} );
    };  },

  listAllCities: function(){

    return this.data.cities.map(function(city){
      if(this.state.coverage.every(coveredCity => coveredCity.name !=city.name)){
        return (
          <div key={city._id} className='cityItem' onClick={(e) => this.addToSelected(city)}>
            {city.name}
          </div>
        );
      };
    }.bind(this));
  },

  addToSelected: function(city){
    var coverage = this.state.coverage;
    coverage.push(city);
    this.setState({coverage: coverage});
  },

  selectedCities: function(){
    return this.state.coverage.map(function(city){
      return (
        <div key={city._id} className='cityItem' onClick={(e) => this.removeFromSelected(city)}>
          {city.name}
        </div>
      );
    }.bind(this));
  },

  removeFromSelected: function(city){
    var coverage = this.state.coverage;
    coverage.splice(coverage.indexOf(city), 1);
    this.setState({coverage: coverage});
  },

  confirmEdit: function(e){
    e.preventDefault();
    var marketId = this.state.marketId;
    var servingVeggie = this.state.servingVeggie;
    var servingFruit = this.state.servingFruit;
    var coverage = this.state.coverage;

    Meteor.call("updateMarket", marketId, servingVeggie, servingFruit, coverage, function(error, result){
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
          <h2>管理市場涵蓋區域</h2>
          <table className='table table-hover table-striped table-responsive'>
          <thead>
            <tr>
              <th>市場</th>
              <th>蔬菜市場？</th>
              <th>水果市場？</th>
              <th>涵蓋區域</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMarketList()}
          </tbody>
          </table>

          <div id="marketEditModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">修改品項內容</h4>
                </div>
                <div className="modal-body">
                  <div className='row'>

                    <div className='col-md-12'>

                      <h4>市場名稱：{this.state.name}</h4>

                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-md-12'>

                      <label>交易蔬菜</label>
                      <select className="form-control servingVeggie"      value={this.state.servingVeggie} onChange={this.handleServingVeggie}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>

                      <label>交易水果</label>
                      <select className="form-control servingFruit" value={this.state.servingFruit} onChange={this.handleServingFruit}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>

                      <label>涵蓋縣市</label>
                      <div className='col-md-6 allCities cityColumn'>
                        <h4>可選縣市</h4>
                        {this.listAllCities()}
                      </div>

                      <div className='col-md-6 selectedCities cityColumn'>
                        <h4>已選縣市</h4>
                        {this.selectedCities()}

                      </div>

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
