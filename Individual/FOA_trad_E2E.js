// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});
//read from file 
fs.createReadStream("data/trad/trad_foa.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/trad/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('ID'+','+'Number'+','+'Product'+','+'Payamount'+','+'Result'); 
var periodValue = 1;

module.exports = {
  'FOA Accepted' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (i = 0; i < jsonArray.length ; i ++)  { 
      var id1 = makeid()
      browser
        .frame(null)
        .useCss()
        .url('http://10.67.67.4:9082/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM1')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000)
        .useXpath()
   
        // Open New
        .url('http://10.67.67.4:9082/ls/chl/foaNbAcceptance.do?tabNo=1&actionNo=100')
        .waitForElementPresent("//input[@name='unbCaseVO.policyCode']", 30000) 
    	.clearValue("//input[@name='unbCaseVO.policyCode']")
    	.setValue("//input[@name='unbCaseVO.policyCode']", jsonArray[i]['number'])
        .clearValue("//input[@name='unbCaseVO.applyDate_minguo']")
        .setValue("//input[@name='unbCaseVO.applyDate_minguo']",jsonArray[i]['date'])
        .clearValue("//input[@name='acceptVO.aceptDate_minguo']")
        .setValue("//input[@name='acceptVO.aceptDate_minguo']",jsonArray[i]['date'])
        .click("//select[@name='acceptVO.aceptOrg']/option[@value='349487629']")
         //受理單位 349487629 2AA31-5區 
        .pause(2000)
        .setValue("//input[@name='holderVO.name']",'foa'+ Math.floor((Math.random() * 1000000) + 1))
        .pause(2000)
        .clearValue("//input[@name='holderVO.birthday_minguo']")
        .setValue("//input[@name='holderVO.birthday_minguo']",'075/03/13')
        .clearValue("//input[@name='holderVO.certiCode']")
        .setValue("//input[@name='holderVO.certiCode']", id1)
        .pause(1000)
        .click("//select[@name='holderVO.jobClass']/option[@value='1']")
        .click("//select[@name='holderVO.gender']")
        .keys(['\uE015', '\uE006'])
         //被保人資料
        .waitForElementPresent("//select[@name='laToPh']", 30000)
        .click("//select[@name='laToPh']")
        .keys(['\uE015', '\uE006'])
        
        //.setValue("//input[@name='laToPh']",'1')
        .click("(//input[@name='BT_EXIT'])[position()=1]")
        .pause(3000)
        //險種資料
        .waitForElementPresent("//select[@name='productVO.certiCode']", 30000)
        .click("//select[@name='productVO.certiCode']")
        .keys(['\uE015', '\uE006'])
        .setValue("//input[@name='productVO.productId_text']", jsonArray[i]['code'])
        .pause(2000)
        .click("//select[@name='productVO.initialType']/option[@value='1']")
        //繳別 1年繳 2半年繳 3季繳 4月繳 5躉繳
        .pause(2000)
        .click("//select[@name='productVO.chargePeriod']/option[@value='2']")
         //繳費年期類型 0無關 1躉繳 2按年限繳 3繳至某確定年齡 4終身繳費
        .setValue("//input[@name='productVO.chargeYear']", jsonArray[i]['chargeyear'])
        .click("//input[@name='productVO.targetPremium']")
        .setValue("//input[@name='productVO.targetPremium']", jsonArray[i]['targetamount'])
        .click("//input[@name='productVO.overPremium']")
        .setValue("//input[@name='productVO.overPremium']", jsonArray[i]['exceedamount'])

        .click("//input[@id='productVOAmount']")
        .setValue("//input[@id='productVOAmount']",jsonArray[i]['getamount'])
        .click("//input[@id='productVOUnit']")  
        .setValue("//input[@id='productVOUnit']",jsonArray[i]['getunit'])
        .click("//input[@id='productVOBenefitLevel']")  
        .setValue("//input[@id='productVOBenefitLevel']",jsonArray[i]['getlevel'])

        //附約
        !function outer(i) { browser
        .elementIdDisplayed("//select[@name='unbCertiCode']", function(){
          for (k=0;k<1;k++){
            !function outer(k) {browser
        .click("//select[@name='unbCertiCode']")
        .keys(['\uE015', '\uE006'])
        .click("//input[@name='unbProductId_text']")  
        .setValue("//input[@name='unbProductId_text']",jsonArray[i]['addcode'+k])
        .click("//input[@name='unbAmount']") 
        .setValue("//input[@name='unbAmount']", jsonArray[i]['addamount'+k])
        .click("//input[@name='unbUnit']")
        .setValue("//input[@name='unbUnit']", jsonArray[i]['addunit'+k])
        .click("//input[@name='unbBenefitLevel']")
        .setValue("//input[@name='unbBenefitLevel']", jsonArray[i]['addlevel'+k])
        .click("//select[@name='unbChargePeriod']/option[@value='2']")
        //繳費年期 0無關 1躉繳 2按年限繳 3繳至某確定年齡 4終身繳費
        .setValue("//input[@name='unbChargeYear']", jsonArray[i]['addyear'+k])
        .setValue("//input[@name='unbPremAmt']", jsonArray[i]['addamount'+k])
        }(k)
          }
        },false)}(i)

        browser
        //繳費方式
        .click("//select[@name='unbCaseVO.initialType']/option[@value='1']")
        .click("//select[@name='unbCaseVO.renewalType']/option[@value='1']")


        //業務員資料
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) {browser
                  .click("//input[@name='planVO["+k+"].registerCode']")
                  .setValue("//input[@name='planVO["+k+"].registerCode']", jsonArray[i]['planner'+k])
                  .click("//input[@name='planVO["+k+"].commShareRate']")
                  .pause(3000)
                  .clearValue("//input[@name='planVO["+k+"].commShareRate']")
                  .pause(3000)
                  .setValue("//input[@name='planVO["+k+"].commShareRate']", jsonArray[i]['planrate'+k])
                  .pause(3000)
            }(k)
          }
        },false)}(i)

        //業務員done
        
                
        //打勾
        browser
        .click("(//input[@name='docuIndex'])")
        .pause(5000)
        .click("(//input[@classname='button btn'])[position()=last()-3]")
        .pause(5000)
        //結束
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foa.png')
        .pause(5000)

        
        //change time
        .useXpath()
        .url('http://10.67.67.4:9082/ls/tool/setSysdateAction.do?syskey_request_token=136205f01cc68c74d534a3ac1e0dba25&current_module_id=301182')
        .waitForElementPresent("//input[@name='conSysdate_minguo']", 10000)
        .clearValue("//input[@name='conSysdate_minguo']")
        .setValue("//input[@name='conSysdate_minguo']", jsonArray[i]['veridate'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .pause(10000)

        //送件     
        browser
        .url('http://10.67.67.4:9082/ls/chl/foaAceptStatistics.do?syskey_request_token=cde4db8f950b41071cdd225c965a2ea0&current_module_id=1000002792')
        .waitForElementPresent("//input[@name='foaId_text']", 10000) 
        .click("//select[@name='aceptOrg']/option[@value='349487629']")
        //受理單位 349487629 2AA31-5區  
        .click("(//input[@classname='button btn'])[position()=1]")
        .waitForElementPresent("(//input[@type='checkbox'])[1]", 10000) 
        .click("(//input[@type='checkbox'])[1]")
        .pause(5000)
        .click("(//input[@classname='button btn'])[position()=last()-1]")
        .pause(5000)
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foasend.png')
        //內部通路
        .url('http://10.67.67.4:9082/ls/pa/queryFoaAcceptance.do?syskey_request_token=a58df3e73c14495708bdcb416ae8602c&current_module_id=1000003687')
        .pause(10000)
        .click("(//input[@value='on'])")
        .pause(10000)
        .click("(//input[@name='BT_CONFIRM'])")
        .pause(5000)
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'foarecieve.png')
        .pause(5000)

        //Distribute to fill new
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .url('http://10.67.67.4:9082/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=DetailRegistration&taskId=6')
        .useXpath()
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(4000)
        .click("//tr/td[@classname='table_column odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        //fill new 
        .url('http://10.67.67.4:9082/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=DetailRegistration&taskId=6&syskey_request_token=731f379c24509368cbc25acba4e853c5')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(1000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
        .click("//input[@name='claim']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
        .frame('MasterPolicy')
        .frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .setValue("//input[@name='applyVersion']", '1') 
        .clearValue("//input[@name='applyDate_minguo']")
        .setValue("//input[@name='applyDate_minguo']", jsonArray[i]['date']) 
        .click("//input[@name='rowid']")
        .click("//input[@name='__btnModify']")

       // Insurance Person
       .click("//input[@name='policyHolderName']")
       .click("//input[@name='policyHolderBirthDay_minguo']")
        .setValue("//input[@name='policyHolderGender_text']", '1')
        .setValue("//input[@name='policyHolderJobCateId_text']", 'A101')
        .click("//input[@name='policyHolderJobClass']")
        .setValue("//textarea[@name='policyHolderAddrAddress1']", 'tester')
        .click("//input[@name='insured.relationToPH_text']", function(){browser.dismiss_alert()})
        .pause(2000)
        .setValue("//input[@name='insured.relationToPH_text']", '0')
        .click("//input[@name='insured.marriageId_text']")
        .setValue("//input[@name='insured.marriageId_text']", '1')
        .click("(//input[@name='__btnSave'])[position()=1]")
        .pause(1000) 

// fill the insurance data
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .waitForElementPresent("(//input[@name='rowid'])[position()=2]", 30000)
        .pause(1000)
        .click("(//input[@name='rowid'])[position()=2]")
        .click("(//input[@name='__btnModify'])[position()=2]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)
        //.setValue("//input[@name='coverage.initialType_text']", jsonArray[i]['payway'])

        !function outer(i) { 
        browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          browser
          .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
             if (result.value == '00'){
              browser
              .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
                  console.log("amount" + i)
                 if (result.value =='textfiled textfield_null right readOnly ro'){} 
                  else {
                  browser
                    .click("//input[@name='coverage.amount']")
                    .pause(1000)
                    .setValue("//input[@name='coverage.amount']", jsonArray[i]['getamount'])
                    console.log("amount"+i)
                  }
                })
             } else {
              browser
                .click("//input[@name='coverage.chargePeriod_text']")
                .click("//input[@name='coverage.chargeYear']")
                //.setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['chargePeriod_text'])
                //.setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['chargeYear'])
                .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
                  console.log("amount" + i)
                 if (result.value =='textfiled textfield_null right readOnly ro'){} 
                  else {
                  browser
                    .pause(1000)
                    .click("//input[@name='coverage.amount']")
                    .pause(1000)
                    .clearValue("//input[@name='coverage.amount']")
                    .setValue("//input[@name='coverage.amount']", jsonArray[i]['getamount'])
                    console.log("amount"+i)
                  }
                })
                browser
                .setValue("//input[@name='payNext_text']", '3')
            }
          })

          .getAttribute("//input[@name='coverage.coverageYear']", 'class' ,function(result){
            if (result.value =='textfiled_ro textfield_null ro right readOnly'){} 
              else {
                browser
                //.setValue("//input[@name='coverage.coveragePeriod']", jsonArray[i]['coveragePeriod'])
                //.setValue("//input[@name='coverage.coverageYear']", jsonArray[i]['coverageYear'])
                console.log('coveragePeriod' + result.value + i)
              }
          })

          // Fill coverage or plan or unit
          .getAttribute("//input[@name='coverage.benefitLevel']", "class" ,function(result){
             if (result.value =='textfiled textfield_null readOnly ro'){} 
              else {
              browser
                .setValue("//input[@name='coverage.benefitLevel']", jsonArray[i]['getlevel'])
              }
          })


          .getAttribute("//input[@name='coverage.unit']", "class" ,function(result){
             if (result.value =='textfiled textfield_null right readOnly ro'){} 
              else {
              browser
                .setValue("//input[@name='coverage.unit']", jsonArray[i]['getunit'])
                console.log('coverage.unit'+i)
              }
          })
        },false)}(i)

        browser
        .pause(1000)
        .click("(//input[@name='__btnSave'])[position()=2]",function(){browser.dismiss_alert()})

        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)


       // add additional product 
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) { 
                if (jsonArray[i]['addcode'+k] == "") {} else { 
                  browser
                  .setValue("//input[@name='coverage.internalId']", jsonArray[i]['addcode'+k])
                  .click("//input[@id='proposalCategory001']")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)          
                    .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
                     if (result.value == '00'){
                      browser
                      .click("//input[@name='coverage.nhiInsuIndi_text']")
                    } else {
                      console.log(k)
                      browser
                        .setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['addperiod'+k])
                        .setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['addyear'+k])
                      }
                    })
                    .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null right readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.amount']",jsonArray[i]['addamount'+k])
                        }
                    })
                    .getAttribute("//input[@name='coverage.benefitLevel']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.benefitLevel']", jsonArray[i]['addplan'+k])
                        }
                    })
                    .getAttribute("//input[@name='coverage.unit']", "class" ,function(result){
                       if (result.value == 'textfiled textfield_null right readOnly ro'){} else {
                        browser
                          .setValue("//input[@name='coverage.unit']", jsonArray[i]['addunit'+k])
                        }
                    })
                  browser
                  .click("(//input[@name='__btnSave'])[position()=2]")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)
                }
            }(k)
          }
        },false)}(i)
        // add done
        
            //paymode
        browser
            .setValue("//input[@name='aplPermit_text']", '2')
            .setValue("//input[@name='payMode_text']", '3')
            .pause(1000)
            //.setValue("//input[@name='payNext_text']", '3')


            //benificial person
        .setValue("//input[@name='bene.nbBeneficiaryType']", '1')
        .setValue("//input[@name='bene.designation']", '1')
        .setValue("//input[@name='bene.name']", 'Kobe'+Math.floor((Math.random() * 1000000) + 1))
        .clearValue("//input[@name='bene.certiCode']") 
        var id2 = makeid()
        browser
        .setValue("//input[@name='bene.certiCode']", id2) 
        .clearValue("//input[@name='bene.shareOrder']") 
        .setValue("//input[@name='bene.shareOrder']", '1') 
        .clearValue("//input[@name='bene.shareRate']") 
        .setValue("//input[@name='bene.shareRate']", '100') 
            .click("(//input[@name='__btnSave'])[position()=4]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)

            // height and weight
            .pause(1000)
            .setValue("//input[@name='insured.height']", '180')
            .pause(1000)
            .setValue("//input[@name='insured.weight']", '70')
            .pause(1000)
            .setValue("//input[@name='insured.notifyIndi_text']", '2')
            .click("(//input[@name='__btnSave'])[position()=5]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)

            //rest data
            .pause(1000)
            .setValue("//input[@name='otherCheckIndi_text']", '1')
            .pause(1000)
            .setValue("//input[@name='singCompleteIndi_text']", '1')
            .pause(1000)
            .setValue("//input[@name='userConfirmIndi_text']", '1')
            .click("(//input[@name='docType'])[position()=3]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
            .pause(1000)

        // trad claim 
        !function outer(i) { browser
          .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){ browser
            .getAttribute("//input[@name='review.internalId']", "class" ,function(result){
                if (result.value == "textfiled textfield_null readOnly ro") {} else {
                browser
                  .setValue("//input[@name='review.internalId']", jsonArray[i]['code'])
                  .pause(1000)
                  .setValue("//input[@name='review.reviewIndi_text']", '1')
                  .pause(1000)
                  .setValue("//input[@name='review.reviewDate_minguo']", jsonArray[i]['date'])
                  .pause(1000)
                  .setValue("//input[@name='review.strVersion']", jsonArray[i]['version'])
                  .pause(1000)
                  .click("(//input[@name='__btnSave'])[position()=7]")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)
                  console.log('review.internalId'+i)
              }
            })
        },false)}(i)        

        // trad claim -- delete when there is no additional insurance
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) { browser
                if (jsonArray[i]['addcode'+k] =="") {} else {
                  browser
                  .getAttribute("//input[@name='review.internalId']", "class" ,function(result){
                    if (result.value == "textfiled textfield_null readOnly ro") {} else {
                      browser
                      .setValue("//input[@name='review.internalId']", jsonArray[i]['addcode'+k])
                      .clearValue("//input[@name='review.reviewIndi_text']")
                      .setValue("//input[@name='review.reviewIndi_text']", '1')
                      .clearValue("//input[@name='review.reviewDate_minguo']")
                      .setValue("//input[@name='review.reviewDate_minguo']", jsonArray[i]['date'])
                      .clearValue("//input[@name='review.strVersion']")
                      .setValue("//input[@name='review.strVersion']", '1')
                      .click("(//input[@name='__btnSave'])[position()=7]")
                      .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                      .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                      .pause(1000)
                    }
                  })
                }
            }(k)
          }
        },false)}(i)
        
        // final click
        browser
            .click("//input[@name='btnSubmit']", function(){browser.accept_alert()})
            .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 


            // distribute to confirm
            .url('http://10.67.67.4:9082/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=Verification&taskId=10')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(4000)
        .click("//tr[@classname='odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        // turn to confirm
        .url('http://10.67.67.4:9082/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=Verification&taskId=10&syskey_request_token=752ba247eba263311fb36ec58db42536')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(5000)
        .click("//td[@classname='table_column odd']")
        .click("//input[@name='claim']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
        .frame('MasterPolicy')
        .frame('mainfr')
        .waitForElementPresent("//input[@name='btnSubmit']", 30000)
        .pause(5000)
        .click("//input[@name='btnSubmit']" , function(){browser.accept_alert()})
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

        // distribute to manual confirmation
        .url('http://10.67.67.4:9082/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=ManualUW&taskId=8')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(4000)
        .click("//tr[@classname='odd']")
        .click("//input[@name='btnReassign']")
        .waitForElementPresent("//input[@name='userId']", 10000)
        .click("//input[@name='userId']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

        // turn to manual confirmation
        .url('http://10.67.67.4:9082/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=ManualUW&taskId=8&syskey_request_token=752ba247eba263311fb36ec58db42536')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']")
        .click("//input[@name='claim']")
        .waitForElementPresent("//input[@name='btnSubmit']", 10000)
        .click("//input[@name='btnOutstandingIssues']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .elements("xpath","//select[@name='uwRuleStatusId']", function(result){
        console.log(result.value.length)
          for (var a=1; a < (result.value.length+1) ; a ++) {
            !function outer(a) { 
              browser
              .click("(//select[@name='uwRuleStatusId'])[position()="+a+"]")
              .keys(['\uE015','\uE015','\uE006'])
              .pause(2000)
            }(a)
          }
        })
        browser
        .click("//input[@name='btnSaveUwIssuesList']")
        .click("//input[@name='btnCancel']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .click("//input[@name='btnSubmit']" , function(){
        	browser
        	.pause(2000)
        	.accept_alert()})
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

        // Pay money
        .useXpath()
        .url('http://10.67.67.4:9082/ls/arap/cash/recv/counter/search.do?syskey_request_token=752ba247eba263311fb36ec58db42536&current_module_id=300168')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .setValue("//input[@name='policyNumber']", jsonArray[i]['number'])
        .click("//input[@classname='button btn']")
        .waitForElementPresent("(//input[@classname='button btn'])[position()=1]", 30000) 
        .getAttribute("//input[@name='totalIP']", "value" ,function(result){
        browser
            .setValue("//input[@name='pay_amount']",result.value)
            .setValue("//input[@name='voucherAmount']",result.value)
        if(result.value == '0' ) {writeStream.write('payamount= 0'+',')} else {
          var money = result.value
          money = money.replace(/,/g,"")
          writeStream.write(money+',')
        }
        })
        .setValue("//input[@name='payMode_text']", '11')
        .click("//input[@name='voucherDate_minguo']")
        .pause(2000)
        .setValue("//input[@name='voucherDate_minguo']", jsonArray[i]['date'])
        .click("//select[@name='account']")
        .keys(['\uE015', '\uE006'])
        .click("(//input[@classname='button btn'])[position()=1]")
        .waitForElementPresent("//table[@id='table2']", 30000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .click("(//input[@classname='button btn'])[position()=4]")
            .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'payamount.png')

            // Check
        .url('http://10.67.67.4:9082/ls/qry/commonquery.CommonQuery.do?syskey_request_token=d83d39e2acdfa20e8f903f934aa511ab&current_module_id=301744')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .click("//input[@name='qryType']")
        .pause(1000)
        .setValue("//input[@name='policyCode_text']", jsonArray[i]['number'])
        .pause(1000)
        .click("//input[@name='qryType']")
        .pause(1000)
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000)
        .pause(4000)
        .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
          writeStream.write(result.value)
        })
        .saveScreenshot('./data/trad/' +jsonArray[i]['number']+'search.png')

   }})
  }

};



 function makename(namelist){
   var namelist = "";
   var c = "";
    for (var j=0; j<5; j++) {
      c = Math.round(Math.random()*9);
      namelist += c;
    }
    namelist = "Smoke" + namelist;
    return namelist;

  };//end function

function makeid(sList){
  var ALP_STR = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  var NUM_STR = "0123456789";
  var SEX_STR = "12";
  var MAX_COUNT = 999;

// 身分證字號產生器
  var SelectALP = "";
  var SelectSEX = "";
  var sNewPID = "";
   var sList = "";
  var iChkSum = 0;
  // 字母組 隨機產生
    var SelectALP = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        SelectALP = possible.charAt(Math.floor(Math.random() * possible.length));
  // 性別組
  SelectSEX ="1";
  // 第1碼 (英文字母)
  j = SelectALP.substr(Math.round(Math.random()*(SelectALP.length-1)), 1);
  sNewPID += j;
  //console.log("j="+j)
  j = ALP_STR.indexOf(sNewPID) + 10;
  iChkSum = (j-j%10)/10 + (j%10*9); /* X1 + X2*9 */
  // 第2碼 (性別)
  j = SelectSEX.substr(Math.round(Math.random()*(SelectSEX.length-1)), 1);
  sNewPID += j;
  iChkSum += j*8; /* X3*8 */
   // 第3~9碼
    for (var i=0; i<7; i++) {
      c = Math.round(Math.random()*9);
      sNewPID += c;
      iChkSum += c * (7-i);
    }
    // 第10碼 (檢查碼)
    sNewPID += ((10 - iChkSum % 10) % 10);
    sList += sNewPID + "\n";
    return sList;
  }//end function