import { Mongo } from 'meteor/mongo';


export const Transactions = new Mongo.Collection("transactions");

Meteor.methods({
  insertTransactions:function(){
    var daysInMonths = [
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31],

    ];

    var dataCount = 0;

    for (i=0; i<6; i++){
      for (j=1; j<13; j++){
        for (k=1; k<daysInMonths[i][j-1]+1; k++){

          if(j<10){
            var month = '0'+j;
          }else{
            var month = j;
          }

          var year =i+101;
          if(k<10){
            var string = year+'.'+month+'.0'+k;
          }else{
            var string = year+'.'+month+'.'+k;
          }

          var response = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?StartDate='+string+'&EndDate='+string, {
              headers: {
                'Content-Type' : 'text/html; charset=UTF-8'
              }
          });

          var data = JSON.parse(response.content);

          for (a=0; a<data.length; a++){
            Transactions.insert( data[a]);
          };

          console.log(string+': there are '+data.length+' lines of data.')

          dataCount = dataCount+data.length;

          if(data.length<3001){
          }else{
            var responseMore = HTTP.call('GET', 'http://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$skip=3001&StartDate='+string+'&EndDate='+string, {
                headers: {
                  'Content-Type' : 'text/html; charset=UTF-8'
                }
            });

            var dataMore = JSON.parse(responseMore.content);

            for (a=0; a<dataMore.length; a++){
              Transactions.insert( dataMore[a]);
            };

            var dataTotal = dataMore.length+data.length;

            console.log(string+': there are additional '+dataMore.length+' lines of data.'+' Total '+dataTotal+' combined.')

            dataCount = dataCount+dataMore.length;
          };
        }
      }

      console.log('Accumulation: '+dataCount+' lines of records in this year.');

    };
  },
});

function distinct(collection, field) {
  return _.uniq(collection.find({}, {
    sort: {[field]: 1}, fields: {[field]: 1}
  }).map(x => x[field]), true);
};
