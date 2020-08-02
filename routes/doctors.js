const app = require("express").Router();
const Doctor = require("../model/doctor");
const mongoose = require("mongoose");

// 몽고 연결
mongoose.connect(
  "mongodb://purpleadmin:purple@localhost:30000/purple-chain",
  (err) => {
    if (err) console.error("mongodb connection error", err);
    else console.log("db connected");
  }
);

// 모든 의사 데이터 조회
app.get("/", function (req, res) {
  res.set({ "access-control-allow-origin": "*" }); //api 서버랑 다를때 해결
  Doctor.find(function (err, doctors) {
    if (err) return res.status(500).send({ error: "의사 없음" });
    res.json(doctors);
  });
});

// 의사 데이터 생성
app.post("/", function (req, res) {
  res.set({ "access-control-allow-origin": "*" }); //api 서버랑 다를때 해결
  var doctor = new Doctor();
  doctor.h_id = req.body.h_id;
  doctor.name = req.body.name;
  doctor.password = req.body.password;
  doctor.license = req.body.license;
  doctor.major = req.body.major;

  doctor.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: "생성 실패" });
      return;
    }

    res.json({ result: "생성 성공" });
  });
});

module.exports = app;
