var request = require("request");
const convert = require("xml-js");
var util = require('util');

var MdcinPrductPrmisnInfoService = {};

//   공공데이터포털에서 받은 인증키
var ServiceKey =
  // "cqTrZ3WXm55EZ%2BHWwlUXgx4OTa%2BcYoCrfkZRbkvxwRKlhiHePr%2Fy3BiLg8auB6Aityx0i%2B1Q5FI3txbJjl8Jcg%3D%3D";
  "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

MdcinPrductPrmisnInfoService.getMdcinPrductItem = function (searchText) {
  //약 정보를 담는 객체 생성
  var Medicine = {};

  var url =
    "http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem";
  var item_name = searchText;
  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + ServiceKey; /* Service Key*/
  var _type = "json";

  queryParams +=
    "&" +
    encodeURIComponent("item_name") +
    "=" +
    encodeURIComponent(searchText); /* */
  var item_name;
  var chart;
  var EE_DOC_DATA;
  var UD_DOC_DATA;

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, xmlObject) {
      var jsonObject = convert.xml2json(xmlObject, {
        compact: true,
        spaces: 4,
      });

      var obj = JSON.parse(jsonObject);
      var MdcinPrduct = obj.response.body.items.item;
      item_name = MdcinPrduct.ITEM_NAME._text;
      console.log("MdcinPrduct.ITEM_SQP", MdcinPrduct.ITEM_SEQ._text)
      item_seq = MdcinPrduct.ITEM_SEQ._text;
      chart = MdcinPrduct.CHART._text;
      EE_DOC_DATA = MdcinPrduct.EE_DOC_DATA.DOC;
      UD_DOC_DATA = MdcinPrduct.UD_DOC_DATA.DOC.SECTION;

      // console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received-222", MdcinPrduct);
      // console.log("EE_DOC_DATA", EE_DOC_DATA._attributes);
      // console.log("EE_DOC_DATA", EE_DOC_DATA.SECTION);
      Medicine.seq = item_seq;
      console.log("item_name", item_name);
      Medicine.name = item_name;
      console.log("chart", chart);
      Medicine.chart = chart;

      //효능 효과
      console.log("eedoc", EE_DOC_DATA._attributes.title)
      var EE_DOC = [];

      EE_DOC_DATA.SECTION.ARTICLE.forEach(element => {
        //console.log("element1", element._attributes);
        console.log("element2", element._attributes.title);
        EE_DOC.push(element._attributes.title);
      });
      Medicine.EE_DOC = EE_DOC;
      //용법 용량
      console.log("uddoc", MdcinPrduct.UD_DOC_DATA.DOC._attributes.title, "\n")
      var UD_DOC = [];
      UD_DOC_DATA.ARTICLE.forEach(element => {
        console.log("title1", element._attributes.title);
        var UD = {};

        //console.log("title2", element.PARAGRAPH);
        //console.log("title3", element)
        UD.title = element._attributes.title;
        var contexts = [];
        if (element.PARAGRAPH instanceof Array) {
          element.PARAGRAPH.forEach(context => {
            //console.log("_attributes", context._attributes);
            console.log("\t_cdata", context._cdata, "\n");
            contexts.push(context._cdata);
          })
        }
        else {
          console.log("\t_cdata", element.PARAGRAPH._cdata, "\n");
          contexts.push(element.PARAGRAPH._cdata);
        }
        UD.contexts = contexts;
        UD_DOC.push(UD);
      });
      Medicine.UD_DOC = UD_DOC;
      // console.log("UD_DOC_DATA.ARTICLE", UD_DOC_DATA.ARTICLE);
      console.log("객체확인!!!!!!!!!!!!!!!!!!!!\n", util.inspect(Medicine, true, null));
    }
  );



};

module.exports = MdcinPrductPrmisnInfoService;
