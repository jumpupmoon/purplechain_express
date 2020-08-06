//var request = require("request");
//var cheerio = require("cheerio");
const request = require('request-promise-native');
var util = require('util');

var diseaseInfoService = {};

//   공공데이터포털에서 받은 인증키
var ServiceKey =
  // "cqTrZ3WXm55EZ%2BHWwlUXgx4OTa%2BcYoCrfkZRbkvxwRKlhiHePr%2Fy3BiLg8auB6Aityx0i%2B1Q5FI3txbJjl8Jcg%3D%3D";
  "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

diseaseInfoService.getDissNameCodeList = async function (searchText) {
  var Diseases = [];

  var url =
    "http://apis.data.go.kr/B551182/diseaseInfoService/getDissNameCodeList";
  //   페이지 번호
  var pageNo = 1;
  //  한 페이지 결과 수
  var numOfRows = 10;
  //  상병구분	1:3단상병, 2:4단상병
  var sickType = 1;
  //  양방,한방 구분값	1:한방, 2:의과(양방)
  var medTp = 2;
  // 질병검색타입 SICK_NM	SICK_CD:상병코드, SICK_NM:상병명
  var diseaseType = "SICK_NM";
  // xml --> json으로 변환
  var _type = "json";

  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + ServiceKey; /* Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent(numOfRows); /* */
  queryParams +=
    "&" +
    encodeURIComponent("sickType") +
    "=" +
    encodeURIComponent(sickType); /* */
  queryParams +=
    "&" + encodeURIComponent("medTp") + "=" + encodeURIComponent(medTp); /* */
  queryParams +=
    "&" +
    encodeURIComponent("diseaseType") +
    "=" +
    encodeURIComponent(diseaseType); /* */
  queryParams +=
    "&" +
    encodeURIComponent("searchText") +
    "=" +
    encodeURIComponent(searchText); /* */
  queryParams +=
    "&" + encodeURIComponent("_type") + "=" + encodeURIComponent(_type); /* */
  var test;
  var sickCd;
  var sickNm;
  //위의 url을 통해 json 객체 받기
  await request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, jsonObject) {

      var obj = JSON.parse(jsonObject);
      console.log(jsonObject);
      var sickCdInfoList = obj.response.body.items.item;
      console.log("sickCdList123456",sickCdInfoList);
      if(sickCdInfoList instanceof Array){

        sickCdInfoList.forEach(sickCdInfo => {
          let diseaseInfo = {};
          diseaseInfo.sickCd = sickCdInfo.sickCd;
          diseaseInfo.sickNm = sickCdInfo.sickNm;
          Diseases.push(diseaseInfo);
        })
        console.log("배열일경우",Diseases);
      }else{
        let diseaseInfo = {};
        diseaseInfo.sickCd = sickCdInfoList.sickCd;
        diseaseInfo.sickNm = sickCdInfoList.sickNm;
        Diseases.push(diseaseInfo);
        console.log("배열이 아닐 경우",Diseases);
      } 
  
   }
  )
  return Diseases;
};
module.exports = diseaseInfoService;
