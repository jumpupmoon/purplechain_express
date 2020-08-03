const request = require('request-promise-native');
const convert = require("xml-js");

var MdcinPrductListInfoService = {};

var ServiceKey =
    "Y79MZBb9ME6yzBoRjLuTbaQPWv0HlA7U0KQ2wCnXlzzu8itvKlrURot8dqTHWmRpodg68%2BBr%2B0I%2Bg0HgHhKQIg%3D%3D";

MdcinPrductListInfoService.getMdcinPrductList = async function (searchText) {
    //해당 검색어와 관련된 의약품 제품명들을 담는 배열 생성
    var MedicineNames = [];

    var url =
        "http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductList";
    var item_name = searchText;
    var queryParams =
        "?" + encodeURIComponent("ServiceKey") + "=" + ServiceKey; /* Service Key*/

    queryParams +=
        "&" +
        encodeURIComponent("item_name") +
        "=" +
        encodeURIComponent(item_name); /* */
    
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
            var MedicineList = obj.response.body.items.item;

            if(MedicineList == undefined) return;
            
            if(MedicineList instanceof Array){
                MedicineList.forEach(medicine => {
                    MedicineNames.push(medicine.ITEM_NAME._text);
                })
            }
            else{
                console.log("test!!!!!!!!!!!!!",MedicineList)
                MedicineNames.push(MedicineList.ITEM_NAME._text);
            }
        }
    );


    return MedicineNames;
};

module.exports = MdcinPrductListInfoService;