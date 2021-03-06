/*

投資型保單保了一段時間，可能經濟狀況有問題，所以解約。


 */



// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/invest/invest.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/invest/"+ now +"_pos.csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'Result'); 
var csUrl = 'http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=837b05330f2c99ecd1fecb7652459d48&current_module_id=300034'
module.exports = {
  'Traditional Smoking' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      browser
      //UserAccount login   第一次叫程式告訴你登入
                            
    if(i==0){
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .clearValue('input[name=userName]')
        .setValue('input[name=userName]', 'IBM29')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
    }
               
        browser
        .url(csUrl)
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        

        // Pos
        .useXpath()
    	.setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        // .setValue("//input[@name='policyNumber_text']", '00000759560') 
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
        .click("//select[@name='source']/option[@value='179']")
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'posConfirm.png')
        // Contents
  /*      .url("http://210.13.77.85:12000/ls/cs/commonflow.appentry.ApplicationEntryPool.do") //delete when done
        .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)  */

        /*
            缺會符合未達猶豫期抓去處理
         */

        //輸入保全變更
        .click("(//input[@classname='button btn'])[position()=5]")
        
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='surrenderReason']/option[@value='63']")
        
        .click("//input[@classname='button btn']")
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("(//input[@classname='button btn'])[position()=4]")
        
        .pause(1000)

        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("(//input[@classname='button btn'])[position()=7]")
        
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        //補退費
        .click("//select[@name='csPayMode']/option[@value='1']")
        .setValue("//input[@name='bankCode1']",'004')
        .setValue("//input[@name='bankAccount1']",'168888888')
        .getAttribute("//input[@name='netAmount']","value",function(result){
            if(result.value>=0){
                browser
                .setValue("//input[@name='feeAmount']",result.value)    
            }else{ //金額抓正數處理
                //rm匯款縮寫
                var rm = result.value
                var money = rm.replace('-','')   //強制去除金額的負號
                browser
                .setValue("//input[@name='feeAmount']",money) 
            }
            
        })
        //end of 補退費

        browser  
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("(//input[@classname='button btn'])[position()=5]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .getText("//div[@classname='label2']",function(result){
          writeStream.write(result.value)
        })
        .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'posresult.png')


   }})
  }
};
