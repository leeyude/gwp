import { Mongo } from 'meteor/mongo';

export const Markets = new Mongo.Collection("markets");

if(Markets.find().count()===0){
  var markets = [
    "台北一",
    "台北二",
    "三重市",
    "宜蘭市",
    "桃園縣",
    "台中市",
    "永靖鄉",
    "溪湖鎮",
    "南投市",
    "西螺鎮",
    "高雄市",
    "鳳山市",
    "屏東市",
    "台東市",
    "花蓮市",
    "東勢區",
    "嘉義市"
  ];

  for (var i=0; i< markets.length; i++) {
    Markets.insert({
      name: markets[i],
      servingVeggie: "Yes",
      servingFruit: "No",
      coverage: []
    });
  };
};

Meteor.publish("marketQuery", function(){
  return Markets.find();
});

Meteor.methods({
  updateMarket:function(marketId, servingVeggie, servingFruit, coverage){
    Markets.update(marketId, {
      $set: {
        servingVeggie: servingVeggie,
        servingFruit: servingFruit,
        coverage: coverage
       },
    });
  },
});
