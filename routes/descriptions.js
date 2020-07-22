const app = require("express").Router();
const Description = require("../models/description");

// _id 값으로 처방전 조회
app.get("/:description_id", function (req, res) {
  Description.findOne({ _id: req.params.description_id }, function (err, book) {
    if (err) return res.status(500).json({ error: err });
    if (!book) return res.status(404).json({ error: "처방전이 없습니다." });
    res.json(book);
  });
});

module.exports = app;
