const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Description = require("../model/description");
const DiseaseInfo = require("./openAPI/getDissNameCodeList");

const Disease = require("../model/disease");

const app = express();
app.use(express.json()); //bodyparser 사용 설정

// 몽고 연결
mongoose.connect('mongodb://localhost/purple-chain', err => {
    if(err) console.error('mongodb connection error', err);
    else console.log('db connected');
});


// 처방전 검색
router.get("/search", (req, res) => {
  let search = [];
  let sort = { createDate: -1 };
  if (req.query.patient) search.patient = req.query.patient;
  if (req.query.date) search.createDate = req.query.date;
  if (req.query.doctor) search.doctor = req.query.doctor;
  if (req.query.sort == "patient") sort = { patient: 1 };

  const page = req.query.page;
  const limit = 3;
  const startIndex = (page - 1) * limit;
  let endPage;
  Description.countDocuments("_id", (err, count) => {
    endPage = Math.ceil(count / limit);
  });

  Description.find(
    { ...search },
    { patient: 1, createDate: 1, doctor: 1, disease: 1 }
  )
    .sort(sort)
    .limit(limit)
    .skip(startIndex)
    .then((docs) => {
      if (!docs) console.log("error ->", err);
      res.json([docs, endPage]);
    });
});

// 테스트
router.get("/test", (req, res) => {
  description = new Description({
    patient: "환자",
    doctor: "의사",
    disease: "병",
    createDate: "2020-07-16",
  });
  description.save((err) => {
    if (err) console.log(err);
    res.json({ message: "insert" });
  });
});

//질병 검색
router.get("/diseaseInfo", (req, res) => {
  /* 	질병 명칭/코드 정보 제공 (저작권에 위배되지 않는 정보) */

  var searchText = "병적 골절을";
  DiseaseInfo.getDissNameCodeList(searchText).then(function (disease_info) {
    disease = new Disease({
      sickCd: disease_info.sickCd,
      sickNm: disease_info.sickNm,
    });
    disease.save((err) => {
      if (err) console.log(err);
      res.json({ message: "insert" });
    });
  });
});

module.exports = router;
