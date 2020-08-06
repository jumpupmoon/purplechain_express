const express = require("express");
const router = express.Router();
const app = express();

const DiseaseInfo = require("./openAPI/getDissNameCodeList");
const Disease = require("../model/disease");

app.use(express.json()); //bodyparser 사용 설정

//질병 검색
router.get("/search", (req, res) => {
  /* 	request으로부터 넘겨받은 searchText를 가지고 검색하여 질병 명칭/코드 정보 제공 */

  // var searchText = "병적 골절을";

  let searchText;
  if (req.query.searchText) searchText = req.query.searchText;
  console.log(searchText);

  DiseaseInfo.getDissNameCodeList(searchText).then(function (diseaseInfoList) {
    
    console.log("chuuu",diseaseInfoList);
    res.send(diseaseInfoList);
  });
});

module.exports = router;
