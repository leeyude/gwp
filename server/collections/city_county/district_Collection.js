import { Mongo } from 'meteor/mongo';


export const Districts = new Mongo.Collection("districts");
export const Cities = new Mongo.Collection("cities");

if(Cities.find().count()===0){
  var cities = [
    "	臺北市	",
    "	新北市	",
    "	宜蘭縣	",
    "	新竹市	",
    "	新竹縣	",
    "	桃園市	",
    "	苗栗縣	",
    "	臺中市	",
    "	彰化縣	",
    "	南投縣	",
    "	嘉義市	",
    "	嘉義縣	",
    "	雲林縣	",
    "	臺南市	",
    "	高雄市	",
    "	基隆市	",
    "	金門縣	",
    "	屏東縣	",
    "	臺東縣	",
    "	花蓮縣	",
    "	連江縣	",
    "	澎湖縣	",
  ];

  Cities.insert({
    name: cities[0],
    isServing: true,
  });

  Cities.insert({
    name: cities[1],
    isServing: true,
  });


  for (var i=2; i< 22; i++) {
    Cities.insert({
      name: cities[i],
      isServing: false,
    });
  };

};

Meteor.methods({
  parseUpload:function(data){
    console.log("got called");

    for(i=0; i< data.length; i++){
      var combination = data[i];
      var exists = Districts.find({City_County: combination.City_County, District_Village: combination.District_Village});

      if(exists){
        Districts.insert( combination);
      }else {
        console.warn('Rejected. Already Exists.');
      }
    }
  },
});

Meteor.publish("cities", function(){
  return Cities.find();
});

Meteor.publish("districts", function(citySelected){
  return Districts.find({City_County:citySelected});
});
