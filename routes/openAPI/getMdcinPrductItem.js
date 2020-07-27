var request = require("request");
const convert = require("xml-js");

var MdcinPrductPrmisnInfoService = {};

//   공공데이터포털에서 받은 인증키
var ServiceKey =
  // "cqTrZ3WXm55EZ%2BHWwlUXgx4OTa%2BcYoCrfkZRbkvxwRKlhiHePr%2Fy3BiLg8auB6Aityx0i%2B1Q5FI3txbJjl8Jcg%3D%3D";
  "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

MdcinPrductPrmisnInfoService.getMdcinPrductItem = function (searchText) {
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
      chart = MdcinPrduct.CHART._text;
      EE_DOC_DATA = MdcinPrduct.EE_DOC_DATA.DOC;
      UD_DOC_DATA = MdcinPrduct.UD_DOC_DATA.DOC.SECTION;
      // console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received-222", MdcinPrduct);
      console.log("item_name", item_name);
      console.log("chart", chart);
      // console.log("EE_DOC_DATA", EE_DOC_DATA._attributes);
      // console.log("EE_DOC_DATA", EE_DOC_DATA.SECTION);
      EE_DOC_DATA.SECTION.ARTICLE.forEach(element => {
        console.log("element", element._attributes.title);
      });
      UD_DOC_DATA.ARTICLE.forEach(element => {
        console.log("title", element._attributes._title);
        element.PARAGRAPH.forEach(context => {
          console.log("_attributes", _attributes);
          console.log("_cdata", _cdata);
        })
      });
      console.log("UD_DOC_DATA.ARTICLE", UD_DOC_DATA.ARTICLE);

    }
  );
};

module.exports = MdcinPrductPrmisnInfoService;
