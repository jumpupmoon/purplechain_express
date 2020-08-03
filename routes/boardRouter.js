
const express = require('express');
const boardRoutes = express.Router();
const router = express.Router();
const mongoose = require('mongoose');

// 몽고 연결
mongoose.connect('mongodb://localhost/purple-chain', err => {
    if(err) console.error('mongodb connection error', err);
    else console.log('db connected');
});


// Require Business model in our routes module
let Board = require('../model/board');

// Defined store route
boardRoutes.route('/add').post(function (req, res) {
  let board = new Board(req.body);
  console.log(req.body);
  board.save()
    .then(board => {
      res.status(200).json({'board': 'board in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
boardRoutes.route('/read').get(function (req, res) {
    // let sort = {board : -1};
    Board.find(function(err, board){
    if(err){
      console.log(err);
    }
    else {
        console.log(board);
      res.json(board);
    }
    
  }
//   .sort(sort)
  );
});


boardRoutes.route('/limit').get(function (req, res) {
    Board.find().limit(5).sort({date : -1 })
    .then(function(board){
      res.json(board);
    }, function(error) {
      console.log('error msg : ' + error);
    }
  )
});



// Defined edit route
boardRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  console.log(req.params)
  Board.findById(id, function (err, board){
      res.json(board);
  });
});

//  Defined update route
boardRoutes.route('/update/:id').post(function (req, res) {
    Board.findById(req.params.id, function(err, board) {
    if (!board)
      res.status(404).send("data is not found");
    else {
        board.wrtier = req.body.writer;
        board.title = req.body.title;
        board.content = req.body.content;

        board.save().then(board => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      })
      console.log(req.body.writer);
    }
  });
});

// Defined delete | remove | destroy route
boardRoutes.route('/delete/:id').delete(function (req, res) {
    Board.findByIdAndRemove({_id: req.params.id}, function(err, board){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = boardRoutes;