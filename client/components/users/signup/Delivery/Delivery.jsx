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
      districtSelect: false,
    }
  },

  renderCities(){
    var cities = this.data.cities.map(function(city){

      return <CityList key={city._id} name={city.name}/>;
    });
    return cities;
  },

  displayDistricts(){
    if(this.state.citySelect){
      return (
        <div className="districtSelect">
          <label className="col-md-6" htmlFor="sel2">鄉鎮市區：</label>
          <div className="col-md-6">
            <select onChange={this.handleDistrictOptions} className="form-control" id="districtSelect">
              <option>-</option>
              {this.renderDistricts()}
            </select>
          </div>

        </div>
      );
    };
  },

  displayAddressInput(){
    return false;
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
      this.setState( { districtSelect: false} );

    }else{
      this.setState( { citySelect: citySelected} );
    };


  },

  handleDistrictOptions (e){
    e.preventDefault();
    var districtSelected = $('#districtSelect').val();

    if(districtSelected== '-'){
      this.setState( { districtSelect: false} );
    }else{
      this.setState( { districtSelect: districtSelected} );
    };

    console.log(this.state.districtSelect);


  },

  render(){

    return (
      <div>
        <div id="regDelivery">
          <div className="regDelivery-box clearfix">
            <div className="regDelivery-column col-md-4 col-md-push-6">
          


            </div>
            <div className="registration-column col-md-4 col-md-pull-2 text-center">
              <div className="form-group">
                <div className="inputBlock">
                  <div className="businessNameInput">
                    <label className="col-md-6">商號名稱：</label>
                    <div className="col-md-6">
                      <input type="text" placeholder="商號名稱" className="form-control mobile_input"/>
                    </div>
                  </div>

                  <div className="uniNumInput">
                    <label className="col-md-6">統一編號：</label>
                    <div className="col-md-6">
                      <input type="text" placeholder="統一編號" className="form-control mobile_input"/>
                    </div>
                  </div>

                  <div className="citySelect">
                    <label className="col-md-6" htmlFor="city">所在縣市：</label>
                    <div className="col-md-6">
                      <select onChange={this.handleCityOptions} className="form-control" id="citySelect">
                        <option>-</option>
                        {this.renderCities()}
                      </select>
                    </div>


                  </div>
                  {this.displayDistricts()}
                  <div className="addressInput">
                    <label className="col-md-6">地址：</label>
                    <div className="col-md-12">
                      <input type="text" placeholder="地址" className="form-control address_input"/>
                    </div>
                  </div>

                  <div className="contactInput">
                    <label className="col-md-6">聯絡人姓名：</label>
                    <div className="col-md-6">
                      <input type="text" placeholder="聯絡人姓名" className="form-control contact_input"/>
                    </div>
                  </div>

                  <div className="phoneInput">
                    <label className="col-md-6">電話（市話）：</label>
                    <div className="col-md-6">
                      <input type="text" placeholder="市話號碼" className="form-control phone_input"/>
                    </div>
                  </div>

                  <div className="mobileInput">
                    <label className="col-md-6">電話（行動）：</label>
                    <div className="col-md-6">
                      <input type="text" placeholder="行動電話號碼" className="form-control mobile_input"/>
                    </div>
                  </div>

                  {this.displayAddressInput()}

                </div>


                <div className="">
                </div>
                <div className="">
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


    )
  }
});
