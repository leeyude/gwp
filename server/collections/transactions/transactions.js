import { Mongo } from 'meteor/mongo';
import { getDatesArray, convertADtoTWCalYear, convertToAD } from "../../functions/globalFunctions";

export const Transactions = new Mongo.Collection("transactions");
export const TransactionsSummary = new Mongo.Collection("transactionsSummary");

Meteor.methods({
  createTransactions:function(){
    var startDate = '101.01.01';
    var today = new Date();
    var yesterday = moment(today).subtract(1, 'days');
    var yesterdayInput = convertADtoTWCalYear(yesterdayInput);

    var dateArray = getDatesArray(startDate, yesterdayInput);

    var numAccumulated = 0;

    for(i=0; i<dateArray.length; i++){
      if(TransactionsSummary.findOne({queryDate: dateArray[i]})){

      }else{
        var response = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?StartDate='+dateArray[i]+'&EndDate='+dateArray[i], {
            headers: {
              'Content-Type' : 'text/html; charset=UTF-8'
            }
        });

        var data = JSON.parse(response.content);

        for (j=0; j<data.length; j++){
          Transactions.insert( data[j]);
        };

        var numRecords = data.length;

        if(data.length<3001){
        }else{
          var responseMore = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$skip=3001&StartDate='+dateArray[i]+'&EndDate='+dateArray[i], {
              headers: {
                'Content-Type' : 'text/html; charset=UTF-8'
              }
          });

          var dataMore = JSON.parse(responseMore.content);

          for (j=0; j<dataMore.length; j++){
            Transactions.insert( dataMore[j]);
          };

          numRecords = numRecords +dataMore.length;
        };


        numAccumulated = numAccumulated + numRecords;

        var oneSummaryItem = {
          createAt: new Date(),
          queryDate: dateArray[i],
          year: moment(convertToAD(dateArray[i])).year(),
          month: moment(convertToAD(dateArray[i])).month(),
          day: moment(convertToAD(dateArray[i])).date(),
          numRecordsOfTheDay: numRecords,
          numAccumulated: numAccumulated,
        };
        TransactionsSummary.insert(oneSummaryItem);
        console.log(dateArray[i], ": number of records is "+numRecords+"."+" Accumulated number is "+numAccumulated+".");
      };
    };

  },

  updateTransactions: function(startDate){
    var today = new Date();
    var yesterday = moment(today).subtract(1, 'days');

    var startDateToAd = convertToAD(startDate);

    if(moment(startDateToAd).isBefore(yesterday)){
      var yesterdayInput = convertADtoTWCalYear(yesterdayInput);
      var startDateInput = convertADtoTWCalYear(moment(convertToAD(startDate)).add(1, 'days'));

      var dateArray = getDatesArray(startDateInput, yesterdayInput);
      var numAccumulated = TransactionsSummary.findOne({ queryDate: startDate}).numAccumulated;

      for(i=0; i<dateArray.length; i++){

        var response = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?StartDate='+dateArray[i]+'&EndDate='+dateArray[i], {
            headers: {
              'Content-Type' : 'text/html; charset=UTF-8'
            }
        });

        var data = JSON.parse(response.content);

        for (j=0; j<data.length; j++){
          Transactions.insert( data[j]);
        };

        var numRecords = data.length;

        if(data.length<3001){
        }else{
          var responseMore = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$skip=3001&StartDate='+dateArray[i]+'&EndDate='+dateArray[i], {
              headers: {
                'Content-Type' : 'text/html; charset=UTF-8'
              }
          });

          var dataMore = JSON.parse(responseMore.content);

          for (j=0; j<dataMore.length; j++){
            Transactions.insert( dataMore[j]);
          };

          numRecords = numRecords +dataMore.length;
        };
        numAccumulated = numAccumulated + numRecords;

        var oneSummaryItem = {
          createAt: new Date(),
          queryDate: dateArray[i],
          year: moment(convertToAD(dateArray[i])).year(),
          month: moment(convertToAD(dateArray[i])).month(),
          day: moment(convertToAD(dateArray[i])).date(),
          numRecordsOfTheDay: numRecords,
          numAccumulated: numAccumulated,
        };
        TransactionsSummary.insert(oneSummaryItem);
      };
      return 'updated';
    }else{
      return false;

    };
  },

  countSourceRecords: function(queryDate){
    var response = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?StartDate='+queryDate+'&EndDate='+queryDate, {
        headers: {
          'Content-Type' : 'text/html; charset=UTF-8'
        }
    });

    var data = JSON.parse(response.content);
    var numRecords = data.length;

    if(data.length<3001){
    }else{
      var responseMore = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$skip=3001&StartDate='+queryDate+'&EndDate='+queryDate, {
          headers: {
            'Content-Type' : 'text/html; charset=UTF-8'
          }
      });

      var dataMore = JSON.parse(responseMore.content);
      numRecords = numRecords +dataMore.length;

    };
    console.log(queryDate, numRecords);

    return numRecords;
  },

  countRecords: function(){
    return TransactionsSummary.findOne({}, {
      sort: { numAccumulated: -1},
      limit: 1
    }).numAccumulated;
  },

  earliestDate: function(){
    return TransactionsSummary.findOne({}, {
      fields: {
        queryDate: 1
      },
      sort: {
        queryDate: 1
      },
      limit: 1
    }).queryDate;
  },

  mostCurrentDate: function(){
    return TransactionsSummary.findOne({}, {
      fields: {
        queryDate: 1
      },
      sort: {
        queryDate: -1
      },
      limit: 1
    }).queryDate;
  },

  countRecordsLatestDate: function(){
     var sevenRecords = TransactionsSummary.find({}, {
      sort: {
        queryDate: -1
      },
      limit: 7 // to show 7 days of data
    }).fetch();

    return sevenRecords.map(function(record){
      var queryDate = record.queryDate;
      var numRecordsOfTheDay = record.numRecordsOfTheDay;

      var response = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?StartDate='+queryDate+'&EndDate='+queryDate, {
          headers: {
            'Content-Type' : 'text/html; charset=UTF-8'
          }
      });

      var data = JSON.parse(response.content);
      var numRecords = data.length;

      if(data.length<3001){
      }else{
        var responseMore = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$skip=3001&StartDate='+queryDate+'&EndDate='+queryDate, {
            headers: {
              'Content-Type' : 'text/html; charset=UTF-8'
            }
        });

        var dataMore = JSON.parse(responseMore.content);
        numRecords = numRecords +dataMore.length;
      };

      var numRecordsSource = numRecords;

      return {
        queryDate: queryDate,
        numRecordsOfTheDay: numRecordsOfTheDay,
        numRecordsSource: numRecordsSource
      };
    });
  },
});
