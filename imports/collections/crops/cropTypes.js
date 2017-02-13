import { Mongo } from 'meteor/mongo';

export const CropTypes = new Mongo.Collection("cropTypes");
export const CropItems = new Mongo.Collection("cropItems");
