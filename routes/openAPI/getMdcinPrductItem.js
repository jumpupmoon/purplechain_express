//var request = require("request");
const request = require('request-promise-native');
const convert = require("xml-js");
var util = require('util');

var MdcinPrductPrmisnInfoService = {};

//   공공데이터포털에서 받은 인증키
var ServiceKey =
    "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

MdcinPrductPrmisnInfoService.getMdcinPrductItem = async function (searchText) {
    //약 정보를 담는 객체 생성
    var Medicine = {};

    var url =
        "http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem";
    var item_name = searchText;
    var queryParams =
        "?" + encodeURIComponent("ServiceKey") + "=" + ServiceKey; /* Service Key*/

    queryParams +=
        "&" +
        encodeURIComponent("item_name") +
        "=" +
        encodeURIComponent(searchText); /* */
    var item_name;
    var chart;
    var EE_DOC_DATA;
    var UD_DOC_DATA;

    await request(
        {
            url: url + queryParams,
            method: "GET",
        },
        function (error, response, xmlObject) {
            //xml2json모듈을 통해 xml에서 json으로 변환
            var jsonObject = convert.xml2json(xmlObject, {
                compact: true,
                spaces: 4,
            });

            var obj = JSON.parse(jsonObject);
            var MdcinPrduct = obj.response.body.items.item;
            //json 파일에서 원하는 정보 뽑아오기
            item_name = MdcinPrduct.ITEM_NAME._text;
            item_seq = MdcinPrduct.ITEM_SEQ._text;
            chart = MdcinPrduct.CHART._text;
            storage_method = MdcinPrduct.STORAGE_METHOD._text;
            EE_DOC_DATA = MdcinPrduct.EE_DOC_DATA.DOC;
            UD_DOC_DATA = MdcinPrduct.UD_DOC_DATA.DOC.SECTION;
            //만들어둔 빈 객체에 일련번호, 이름, 약 외형, 보관방법 정보 넣기
            Medicine.seq = item_seq;
            Medicine.name = item_name;
            Medicine.chart = chart;
            Medicine.storage_method = storage_method;

            //효능 효과(Efficacy-effect)
            //console.log("eedoc", EE_DOC_DATA._attributes.title)
            var EE_DOC = [];
            //길이가 1인 경우는 array로 인식하지 않으므로 if문으로 구분
            if (EE_DOC_DATA.SECTION.ARTICLE instanceof Array) {

                EE_DOC_DATA.SECTION.ARTICLE.forEach(element => {
                    EE_DOC.push(element._attributes.title);
                })
            }
            else {
                if (EE_DOC_DATA.SECTION.ARTICLE.PARAGRAPH instanceof Array) {
                    EE_DOC_DATA.SECTION.ARTICLE.PARAGRAPH.forEach(element => {
                        EE_DOC.push(element._cdata);
                    })
                }
                else {
                    EE_DOC.push(EE_DOC_DATA.SECTION.ARTICLE.PARAGRAPH._cdata);
                }
            };

            Medicine.EE_DOC = EE_DOC;
            //용법 용량(Usage-Dealing)
            //console.log("uddoc", MdcinPrduct.UD_DOC_DATA.DOC._attributes.title, "\n")
            var UD_DOC = [];
            console.log("UD_DOC_DATA.ARTICLE", UD_DOC_DATA.ARTICLE);
            if (UD_DOC_DATA.ARTICLE instanceof Array) {
                UD_DOC_DATA.ARTICLE.forEach(element => {
                    //console.log("title1", element._attributes.title);
                    var UD = {};

                    //console.log("title2", element.PARAGRAPH);
                    //console.log("title3", element)
                    UD.title = element._attributes.title;
                    var contexts = [];
                    if (element.PARAGRAPH instanceof Array) {
                        element.PARAGRAPH.forEach(context => {
                            //console.log("_attributes", context._attributes);
                            //console.log("\t_cdata", context._cdata, "\n");
                            contexts.push(context._cdata);
                        })
                    }
                    else {
                        //console.log("\t_cdata", element.PARAGRAPH._cdata, "\n");
                        contexts.push(element.PARAGRAPH._cdata);
                    }
                    UD.contexts = contexts;
                    UD_DOC.push(UD);
                });
            }
            else {
                if (UD_DOC_DATA.ARTICLE.PARAGRAPH instanceof Array) {
                    UD_DOC_DATA.ARTICLE.PARAGRAPH.forEach(element => {
                        UD_DOC.push(element._cdata)
                    })
                }
                else {
                    UD_DOC.push(UD_DOC_DATA.ARTICLE.PARAGRAPH._cdata)
                }
            }
            Medicine.UD_DOC = UD_DOC;
        }
    );


    return Medicine;
};

module.exports = MdcinPrductPrmisnInfoService;
