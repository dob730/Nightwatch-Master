// Converter Class  ,fs (file system) 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//file string物件讀入資料
fs.createReadStream("data/all/all.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/all/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'ID'+','+'Product'+','+'Payamount'+','+'Result'); 
var csUrl = 'http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=837b05330f2c99ecd1fecb7652459d48&current_module_id=300034'


//起始式 
module.exports = {                
  'ContractTerminate' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
                            
      
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
               
      
                   

     

          // Pos contract terminate
      browser
        .useCss()
        .url(csUrl)
        .useXpath()
        // .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        .setValue("//input[@name='policyNumber_text']", '00000634480') 
        .getAttribute("//input[@name='policyNumber_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')
        })
        .useXpath()
        .click("//select[@name='sendType']")
        .keys(['\uE015'])
        .pause(1000)
        .waitForElementVisible("//select[@name='sourceCheckList']", 1000)
        //全選變更項目
        .click("//select[@name='sourceCheckList']/option[@value='559']")
        .element("xpath","//select[@name='sourceCheckList']/option[@value='559']",function(tag){
          browser
          .elementIdValue(tag.value.ELEMENT, [browser.Keys.SHIFT,  browser.Keys.END])
        })

        //選擇受理文件
        browser
        .click("//input[@name='Add']")
        .pause(1000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='201']")
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 

        // Contents 
        
        .click("(//input[@classname='button btn'])[position()=5]")
        .pause(1000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='endCause']")
        .keys(['\uE015'])
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(1000)

        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 

        // //補退費
        // .click("//select[@name='csPayMode']/option[@value='1']")
        // .setValue("//input[@name='bankCode1']",'004')
        // .setValue("//input[@name='bankAccount1']",'168888888')
        // .getAttribute("//input[@name='netAmount']","value",function(result){
        //     browser
        //     .setValue("//input[@name='feeAmount']",result.value)
        // })
        // browser
        // .click("(//input[@classname='button btn'])[position()=1]")
        // .pause(2000)
        // .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .click("(//input[@classname='button btn'])[position()=5]")
        // .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .getText("//div[@classname='label2']",function(result){
          writeStream.write(result.value)
        })
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'posresult.png')


      }})
  }

};         

