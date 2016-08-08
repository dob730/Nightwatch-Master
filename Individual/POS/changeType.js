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

//可用號碼：VNL 00000605800
module.exports = {                //end parsered 函式呼叫傳入物件，"end_parsered"變數名稱
  'Open all' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
      
      //UserAccount login   第一次叫程式告訴你登入
                            
    if(i==0){
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .clearValue('input[name=userName]')
        .setValue('input[name=userName]', 'IBM75')
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
        .click("//select[@name='source']/option[@value='1027']")//變更型別
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='policyChgId']")//點選選項的圈圈
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=5]")//點選變更資料輸入
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
        //**
        
        //變更型別
        .click("//input[@classname='combo-input textfield_null']")
        .keys(['\uE015'])//向下兩次
        .keys(['\uE015'])
        .keys(['\uE006'])//enter
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=1]")//變更資訊
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=2]")//確認
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
        .click("//input[@name='btnSub']")//確認
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)


        //再次核保
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .setValue("//input[@name='policyCodePool_text']",jsonArray[i]['number'])
        .pause(1000)
        .click("//input[@classname='button btn']")
        .element("xpath","//tr[@classname='odd']/td[@classname='table_column']",function(tag){
          browser
          .elementIdValue(tag.value.ELEMENT, [browser.Keys.TAB,  browser.Keys.ENTER])
        })//保全核保頁面查詢到保單後，點擊保單號碼網址

        //關閉核保照會
        browser
        .waitForElementPresent("//input[@name='btnSubmit']", 10000)
        .click("//input[@name='btnOutstandingIssues']")
        .elements("xpath","//select[@name='uwRuleStatusId']", function(result){
        console.log(result.value.length)
          for (var a=1; a < (result.value.length+1) ; a ++) {
            !function outer(a) { 
              browser
              .click("(//select[@name='uwRuleStatusId'])[position()="+a+"]")
              .keys(['\ue010','\uE006'])
              .pause(1000)
            }(a)
          }
        })


         browser

        .click("//input[@name='btnSaveUwIssuesList']")//核保照會頁面存檔按鈕
        .pause(1000)
        .click("//input[@name='btnCancel']")//退出
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .pause(5000)
        .click("//input[@name='btnSubmit']" , function(){browser
          .pause(2000)
          .accept_alert()}) //存檔並且接受警示視窗
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        
        //處理核保決定
        browser
        .pause(1000) 
        .url('http://210.13.77.85:12000/ls/cs/commonflow.uwdisp.ApplicationUwDisposalPool.do?syskey_request_token=aa63f48f24a6934830fce61c7d9fa3b5&current_module_id=300041')
        .useXpath()
        .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(2000)
        .click("//input[@name='policyChgId']")//點擊圈圈
        .click("(//input[@classname='button btn'])[position()=2]")//確認
        .pause(2000)
        .getText("//td[@classname='font6']",function(result){
          writeStream.write(result.value)
        })

        // .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
        //   writeStream.write(result.value)
        // })

   }})
  }

};