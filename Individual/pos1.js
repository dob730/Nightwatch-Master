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

module.exports = {
  'Traditional Smoking' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM28')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000) 
        .url('http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=a747d6001dada0797ab5006252f7f15a&current_module_id=300034')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 

        // Pos
        .useXpath()
    	.setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .getAttribute("//input[@name='policyNumber_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')
        })
        .click("//select[@name='sendType']")
        .keys(['\uE015'])
        .pause(1000)
        .click("//select[@name='sourceCheckList']/option[@value='571']")
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

        // Contents
  /*      .url("http://210.13.77.85:12000/ls/cs/commonflow.appentry.ApplicationEntryPool.do") //delete when done
        .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)  */

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
            browser
            .setValue("//input[@name='feeAmount']",result.value)
        })

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
