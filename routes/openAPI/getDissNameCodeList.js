//var request = require("request");
//var cheerio = require("cheerio");
const request = require('request-promise-native');
var util = require('util');

var diseaseInfoService = {};

//   공공데이터포털에서 받은 인증키
var ServiceKey =
  // "cqTrZ3WXm55EZ%2BHWwlUXgx4OTa%2BcYoCrfkZRbkvxwRKlhiHePr%2Fy3BiLg8auB6Aityx0i%2B1Q5FI3txbJjl8Jcg%3D%3D";
  "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

diseaseInfoService.getDissNameCodeList = function (searchText) {
  var Disease = {};

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
  // 검색어
  //var searchText = "가진통";
  var _type = "json";

  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + ServiceKey; /* Service Key*/
  //   queryParams +=
  //     "&" +
  //     encodeURIComponent("ServiceKey") +
  //     "=" +
  //     encodeURIComponent("-"); /* */
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
  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, jsonObject) {
      // var $ = cheerio.load(body);
      // resolve($("sickCd").text());
      var obj = JSON.parse(jsonObject);
      sickCd = obj.response.body.items.item.sickCd;
      sickNm = obj.response.body.items.item.sickNm;
      Disease.sickCd = sickCd;
      Disease.sickNm = sickNm;
      console.log("obj", obj);
      console.log("sickCd", sickCd);
      console.log("sickNm", sickNm);
      // console.log("Status", response.statusCode);
      // console.log("Headers", JSON.stringify(response.headers));
      // console.log("Reponse received", jsonObject);
      // console.log("items", $("items").text());
      // console.log("sickCd", $("sickCd").text());

      // console.log("items2", body.body);

      console.log("객체확인!!!!!!!!!!!!!!!!!!!!\n", util.inspect(Disease, true, null));
    }
  ).then().catch(err => callback(err));

  return sickCd;



};
module.exports = diseaseInfoService;
