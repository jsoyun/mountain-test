const axios = require('axios');
const APIkey = require('../public/mountainInfo/javascripts/APIkey');
const Mountain = require('../models/mountain');

const apidata = async (i) => {
  const servicekey = APIkey.servicekeyen;
  const url1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI';
  const mountainarry = ["가리산", "가리왕산", "가야산", "가지산", "감악산", "강천산", "계룡산", "계방산", "공작산", "관악산", "구병산", "금산", "금수산", "금오산", "금정산", "깃대봉", "남산", "내연산", "내장산", "대둔산", "대암산", "대야산", "덕숭산", "덕유산", "덕항산", "도락산", "도봉산", "두륜산", "두타산", "마니산", "마이산", "명성산", "명지산", "모악산", "무등산", "무학산", "미륵산", "민주지산", "방장산", "방태산", "백덕산", "백암산", "백운산", "백운산", "백운산", "변산", "북한산", "비슬산", "삼악산", "서대산", "선운산", "설악산", "성인봉", "소백산", "소요산", "속리산", "신불산", "연화산", "오대산", "오봉산", "용문산", "용화산", "운문산", "운악산", "운장산", "월악산", "월출산", "유명산", "응봉산", "장안산", "재약산", "적상산", "점봉산", "조계산", "주왕산", "주흘산", "지리산", "지리산", "천관산", "천마산", "천성산", "천태산", "청량산", "추월산", "축령산", "치악산", "칠갑산", "태백산", "태화산", "팔공산", "팔봉산", "팔영산", "한라산", "화악산", "화왕산", "황매산", "황석산", "황악산", "황장산", "희양산"];
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
  queryParams += '&' + encodeURIComponent('searchWrd') + '=' + encodeURIComponent(mountainarry[i]);; /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  let fullurl1 = url1 + queryParams;
  try {
    const result1 = await axios.get(fullurl1);
    const apiData1 = result1.data.response.body.items.item;
    console.log('위쪽');
    if (apiData1.length == undefined) {
      // console.log(apiData1)
      let url2 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI';
      var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
      queryParams += '&' + encodeURIComponent('mntiListNo') + '=' + encodeURIComponent(apiData1.mntilistno);; /* */
      let fullurl2 = url2 + queryParams;
      const result2 = await axios.get(fullurl2);
      const apiData2 = result2.data.response.body.items.item;
      if (apiData2.length == undefined) {
        const inputdata = await Mountain.create({
          mountainlistno: apiData1.mntilistno,
          name: apiData1.mntiname,
          height: apiData1.mntihigh,
          address: apiData1.mntiadd,
          details: apiData1.mntidetails,
          topdetails: apiData1.mntitop,
          imgurl: `www.forest.go.kr/images/data/down/mountain/${apiData2.imgfilename}`,
        });
      } else {
        let num = apiData2.length - 1;
        const inputdata = await Mountain.create({
          mountainlistno: apiData1.mntilistno,
          name: apiData1.mntiname,
          height: apiData1.mntihigh,
          address: apiData1.mntiadd,
          details: apiData1.mntidetails,
          topdetails: apiData1.mntitop,
          imgurl: `www.forest.go.kr/images/data/down/mountain/${apiData2[0].imgfilename}`,
        });
      }
    } else {
      console.log('아래쪽');
      for (let j = 0; j < apiData1.length; j++) {
        if (apiData1[j].mntitop == undefined || apiData1[j].mntitop == "" || apiData1[j].mntitop == " " || apiData1[j].mntitop == null) {
        } else {
          let url2 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI';
          var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
          queryParams += '&' + encodeURIComponent('mntiListNo') + '=' + encodeURIComponent(apiData1[j].mntilistno);; /* */
          let fullurl2 = url2 + queryParams;
          const result2 = await axios.get(fullurl2);
          const apiData2 = result2.data.response.body.items.item;
          if (apiData2.length == undefined) {
            const inputdata = await Mountain.create({
              mountainlistno: apiData1[j].mntilistno,
              name: apiData1[j].mntiname,
              height: apiData1[j].mntihigh,
              address: apiData1[j].mntiadd,
              details: apiData1[j].mntidetails,
              topdetails: apiData1[j].mntitop,
              imgurl: `www.forest.go.kr/images/data/down/mountain/${apiData2.imgfilename}`,
            });
          } else {
            let num = apiData2.length - 1;
            const inputdata = await Mountain.create({
              mountainlistno: apiData1[j].mntilistno,
              name: apiData1[j].mntiname,
              height: apiData1[j].mntihigh,
              address: apiData1[j].mntiadd,
              details: apiData1[j].mntidetails,
              topdetails: apiData1[j].mntitop,
              imgurl: `www.forest.go.kr/images/data/down/mountain/${apiData2[0].imgfilename}`,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log('에러났다');
  }

};
// apidata(10);
async function saveApiData() {
  for (let i = 0; i < 100; i++) {
    console.log(i + '번째줄이다///////')
    await apidata(i);
  }
}
saveApiData()

module.exports = apidata;