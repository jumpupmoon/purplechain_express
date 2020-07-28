const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Description = require("../model/description");
const DiseaseInfo = require("./openAPI/getDissNameCodeList");
const MdcinPrductPrmisnInfo = require("./openAPI/getMdcinPrductItem");
const Disease = require("../model/disease");
const Medicine = require("../model/medicine");
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
  /* 	질병 명칭/코드 정보 제공 (저작권에 위배되지 않는 정보) */

  var searchText = "병적 골절을";
  DiseaseInfo.getDissNameCodeList(searchText).then(function (disease_info) {
    disease = new Disease({
      sickCd: disease_info.sickCd,
      sickNm: disease_info.sickNm,
    })
    disease.save((err) => {
      if (err) console.log(err);
      res.json({ message: "insert" });
    });
  })


});
//의약제품 정보 검색
router.get("/medicineInfo", (req, res) => {
  // 품목, 저장방법, 성상등의 품목정보 등의 허가받은 의약제품정보를 상세정보로 제공
  var searchText2 = "마데카솔연고";

  MdcinPrductPrmisnInfo.getMdcinPrductItem(searchText2).then(function (product) {
    medicine = new Medicine({
      seq: product.seq,
      name: product.name,
      chart: product.chart,
      storage_method: product.storage_method,
      EE_DOC: product.EE_DOC,
      UD_DOC: product.UD_DOC,
    })
    medicine.save((err) => {
      if (err) console.log(err);
      res.json({ message: "insert", medicine });
    });
  })

})
module.exports = router;
