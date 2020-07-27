const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Description = require("../model/description");
const DiseaseInfo = require("./openAPI/getDissNameCodeList");
const MdcinPrductPrmisnInfo = require("./openAPI/getMdcinPrductItem");

const app = express();
app.use(express.json()); //bodyparser 사용 설정

// 몽고 연결
mongoose.connect(
  "mongodb://purpleadmin:purple@localhost:27017/purple-chain",
  (err) => {
    if (err) console.error("mongodb connection error", err);
    else console.log("db connected");
  }
);

// 처방전 검색
router.get("/search", (req, res) => {
  let search = [];
  let sort = { createDate: -1 };
  if (req.query.patient) search.patient = req.query.patient;
  if (req.query.date) search.createDate = req.query.date;
  if (req.query.doctor) search.doctor = req.query.doctor;
  if (req.query.sort == "patient") sort = { patient: 1 };

  Description.find(
    { ...search },
    { patient: 1, createDate: 1, doctor: 1, disease: 1 }
  )
    .sort(sort)
    .then((docs) => {
      if (!docs) console.log("error ->", err);
      console.log(docs);
      res.json(docs);
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
  /* 	오퍼레이션 설명	질병 명칭/코드 정보 제공 (저작권에 위배되지 않는 정보) */

  var searchText = "병적 골절을";
  var sickCd = DiseaseInfo.getDissNameCodeList(searchText);
  console.log(DiseaseInfo.getDissNameCodeList);
  setTimeout(() => {

    console.log("sickCD-->", sickCd);

  }, 1000);



});

router.get("/MdcinPrductInfo", (req, res) => {

  var searchText2 = "유시락스시럽";
  MdcinPrductPrmisnInfo.getMdcinPrductItem(searchText2);
})

module.exports = router;
