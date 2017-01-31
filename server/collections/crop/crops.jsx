import { Mongo } from 'meteor/mongo';


export const CropTypes = new Mongo.Collection("cropTypes");

Meteor.methods({
  parseUpload_crops:function(data){
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
});
