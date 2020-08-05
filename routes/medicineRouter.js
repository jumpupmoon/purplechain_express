const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
//openAPI 폴더에 정의된 함수들 가져오기
const MdcinPrductListInfoService = require("./openAPI/getMdcinPrductList");
const MdcinPrductPrmisnInfo = require("./openAPI/getMdcinPrductItem");
//가져온 정보를 담기 위한 모델 가져오기
const Medicine = require("../model/medicine");

app.use(express.json()); //bodyparser 사용 설정


//검색어에 해당되는 의약품 목록 조회
router.get("/getNames", (req, res) => {
    /* 	request으로부터 넘겨받은 searchText를 가지고 검색하여 의약품 이름 목록 제공 */
  
  
    let searchText;
    if (req.query.searchText) searchText = req.query.searchText;
   

    MdcinPrductListInfoService.getMdcinPrductList(searchText).then(function (medicineNames) {
        res.send(medicineNames);
    })    
  });

  //검색어에 해당되는 의약제품 상세정보 검색
router.get("/medicineInfo", (req, res) => {
  // 품목, 저장방법, 성상등의 품목정보 등의 허가받은 의약제품정보를 상세정보로 제공
    let searchText;
    if (req.query.searchText) searchText = req.query.searchText;

    MdcinPrductPrmisnInfo.getMdcinPrductItem(searchText).then(function (product) {
      medicine = new Medicine({
        seq: product.seq,
        name: product.name,
        chart: product.chart,
        storage_method: product.storage_method,
        EE_DOC: product.EE_DOC,
        UD_DOC: product.UD_DOC,
      });
      medicine.save((err) => {
        if (err) console.log(err);
        res.json(medicine);
      });
    });
});

  

module.exports = router;