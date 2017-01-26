import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Cities, Districts } from '../../../../../imports/collections/city_county/district_Collection';
import { Mongo } from 'meteor/mongo';
import CityList from './cities';

RegDelivery = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var city_handle = Meteor.subscribe("cities");
    var cities = [];
    if(city_handle.ready()){
      cities = Cities.find().fetch();
    };

    if(!this.state.citySelect){
      return {
        // if no city is selected, no districts will be returned.
        city_handle: city_handle.ready(),
        cities: cities,
      };
    }else{
      var district_handle = Meteor.subscribe("districts", this.state.citySelect);
      var districts = [];

      if(district_handle.ready()){
        districts = Districts.find().fetch();
      }

      return {
        // only if a valid district is selected, districts are returned.

        city_handle: city_handle.ready(),
        cities: cities,

        district_handle: district_handle.ready(),
        districts: districts,
      };
    };
  },

  getInitialState: function() {
    return {
      citySelect: false,
    }
  },

  renderCities(){
    var cities = this.data.cities.map(function(city){

      return <CityList key={city._id} name={city.name}/>;
    });
    return cities;
  },

  renderDistricts(){
    if(!this.state.citySelect){
      return [];
    }else{
      var districts = this.data.districts.map(function(district){

        return <DistrictList key={district._id} name={district.District_Village}/>;
      });
      return districts;
    };

  },

  handleCityOptions(e){
    e.preventDefault();
    var citySelected = $('#citySelect').val();
    if(citySelected== '-'){
      this.setState( { citySelect: false} );
    }else{
      this.setState( { citySelect: citySelected} );
    };


  },

  handleDistrictOptions (e){
    e.preventDefault();
    districtSelected = $('#districtSelect').val();


  },

  render(){

    return (
      <div>
        <RegHeader/>
        <div id="regDelivery">
          <div className="regDelivery-box clearfix">
            <div className="regDelivery-column col-md-4 col-md-push-6">

            </div>
            <div className="registration-column col-md-4 col-md-pull-2 text-center">
              <div className="form-group">
                <div className="">
                  <div className="">
                  </div>
                  <label htmlFor="sel1">所在縣市：</label>
                  <select onChange={this.handleCityOptions} className="form-control" id="citySelect">
                    <option>-</option>
                    {this.renderCities()}
                  </select>
                  <br />

                  <label htmlFor="sel2">鄉、鎮、市、區：</label>
                  <select onChange={this.handleDistrictOptions} className="form-control" id="districtSelect">
                    <option>-</option>
                    {this.renderDistricts()}
                  </select>


                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer/>
      </div>


    )
  }
});
