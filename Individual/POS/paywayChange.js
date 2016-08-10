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
var writeStream = fs.createWriteStream("data/pos/paywayChange"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'Result');
    
    //起始式
module.exports = {
  'paywayChange' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM75')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .url('http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=54014a5dd8ae164e85b9e8f5db861870&current_module_id=300034')
        .waitForElementPresent('input[name=policyNumber]', 10000) 


         //Search 
     
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
        .click("//input[@name='Add']")
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='1009']")
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='policyChgId']")//點選選項的圈圈
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=5]")//點選變更資料輸入
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)

        //給付種類選預設身故保險金
        for(k=2;k<=3;k++){
        !function inner(k){
        browser
        .click("//select[@name='beneficiaryType']/option[@value='"+k+"']")
        .pause(1000)   
        .click("(//input[@name='changeBtn'])[position()=1]")
        .pause(2000)
        .element("xpath","//tr[@classname='odd']/td[@classname='table_column']",function(tag){ 
          browser 
         .elementIdValue(tag.value.ELEMENT, [browser.Keys.TAB, browser.Keys.ENTER]) 
        })
        .pause(2000)
        //支付方式預設為匯款
        .click("//select[@name='targetModifyChangePaymenttype.csPayMode']/option[@value='2']")
        .pause(1000)
        .clearValue("//input[@name='targetModifyChangePaymenttype.bankCode']")
        .setValue("//input[@name='targetModifyChangePaymenttype.bankCode']",'004')
        .clearValue("//input[@name='targetModifyChangePaymenttype.bankAccount']")
        .setValue("//input[@name='targetModifyChangePaymenttype.bankAccount']",'168888888')
        .click("//select[@id='targetModifyChangePaymenttype.moneyId']/option[@value='8']")
        .click("(//input[@name='changeBtn'])[position()=2]")//點選變更資料
        }(k)
      }
      browser
      .click("(//input[@classname='button btn'])[position()=last()-3]")
      .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
      .click("(//input[@classname='button btn'])[position()=last()-6]")
      .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)   
      .getText("//div[@classname='label2']",function(result){
          writeStream.write(result.value)
        })


    

      


      
 











    






           
}
})
}
}


