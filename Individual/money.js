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
var writeStream = fs.createWriteStream("data/invest/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('ID'+','+'Number'+','+'Product'+','+'Payamount'+','+'Result'); 

module.exports = {
  'Open Invest' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM7')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000) 
        .useXpath()

        // loop for batch
        !function outer(i) { browser
        .elementIdDisplayed("//div[@classname='header_logo_ls']", function(){
          var date = jsonArray[i]['date'];
          for (j = 0; j < 5 ; j ++) {
            !function outer(j) { 
              date = Number(date) + 10000 
                  browser
                  .url('http://210.13.77.85:12000/ls/tool/setSysdateAction.do?syskey_request_token=a748e0331b13261bbc7a32451d834360&current_module_id=301182')
                  .clearValue("//input[@name='conSysdate_minguo']")
                  .setValue("//input[@name='conSysdate_minguo']", date)
                  .click("//input[@classname='button btn']")
                  .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
                  .pause(1000)
                  .url('http://210.13.77.85:12000/ls/arap/cash/recv/counter/search.do?syskey_request_token=752ba247eba263311fb36ec58db42536&current_module_id=300168')
                  .waitForElementPresent("//input[@classname='button btn']", 30000) 
                  .setValue("//input[@name='policyNumber']", jsonArray[i]['number'])
                  .click("//input[@classname='button btn']")
                  .waitForElementPresent("(//input[@classname='button btn'])[position()=1]", 30000) 
                  .setValue("//input[@name='pay_amount']", jsonArray[i]['payamount'])
                  .setValue("//input[@name='voucherAmount']", jsonArray[i]['payamount'])
                  .setValue("//input[@name='payMode_text']", '11')
                  .click("//input[@name='voucherDate_minguo']")
                  .pause(2000)
                  .setValue("//input[@name='voucherDate_minguo']", date)
                  .click("//select[@name='account']")
                  .keys(['\uE015', '\uE006'])
                  .click("(//input[@classname='button btn'])[position()=1]")
                  .waitForElementPresent("//table[@id='table2']", 30000)
                  .click("(//input[@classname='button btn'])[position()=3]")
                  .click("(//input[@classname='button btn'])[position()=4]")
                  .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
                  .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'payamount.png')
            }(j)
          }
        },false)}(i)

        // Batch
        browser
        .url('http://210.13.77.85:12000/ls/pub/batch/SubmitPreSchedEntry.do?syskey_request_token=5a46a3f6a01e4ce60cefd8c6b5984167&current_module_id=400750')
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .pause(1000) 
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000, function(){browser.accept_alert()})
        .pause(1000) 


   }})
  }
};
