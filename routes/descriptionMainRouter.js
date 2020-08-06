const express = require("express");
const descriptionMainRouter = express.Router();
let Description = require("../model/description");
const router = express.Router();

descriptionMainRouter.get("/read5", function (req, res) {
  //console.log("shit")
  // let sort = {board : -1};
  Description.find()
    .limit(5)
    .sort({ date: -1 })
    .then(function (description, err) {
      //console.log("ttttt")
      if (err) {
        //console.log('@@@@@@@@@',err);
      } else {
        res.json(description);
      }
    });
});

module.exports = descriptionMainRouter;
