const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();

const DiseaseInfo = require("./openAPI/getDissNameCodeList");
const Disease = require("../model/disease");

app.use(express.json()); //bodyparser 사용 설정

// 몽고 연결
mongoose.connect('mongodb://localhost/purple-chain', err => {
    if(err) console.error('mongodb connection error', err);
    else console.log('db connected');
});

//질병 검색
router.get("/search", (req, res) => {
    /* 	request으로부터 넘겨받은 searchText를 가지고 검색하여 질병 명칭/코드 정보 제공 */
  
    // var searchText = "병적 골절을";

    let searchText;
    if (req.query.searchText) searchText = req.query.searchText;
    console.log(searchText);
    
    DiseaseInfo.getDissNameCodeList(searchText).then(function (disease_info) {
      disease = new Disease({
        sickCd: disease_info.sickCd,
        sickNm: disease_info.sickNm,
      });
      console.log(disease)
      res.json(disease);
    });
  });

  

module.exports = router;