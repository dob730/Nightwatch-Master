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
var writeStream = fs.createWriteStream("data/pos/policyLoan"+ now +"_pos.csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'Result'); 
var csUrl = 'http://210.13.77.85:12000/ls/cs/commonflow.registration.EnterRegister.do?syskey_request_token=837b05330f2c99ecd1fecb7652459d48&current_module_id=300034'
module.exports = {
  'policyLoan Smoking' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
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
            
        // browser
        // .url("http://210.13.77.85:12000/ls/cs/commonflow.appentry.ApplicationEntryPool.do") //delete when done
        // .setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        // .click("(//input[@classname='button btn'])[position()=1]")
        // .pause(2000)
        // .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        // .click("//input[@name='continueButton']")
        // .pause(2000)
        // .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
       

        browser
        .url(csUrl)
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        

        // Pos
        .useXpath()
    	.setValue("//input[@name='policyNumber_text']", jsonArray[i]['number'])
        // .setValue("//input[@name='policyNumber_text']", '00000725250') 
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
          .elementIdValue(tag.value.ELEMENT, [browser.Keys.SHIFT,  browser.Keys.END, browser.Keys.Enter])
        })
        browser
        .pause(1000)
        .click("//input[@name='Add']")
        .pause(2000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//select[@name='source']/option[@value='204']")
        .click("(//input[@name='Add'])[position()=2]")
        .click("(//input[@classname='button btn'])[position()=7]")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .pause(2000)
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 

        //content
        .useXpath()
        .click("(//input[@classname='button btn'])[position()=5]")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .click("//input[@name='continueButton']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .pause(1000)
        .getAttribute("//input[@name='sumAvailableLoanAmount']","value",function(loanNum){
                var loanAmount = loanNum.value
                if(loanAmount > '0'){  //如果條件達到貸款標準
                    browser
                    .clearValue("//input[@name='applyLoanAmount']")
                    .setValue("//input[@name='applyLoanAmount']",loanAmount)
                    .click("//input[@name='submitButton']")
                    .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
                    .pause(1000)
                    .click("//input[@name='btnSub']")
                    .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
                    //補退費
                    
                    .click("//select[@name='csPayMode']/option[@value='1']")
                    .getText("(//font[@classname='textfiled_ro textfield_null ro font_line'])[position()=2]",function(name){
                        browser.setValue("//input[@name='payeeIdName']",name.value)
                    })
                    browser
                    .setValue("//input[@name='bankCode1']",'004')
                    .setValue("//input[@name='bankAccount1']",'168888888')
                    .getAttribute("//input[@name='netAmount']","value",function(result){
                    if(result.value>='0'){
                        browser
                        .setValue("//input[@name='feeAmount']",result.value)    
                    }else{ //金額抓正數處理
                    //rm匯款縮寫
                        var rm = result.value
                        var money = rm.replace('-','')   //強制去除金額的負號
                    browser
                     .setValue("//input[@name='feeAmount']",money) 

                }
                browser
                .click("(//input[@classname='button btn'])[position()=1]")
                .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
                .click("//input[@name='dispatchChangeIds']")
                .click("(//input[@classname='button btn'])[position()=5]")
                .getText("//div[@classname='label2']",function(result){
                    writeStream.write(result.value)
        })//END OF 保單借款
            })
                }else{
                     writeStream.write('保全申請狀態改變為 退件')
                     browser
                     .useXpath()
                     .click("(//input[@classname='button btn'])[position()=2]")
                     .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
                     .click("//select[@name='rejectCode']/option[@value='4']")
                     .pause(1000)
                     .click("(//input[@classname='button btn'])[position()=1]",function(){browser.accept_alert()})
                     .waitForElementPresent("//div[@classname='header_logo_ls']", 10000)
                     //為了閃過點不到圓圈圈
                     .elements("xpath","//textarea[@name='applyNote']",function(){
                        browser
                        .pause(5000)
                        .setValue("//textarea[@name='applyNote']",'累積保費未達申請標準，退件')
                         
                     })
                     browser
                    .waitForElementPresent("//input[@name='btnReject']", 30000)
                    .click("//input[@name='btnReject']")
                    .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
                    .click("//select[@name='itemCode']/option[@value='131']")
                    .pause(1000)
                    .click("(//input[@classname='button btn'])[position()=3]",function(){browser.accept_alert()})
                    
                }    
            })    
        


 }})
  }
};
