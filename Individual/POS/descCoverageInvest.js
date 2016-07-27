// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
/*
保了一陣子後，因為可能經濟狀況有問題而減額
 */


//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/pos/pos.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/pos/descCoverage"+ now +"_invest.csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'PosResult'+','+'Result'); 
var csUrl = 'http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=837b05330f2c99ecd1fecb7652459d48&current_module_id=300034'
module.exports = {
  'descCoverageTrad Smoking' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      browser
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
       
       //從保全池進去     
        // browser
        // .useXpath()
        // .url('http://210.13.77.85:12000/ls/cs/commonflow.appentry.ApplicationEntryPool.do') //delete when done
        // .setValue("//input[@name='policyNumber_text']", '00000726930')
        // .click("(//input[@classname='button btn'])[position()=1]")
        // .pause(2000)
        // .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .click("//input[@name='continueButton']")
        // .pause(2000)
        // .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .element("xpath","//tr[@classname='odd']/td[@classname='table_column']",function(tag){
        //   browser
        //   .elementIdValue(tag.value.ELEMENT, [browser.Keys.TAB,  browser.Keys.ENTER])
        // })

        browser
        .url(csUrl)
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        

        // Pos
        .useXpath()
    	.setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        // .setValue("//input[@name='policyNumber_text']", '00000730340') 
        .getAttribute("//input[@name='policyNumber_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')
        })
        .click("//select[@name='sendType']")
        .keys(['\uE015'])
        .pause(1000)
         //全選變更項目
        .click("//select[@name='sourceCheckList']/option[@value='559']")
        .element("xpath","//select[@name='sourceCheckList']/option[@value='559']",function(tag){
          browser
          .elementIdValue(tag.value.ELEMENT, [browser.Keys.SHIFT,  browser.Keys.END])
        })
        .pause(1000)
        .click("//input[@name='Add']")
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='174']")
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'posConfirm.png')


        /*
            缺會符合未達猶豫期抓去處理
         */
        
        //輸入保全變更
        .click("(//input[@classname='button btn'])[position()=5]")
        
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .pause(2000)
        .click("//tr[@classname='odd']/td[@classname='table_column']")
        .pause(2000)
        .click("//input[@name='selectedItemIdList'])[position()=1]")
        .pause(2000)
        .click("//select[@name='tempProductTypeList']/option[@value='1']")
        .setValue("//input[@name='dataStrAfList']",jsonArray[i]['descCoverage'])
        .pause(1000)
        .click("//input[@classname='button btn']")
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        //變更確認
        .click("(//input[@classname='button btn'])[position()=2]")
        .pause(1000)

        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
             
        .pause(1000) 
        
        .click("//input[@name='btnSub']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // //補退費
        // .click("//select[@name='csPayMode']/option[@value='1']")
        // .setValue("//input[@name='bankCode1']",'004')
        // .setValue("//input[@name='bankAccount1']",'168888888')
        // .getAttribute("//input[@name='netAmount']","value",function(result){
        //     if(result.value>=0){
        //         browser
        //         .setValue("//input[@name='feeAmount']",result.value)    
        //     }else{ //金額抓正數處理
        //         //rm匯款縮寫
        //         var rm = result.value
        //         var money = rm.replace('-','')   //強制去除金額的負號
        //         browser
        //         .setValue("//input[@name='feeAmount']",money) 
        //     }
            
        // })
// browser
// .useXpath()
        .getText("//div[@classname='label2']",function(result){
          writeStream.write('\r\n'+result.value+',')
        })
        .saveScreenshot('./data/pos/' +jsonArray[i]['number']+'posresult.png')


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
        })

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

        .click("//input[@name='btnSaveUwIssuesList']")
        .pause(1000)
        .click("//input[@name='btnCancel']")
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .pause(5000)
        .click("//input[@name='btnSubmit']" , function(){browser
          .pause(2000)
          .accept_alert()})
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        //check
        .url('http://210.13.77.85:12000/ls/qry/commonquery.CommonQuery.do?syskey_request_token=d83d39e2acdfa20e8f903f934aa511ab&current_module_id=301744')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .click("//input[@name='qryType']")
        .pause(1000)
        .setValue("//input[@name='policyCode_text']", jsonArray[i]['number'])
        .pause(1000)
        .click("//input[@name='qryType']")
        .pause(1000)
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .pause(3000)
        .saveScreenshot('./data/all/' +jsonArray[i]['number']+'search.png')
        .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
          writeStream.write('\r\n'+result.value+',')
        })
        .saveScreenshot('./data/all/' +jsonArray[i]['number']+'search.png')
        //end of 阿密陀佛一定生效

   }})
  }
};
