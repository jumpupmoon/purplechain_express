const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();

const MdcinPrductListInfoService = require("./openAPI/getMdcinPrductList");


app.use(express.json()); //bodyparser 사용 설정


//검색어에 해당되는 의약품 목록 조회
router.get("/getNames", (req, res) => {
    /* 	request으로부터 넘겨받은 searchText를 가지고 검색하여 의약품 이름 목록 제공 */
  
    // var searchText = "병적 골절을";

    let searchText;
    if (req.query.searchText) searchText = req.query.searchText;
   

    MdcinPrductListInfoService.getMdcinPrductList(searchText).then(function (medicineNames) {
        res.send(medicineNames);
    })    
  });

  

module.exports = router;