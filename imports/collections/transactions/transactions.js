import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection("transactions");
export const TransactionsSummary = new Mongo.Collection("transactionsSummary");
