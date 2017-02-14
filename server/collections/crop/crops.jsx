import { Mongo } from 'meteor/mongo';

export const CropTypes = new Mongo.Collection("cropTypes");
export const CropItems = new Mongo.Collection("cropItems");


Meteor.methods({
  parseUpload_cropDetails:function(data){
    console.log("crop type uploads got called");

    for(i=0; i< data.length; i++){
      var combination = data[i];
      var exists = CropTypes.find({
        category: combination.category,
        name_crop: combination.name_crop,
        name_variety: combination.name_variety,
        item_code: combination.item_code,
        query: combination.query
      });

      if(exists){
        CropTypes.insert( combination);
      }else {
        console.warn('Rejected. Already Exists.');
      }
    }
  },

  parseUpload_cropItems:function(data){
    console.log("crop Items uploads got called");

    for(i=0; i< data.length; i++){
      var combination = data[i];
      var exists = CropItems.find({
        category: combination.category,
        name_crop: combination.name_crop,

      });

      if(exists){
        CropItems.insert( combination);
      }else {
        console.warn('Rejected. Already Exists.');
      }
    }
  },

  editCropContent: function(cropObject){
    CropTypes.update(cropObject._id, {
      $set: {
        isServing: cropObject.isServing,
        isImported: cropObject.isImported
       },
    });

  },
});

Meteor.publish("cropTypes", function(){
  return CropTypes.find()
});

Meteor.publish("availableItems", function(){
  return CropItems.find({'isServing': 'true'})
});

Meteor.publish("availableVarieties", function(){
  return CropTypes.find({'isImported': 'false'});
});
