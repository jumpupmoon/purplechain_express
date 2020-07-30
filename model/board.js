// borad.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Board
let Board = new Schema({

  writer: {
    type: String
  },
  title: {
    type: String
  },
  date: {
    type: String
  },
  content: {
    type: String
  }
},{
    collection: 'board'
});

module.exports = mongoose.model('Board', Board);