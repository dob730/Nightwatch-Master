// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({
  checkType: false
});

fs.createReadStream("data/all/all.csv",[{flags: 'rs+'}]).pipe(converter);
var moment = require('moment');
var now = moment().format("YYYY_MMM_Do_h.mm.ss a");
var writeStream = fs.createWriteStream("data/all/"+ now +".csv", [{flags: 'rs+'}]);
writeStream.write('Number'+','+'ID'+','+'Product'+','+'Payamount'+','+'Result'); 


//起始式
module.exports = {
  'Open all' : function (browser) { converter.on("end_parsed", function (jsonArray) { for (var i = 0; i < jsonArray.length ; i++ )  { 
      
      //UserAccount login   第一次叫程式告訴你登入
                            
    if(i==0){
      browser
        .useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .clearValue('input[name=userName]')
        .setValue('input[name=userName]', 'IBM2')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
    }
               
      
                   


        // Open New 
        browser
        .url('http://210.13.77.85:12000/ls/pa/outerAcceptance.do?syskey_request_token=32f6ac8c7200671c71e43cd5ef4fc2ad&current_module_id=1000003287')
    	  .useXpath()
    	  .setValue("//input[@name='brbdAcceptanceVO.policyCode_text']",jsonArray[i]['number'])
        .getAttribute("//input[@name='brbdAcceptanceVO.policyCode_text']", "value" ,function(result){
        writeStream.write('\r\n'+result.value+',')//紀錄至csv檔
        })
        var id1 = makeid()//由函式產生身分證字號
        browser
        .setValue("//input[@name='brbdAcceptanceVO.phCertiCode']", id1)//要保人ID
        .setValue("//input[@name='brbdAcceptanceVO.insuredCertiCode']", id1)//要保人=被保人
        .getAttribute("//input[@name='brbdAcceptanceVO.insuredCertiCode']", "value" ,function(result){
        writeStream.write(result.value+',')
        })
    	  .setValue("//input[@name='brbdAcceptanceVO.productId_text']", jsonArray[i]['code'])
        .getAttribute("//input[@name='brbdAcceptanceVO.productId_text']", "value" ,function(result){
        writeStream.write(result.value+',')
        })
    	  .setValue("//input[@name='brbdAcceptanceVO.registerCode']", jsonArray[i]['login'])
    	  .setValue("//input[@name='brbdAcceptanceVO.acptOrg_text']", '')
    	  .click("//input[@name='save']") 

  	  	//Distribute to fill new
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=DetailRegistration&taskId=6')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(2000)
  	  	.click("//tr[@classname='odd']/td[@classname='table_column odd']")
  	  	.click("//input[@name='btnReassign']")
        .pause(2000)
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

  	  	//fill new 
        .useXpath()
  	  	.url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=DetailRegistration&taskId=6&syskey_request_token=731f379c24509368cbc25acba4e853c5')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(2000)
  	  	.click("//tr[@classname='odd']/td[@classname='table_column odd']")
  	  	.click("//input[@name='claim']")
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
  	  	.frame('MasterPolicy')
  	  	.frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)  
  	  	.setValue("//input[@name='applyVersion']", jsonArray[i]['version']) 
  	  	.setValue("//input[@name='applyDate_minguo']", jsonArray[i]['date']) 
  	  	.click("//input[@name='rowid']") 
  	  	.click("//input[@name='__btnModify']")

  	  	// Insurance Person 
        var name1 = ('Kobe'+Math.floor((Math.random() * 1000000) + 1));
        browser
        .setValue("//input[@name='policyHolderName']", name1)
        .setValue("//input[@name='policyHolderBirthDay_minguo']", jsonArray[i]['birthDay'])
        .setValue("//input[@name='policyHolderGender_text']", '1')
        .setValue("//input[@name='policyHolderJobCateId_text']", 'A101')
        .setValue("//input[@name='policyHolderJobClass']", '1')
        .setValue("//textarea[@name='policyHolderAddrAddress1']", 'tester')
        .click("//input[@name='insured.relationToPH_text']", function(){browser.dismiss_alert()})
        .setValue("//input[@name='insured.relationToPH_text']", '0')
        .setValue("//input[@name='insured.marriageId_text']", '1')
        .click("//input[@name='__btnSave']")
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
        .pause(1000) 
  	  	.setValue("//input[@name='coverage.initialType_text']", jsonArray[i]['payway'])
        .pause(1000)

            
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          browser
          // Fill initial Type and then fill chargePeriod and chargeYear
          .isVisible("//input[@name='coverage.chargePeriod_text']", function(result){
            console.log(result.vaule + "chargePeriod_text")
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.initialType_text']" ,'value', function(result){
                if (result.value =='00'){} else {
                  browser
                  .setValue("//input[@name='coverage.chargePeriod_text']", jsonArray[i]['chargePeriod_text'])
                  .setValue("//input[@name='coverage.chargeYear']", jsonArray[i]['chargeYear'])
                  console.log('coverage.chargePeriod_text' + result.value + i)
                }
              })
            } else if (result.value =='undefined') {}
          })

          // Guarantee charge year
          .isVisible("//input[@name='coverage.coveragePeriod']", function(result){
            console.log(result.value + "coverage.coveragePeriod")
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.coverageYear']", 'class' ,function(result){
               if (result.value =='textfiled_ro textfield_null ro right readOnly'){} else {
                  browser
                  .setValue("//input[@name='coverage.coveragePeriod']", jsonArray[i]['coveragePeriod'])
                  .setValue("//input[@name='coverage.coverageYear']", jsonArray[i]['coverageYear'])
                  console.log('coveragePeriod' + result.value + i)
                }
              })
            }
          })

          // Fill coverage or plan or unit
          .isVisible("//input[@name='coverage.amount']", function(result){
            console.log(result.value + "coverage.amount")
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.amount']", "class" ,function(result){
              console.log("amount" + result.value)
               if (result.value =='textfiled textfield_null right readOnly ro'){} 
              else {
              browser
                .click("//input[@name='coverage.amount']")
                .pause(1000)
                .setValue("//input[@name='coverage.amount']", jsonArray[i]['getamount'])
              }
            })}
          })

          .isVisible("//input[@name='coverage.benefitLevel']", function(result){
            console.log(result.value + "bene")
            if (result.value == true) {
            browser
            .getAttribute("//input[@name='coverage.benefitLevel']", "class" ,function(result){
             if (result.value =='textfiled textfield_null readOnly ro'){} 
              else {
              browser
                .setValue("//input[@name='coverage.benefitLevel']", jsonArray[i]['plan'])
              }
            })}
          })
          
          .isVisible("//input[@name='coverage.unit']", function(result){
            console.log(result.vaule + "coverage.unit")
            if (result.value == true) {
            browser
            .getAttribute("//input[@name='coverage.unit']", "class" ,function(result){
              console.log('coverage.unit'+i)
             if (result.value =='textfiled textfield_null right readOnly ro'){} 
              else {
              browser
                .setValue("//input[@name='coverage.unit']", jsonArray[i]['unit'])
                console.log('coverage.unit'+i)
              }
            })}
          })

          //payamount
         
          .isVisible("//input[@name='coverage.stdPremAf']", function(result){
            console.log(result.vaule + "coverage.unit" + i)
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.stdPremAf']", "class" ,function(result){
                console.log('coverage.stdPremAf'+result.value)
               if (result.value =='textfiled textfield_null right readOnly ro'){
                browser
                  .setValue("(//input[@name='coverage.stdPremAf'])[position()=2]", jsonArray[i]['payamount'])
                } else {
                browser
                  .setValue("//input[@name='coverage.stdPremAf']", jsonArray[i]['payamount'])
                }
              })
            }
          })

          //customized payamount
          .isVisible("//input[@name='coverage.customizedPrem']", function(result){
            console.log(result.vaule +'coverage.customizedPrem'+i)
            if (result.value == true) {
             browser 
             .getAttribute("//input[@name='coverage.customizedPrem']", "readyOnly" ,function(result){
              if (result.value ==''){
             browser   
                .setValue("//input[@name='coverage.customizedPrem']", jsonArray[i]['customizedPrem'])
                console.log('coverage.customizedPrem'+i)
                }
              })
            }
          })


         // flexible payamount
          .isVisible("//input[@name='coverage.applyAmount']", function(result){
            console.log(result.vaule +'coverage.applyAmount'+i)
            if (result.value == true) {
              browser 
              .getAttribute("//input[@name='coverage.applyAmount']", "readyOnly" ,function(result){
              if (result.value ==''){
             browser
                .setValue("//input[@name='coverage.applyAmount']", jsonArray[i]['flexible'])
                console.log('coverage.applyAmount'+i)
                }
              })
            }
          })

          //important thing
          .isVisible("//input[@name='coverage.agreeReadIndi_text']", function(result){
            console.log(result.vaule +'coverage.agreeReadIndi_text'+i)
            if (result.value == true) {
            browser
             .setValue("//input[@name='coverage.agreeReadIndi_text']", '1')
             console.log('coverage.agreeReadIndi_text'+i)
            }
          })

          // annual getamount
          .isVisible("//input[@name='coverage.payYear']", function(result){
            console.log(result.vaule +'coverage.payYear'+i)
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.payYear']", "class" ,function(result){
                console.log('coverage.chargePeriod_text'+i)
               if (result.value =='textfiled textfield_null right readOnly ro'){} else {
                browser
                  .clearValue("//input[@name='coverage.payYear']")
                  .pause(1000)
                  .setValue("//input[@name='coverage.payYear']", '70')
                }
              })
            }
          })

          // payType_text
          .isVisible("//input[@name='coverage.payType_text']", function(result){
            console.log(result.vaule +'coverage.payYear'+i)
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.payType_text']", "class" ,function(result){
               if (result.value =='textfiled textfield_null readOnly ro'){} else {
                browser
                  .clearValue("//input[@name='coverage.payType_text']")
                  .setValue("//input[@name='coverage.payType_text']", jsonArray[i]['paytype'])
                  console.log('coverage.payType_text'+i)
                }
              })
            }
          })

          // payEnsure
          .isVisible("//input[@name='coverage.payEnsure']", function(result){
            console.log(result.vaule +'coverage.payYear'+i)
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.payEnsure']", "class" ,function(result){
               if (result.value =='textfiled textfield_null right readOnly ro'){} else {
                browser
                 .setValue("//input[@name='coverage.payEnsure']", '10')
                }
              })
            }
          })


          .isVisible("//input[@name='coverage.instalmentAmount']", function(result){
            console.log(result.vaule +'coverage.instalmentAmount'+i)
            if (result.value == true) {
              browser
              .getAttribute("//input[@name='coverage.instalmentAmount']", "class" ,function(result){
                 if (result.value =='textfiled textfield_null right readOnly ro'){} else {
                  browser
                   .setValue("//input[@name='coverage.instalmentAmount']", jsonArray[i]['annualmoney'])
                }
              })
            }
          })

        },false)}(i)

        browser
        .getAttribute("//input[@name='coverage.internalId']", "value" ,function(result){
          if(result.value == 'RVA'|| result.value == 'VNA'){
              browser
              .click("(//input[@name='__btnSave'])[position()=2]")
              .click("(//input[@name='__btnSave'])[position()=2]")
              .click("(//input[@name='__btnSave'])[position()=2]")
            }else{
            browser
            .click("(//input[@name='__btnSave'])[position()=2]")
            .click("(//input[@name='__btnSave'])[position()=2]")
            }
          })  
        

        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)

        // fill the insurance data over


        // add additional product 
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k=0;k<2;k++){
            !function outer(k) { 
                if (jsonArray[i]['addcode'+k] == "") {} else { 
                  console.log('addcode'+i+k)
                  browser
                  .setValue("//input[@name='coverage.internalId']", jsonArray[i]['addcode'+k])
                  .click("//input[@id='proposalCategory001']")
                  .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                  .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                  .pause(1000)          
                    .getAttribute("//input[@name='coverage.initialType_text']", "value" ,function(result){
                      console.log('addcode'+result.value)
                     if (result.value == '00'){
                      browser
                      click("//input[@name='coverage.nhiInsuIndi_text']")
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

        //T_fund setting
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          for (k = 0; k < 3 ; k ++) {
            !function outer(k) { 
              browser
              .isVisible("//input[@name='investRate.fundCode']", function(result){
                console.log('fundCode'+i+k+result.value)
                  if (result.value == true) {
                      if (jsonArray[i]['fundcode'+k] == "") {} else {  
                      browser
                      .setValue("//input[@name='investRate.fundCode']", jsonArray[i]['fundcode'+k])
                      .setValue("//input[@name='investRate.assignRate']", jsonArray[i]['ratio'+k])
                      .click("(//input[@name='__btnSave'])[position()=3]")
                      .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                      .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                      .pause(1000)
                      }
                  }
              })
            }(k)
          }
        },false)}(i)       
        //t_fund over

        //paymode
        browser
        .pause(1000)
        .setValue("//input[@name='payMode_text']", '3')
        .pause(1000)
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){
          browser
          .getAttribute("//input[@name='payNext_text']", "class" ,function(result){
            console.log('payNext_text'+result.value)
            if (result.value =='textfiled textfield_null right readOnly ro'){} else {
              browser
               .setValue("//input[@name='payNext_text']", '3')
               .pause(1000)
              }
          })

          .getAttribute("//input[@name='aplPermit_text']", "class" ,function(result){
             if (result.value =='textfiled textfield_null right readOnly ro'){} else {
              browser
               .setValue("//input[@name='aplPermit_text']", '2')
               .pause(1000)
            }
          })
        },false)}(i)   

        //benificial person
        browser
        .setValue("//input[@name='bene.nbBeneficiaryType']", jsonArray[i]['benefitperson'])
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
        .isVisible("//input[@name='insured.height']", function(){
          browser
            .setValue("//input[@name='insured.height']", '180')
            .pause(1000)
        })
        .isVisible("//input[@name='insured.weight']", function(){
          browser
            .setValue("//input[@name='insured.weight']", '70')
            .pause(1000)
        })
        .isVisible("//input[@name='insured.notifyIndi_text']", function(){
          browser
            .setValue("//input[@name='insured.notifyIndi_text']", '2')
            .pause(1000)
        })
        .isVisible("(//input[@name='__btnSave'])[position()=5]", function(){
          browser
            .click("(//input[@name='__btnSave'])[position()=5]")
            .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
            .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
            .pause(1000)
        })

        //rest data
        .setValue("//input[@name='otherCheckIndi_text']", '1')
        .setValue("//input[@name='singCompleteIndi_text']", '1')
        .setValue("//input[@name='userConfirmIndi_text']", '1')
        .click("(//input[@name='docType'])[position()=3]")
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
        .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
        .pause(1000)

        //fatca
        .setValue("//input[@name='fatcaNationality_text']", '香港')
        .setValue("//input[@name='fatcaBirthPlace']", '2')
        .setValue("//input[@name='fatcaIdentityStatement_text']", 'A')
        .setValue("//input[@name='fatcaVersion']", '1')

        // trad claim
        !function outer(i) { browser
          .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){ browser
            .isVisible("//input[@name='review.internalId']", function(result){
              console.log('internalId'+result.value)
                if (result.value == true) { browser
                  .getAttribute("//input[@name='review.internalId']", 'class' ,function(result){
                    console.log('internalId'+result.value)
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
                } else{}
            })
        },false)}(i)        


        // trad claim 
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
                      .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
                      .waitForElementPresent("(//input[@name='__btnSave'])[position()=3]", 30000)
                    }
                  })
                }
            }(k)
          }
        },false)}(i)

        browser
    		.click("//input[@name='btnSubmit']", function(){browser.accept_alert()})
    		.waitForElementPresent("//div[@classname='header_logo_ls']", 30000)



    		// distribute to confirm
    		.url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=Verification&taskId=10')
      	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']/td[@classname='table_column odd']")
  	  	.click("//input[@name='btnReassign']")
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 

  	  	// turn to confirm
  	  	.url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=Verification&taskId=10&syskey_request_token=752ba247eba263311fb36ec58db42536')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']/td[@classname='table_column odd']")
  	  	.click("//input[@name='claim']")
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
  	  	.waitForElementPresent("//iframe[@name='MasterPolicy']", 30000)
  	  	.frame('MasterPolicy')
  	  	.frame('mainfr')
        .waitForElementNotPresent("//div[@classname='maskdivgen']",100000)
  	  	.waitForElementPresent("//input[@name='btnSubmit']", 30000)
  	  	.pause(3000)
  	  	.click("//input[@name='btnSubmit']" , function(){browser.accept_alert()})
  	  	.waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 

  	  	// distribute to manual confirmation
  	  	.url('http://210.13.77.85:12000/ls/pub/taskmonitor/taskReassignMain.do?procName=PA Process&taskName=ManualUW&taskId=8')
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
  	  	.setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
  	  	.click("//input[@name='search']")
  	  	.waitForElementPresent("//tr[@classname='odd']", 10000)
        .pause(3000)
  	  	.click("//tr[@classname='odd']/td[@classname='table_column odd']")
  	  	.click("//input[@name='btnReassign']")
  	  	.waitForElementPresent("//input[@name='userId']", 10000)
  	  	.click("//input[@name='userId']")
  	  	.click("//input[@classname='button btn']")
  	  	.waitForElementPresent("//input[@classname='textfield_null text1']", 10000) 



        // Pay money
        .useXpath()
        .url('http://210.13.77.85:12000/ls/arap/cash/recv/counter/search.do?syskey_request_token=752ba247eba263311fb36ec58db42536&current_module_id=300168')
        .waitForElementPresent("//input[@classname='button btn']", 30000) 
        .setValue("//input[@name='policyNumber']", jsonArray[i]['number'])
        .click("//input[@classname='button btn']")
        .waitForElementPresent("(//input[@classname='button btn'])[position()=1]", 30000) 
        !function outer(i) { browser
        .elementIdDisplayed("//input[@name='coverage.stdPremAf']", function(){ 
          if (jsonArray[i]['pay'] == 2){ browser
            .setValue("//input[@name='payMode_text']", jsonArray[i]['pay'])
            .click("//input[@name='voucherDate_minguo']")
            .pause(2000)
            .setValue("//input[@name='voucherDate_minguo']", jsonArray[i]['date'])
            .click("//select[@name='account']")
            .keys(['\uE015', '\uE006'])
            .setValue("//input[@name='creditCardNo_part0']", '5410')
            .setValue("//input[@name='creditCardNo_part1']", '0001')
            .setValue("//input[@name='creditCardNo_part2']", '1349')
            .setValue("//input[@name='creditCardNo_part3']", '4290')
            .setValue("//input[@name='creditCardNote']", '3688')
            .setValue("//input[@name='creditValidYyyymm_Yyyy']", '2024')
            .setValue("//input[@name='creditValidYyyymm_Mm']", '10')

          } else if (jsonArray[i]['pay'] == 6){ browser
            .setValue("//input[@name='payMode_text']", jsonArray[i]['pay'])
            .click("//input[@name='voucherDate_minguo']")
            .pause(2000)
            .setValue("//input[@name='chequeNumber']", '2100004')
            .setValue("//input[@name='chequePayUnit']", '010050061')
            .setValue("//input[@name='chequeAccount']", '232168223001')
            .setValue("//input[@name='chequeDueDate_1_minguo']", jsonArray[i]['date'])
            .setValue("//input[@name='chequeHolder']", '4290')
            .click("//select[@name='chequeRelationId']")
            .keys(['\uE015', '\uE006'])

          } else if (jsonArray[i]['pay'] == 3){ browser 
            .setValue("//input[@name='payMode_text']", jsonArray[i]['pay'])
            .click("//input[@name='voucherDate_minguo']")
            .pause(2000)
            .setValue("//input[@name='voucherDate_minguo']", jsonArray[i]['date'])
            .click("//select[@name='account']")
            .keys(['\uE015', '\uE006'])
            .click("//input[@name='sameToProposerCheck']")


          } else { browser 
            .setValue("//input[@name='payMode_text']", jsonArray[i]['pay'])
            .click("//input[@name='voucherDate_minguo']")
            .pause(2000)
            .setValue("//input[@name='voucherDate_minguo']", jsonArray[i]['date'])
            .click("//select[@name='account']")
            .keys(['\uE015', '\uE006'])
          }

          browser 
          .getAttribute("//input[@name='totalIP']", "value" ,function(result){
            if(result.value == '0') {writeStream.write('0'+',')}  else {
              var money = result.value
              money = money.replace(/,/g,"")
              writeStream.write(money+',')
            }
            if (jsonArray[i]['pay'] == 6){
            browser
            .setValue("//input[@name='pay_amount']",result.value)
            .setValue("//input[@name='chequeAmount']",result.value)
            } else {
              browser
              .setValue("//input[@name='pay_amount']",result.value)
              .setValue("//input[@name='voucherAmount']",result.value)
            }
          })
        },false)}(i)

        browser 
        .click("(//input[@classname='button btn'])[position()=1]")
        .waitForElementPresent("//table[@id='table2']", 30000)
        .click("(//input[@classname='button btn'])[position()=3]")
        .click("(//input[@classname='button btn'])[position()=4]")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 30000) 
        .saveScreenshot('./data/invest/' +jsonArray[i]['number']+'payamount.png')


        // turn to manual confirmation
        .url('http://210.13.77.85:12000/ls/pub/workflow/GetWorkList.do?procName=PA Process&taskName=ManualUW&taskId=8&syskey_request_token=752ba247eba263311fb36ec58db42536')
        .waitForElementPresent("//input[@classname='textfield_null text1']", 10000)
        .setValue("//input[@classname='textfield_null text1']", jsonArray[i]['number'])
        .click("//input[@name='search']")
        .waitForElementVisible("//tr[@classname='odd']", 10000)
        .pause(3000)
        .click("//tr[@classname='odd']/td[@classname='table_column odd']")
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

        // Check
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
        .getText("(//td[@classname='table_text_td'])[position()=3]//div[@classname='input']",function(result){
          writeStream.write(result.value)
        })
        .saveScreenshot('./data/all/' +jsonArray[i]['number']+'search.png')

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