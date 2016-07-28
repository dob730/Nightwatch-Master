// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/pos/pos.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/pos/"+ now +"_pos.csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'Result'); 


module.exports = {                //end parsered 函式呼叫傳入物件，"end_parsered"變數名稱
  'Open all' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
      
      //UserAccount login   第一次叫程式告訴你登入
                            
    if(i==0){
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .clearValue('input[name=userName]')
        .setValue('input[name=userName]', 'IBM28')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
    }


        // Pos
         browser
        .pause(1000) 
        .url('http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=a747d6001dada0797ab5006252f7f15a&current_module_id=300034')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000)
        .useXpath()
        .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .getAttribute("//input[@name='policyNumber_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')//將保單號紀錄至CSV檔
        })
        .click("//select[@name='sendType']")
        .keys(['\uE015'])
        .pause(1000)
        .click("//select[@name='sourceCheckList']/option[@value='559']")//559 變更內容
        .pause(1000)
        .click("//input[@name='Add']")
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='166']")//姓名變更1018,客戶基本資料變更166,傳統增保額110,投資增保額144
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='policyChgId']")//點選選項的圈圈
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=5]")//點選變更資料輸入
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
        //變更項目全勾選
        //**以下為變更要保人地址功能
        
        .click("//input[@name='phAddrChk']")
        .pause(2000)
       //點擊地址連結
        .click("(//a[@name='addressDescUrl'])[position()=1]")
        // .elementIdClick("//a[@name='addressDescUrl'])[position()=2]",function  (result) {
        //     console.log('dsafdasfdsa:'+result.value)
        // })
        .pause(2000)



        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 

        .click("(//input[@name='pAddressId'])[position()=1]")//點擊住址列表第一個圈圈

        .clearValue("//input[@name='postalCode']")
        .setValue("//input[@name='postalCode']", jsonArray[i]['postcode'])//輸入主被保人變更之郵遞區號
        // .getAttribute("//input[@name='postalCode']","value",function(result){
        //   writeStream.write(result.value+',')//紀錄郵遞區號至CSV檔
        // })
        .pause(1000)
        .clearValue("//input[@name='address1']")
        .setValue("//input[@name='address1']", jsonArray[i]['address'])//輸入主被保人變更之地址
        .getAttribute("//input[@name='address1']","value",function(result){
          writeStream.write(result.value+',')//紀錄地址至CSV檔
        })
        .pause(1000)
        .click("//input[@name='isAggreement']")//勾選檢附地址變更同意書
        .pause(2000)
        .elementIdDisplayed("//input[@name='mailFailedTimes']",function(){
          browser
            .click("(//input[@classname='button btn'])[position()=1]", function(){
              browser
              .pause(2000)
              .accept_alert()})   
        })
        browser
        .useXpath()
        .waitForElementPresent("//div[@classname='header_logo_ls']", 50000)
        //**彈出視窗點確認

        .pause(2000)
        .click("//input[@name='submitAllChangeBtn']")//確認
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .click("//input[@name='btnSub']")//確認
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 20000)


         browser
        .pause(1000) 
        .url('http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=a747d6001dada0797ab5006252f7f15a&current_module_id=300034')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000)
        .useXpath()
        .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .getAttribute("//input[@name='policyNumber_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')//將保單號紀錄至CSV檔
        })
        .click("//select[@name='sendType']")
        .keys(['\uE015'])
        .pause(1000)
        .click("//select[@name='sourceCheckList']/option[@value='559']")//559 變更內容
        .pause(1000)
        .click("//input[@name='Add']")
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='166']")//姓名變更1018,客戶基本資料變更166,傳統增保額110,投資增保額144
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='policyChgId']")//點選選項的圈圈
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=5]")//點選變更資料輸入
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)

        **以下為變更要保人電話、手機、mail功能
        .click("//input[@name='phAddrChk']")//因為地址已經打勾，需再點一次才會取消勾選
        .click("//input[@name='phHomeTelChk']")//電話
        .click("//input[@name='phMobileTelChk']")//手機
        .click("//input[@name='phEmailChk']")//mail
        .pause(2000)
        //點擊要保人姓名進入變更電話、手機、mail連結
        .click("(//a[@name='customerNameUrl'])[position()=1]")
        .elementIdClick("//a[@name='customerNameUrl'])[position()=1]",function  (result) {
            console.log('dsafdasfdsa:'+result.value)
        })

        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .clearValue("//input[@name='homeTel']")
        .setValue("//input[@name='homeTel']",jsonArray[i]['TelNum'])//住家電話(必填)
        .clearValue("//input[@name='companyTel']")
        .setValue("//input[@name='companyTel']",jsonArray[i]['ComNum'])//公司電話
        .clearValue("//input[@name='mobileTel']")
        .setValue("//input[@name='mobileTel']",jsonArray[i]['MobileNum1'])//手機1(必填)
        .clearValue("//input[@name='mobileTel2']")
        .setValue("//input[@name='mobileTel2']",jsonArray[i]['MobileNum2'])//手機2(必填)
        .clearValue("//input[@name='email']")
        .setValue("//input[@name='email']",jsonArray[i]['Email'])//信箱(必填)
        .click("(//input[@classname='button btn'])[position()=1]")//確認
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .click("//input[@name='submitAllChangeBtn']")//確認
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .click("//input[@name='btnSub']")//確認
        .pause(1000)

        //綜合查詢選客戶資訊tab然後擷取畫面or抓新地址，看新地址與輸入的jsonArray[i]['address']有無相同
        browser
        .useXpath()
        .url('http://210.13.77.85:12000/ls/qry/commonquery.CommonQuery.do?syskey_request_token=d83d39e2acdfa20e8f903f934aa511ab&current_module_id=301744')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .click("//input[@name='qryType']")
        .pause(1000)
        .setValue("//input[@name='policyCode_text']",jsonArray[i]['number'])
        .pause(1000)
        .click("//input[@name='qryType']")
        .pause(1000)
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .pause(3000)



        //以下為點擊客戶資訊連結尚未完成的部分
        // .click("(//ul[@classname='nav_tab tab_full'])//div[@noWrap='noWrap']")//點擊客戶資訊

        //.getAttribute("(//div[@noWrap='nowrap'])[position='4']", "URL" ,function(url){
         
        // console.error('URL = ' + url.URL);

        // browser
        // .useCss()
        // .pause(1000000)
        // .url('http://210.13.77.85:12000/ + URL')
        
        // pause(1000)
        // .saveScreenshot('./data/pos/' +jsonArray[i]['number']+'search.png')
        // }
        // .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
        // writeStream.write(result.value)// label包著div包著td的xpath and call function in callback


   }})
  }

};