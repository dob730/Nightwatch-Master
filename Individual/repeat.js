// Converter Class 
var fs = require('fs');
var Converter = require("csvtojson").Converter;
//store csv
var converter = new Converter({});

module.exports = {
	'Repeat':  function (browser) {
		browser
		.useCss()
        .url('http://210.13.77.85:12000/ls/logoutPage.do')
        .waitForElementPresent('body', 30000)
        .setValue('input[name=userName]', 'IBM6')
        .clearValue('input[name=userPassword]')
        .setValue('input[name=userPassword]', 'eBao123')
        .click('input[name=Submit2]')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000) 
        .url('http://210.13.77.85:12000/ls/fnd/toApprovalFundPrice.do?syskey_request_token=43a7d9e539721c08e725d07b4ffddcd2&current_module_id=993398')
        .waitForElementPresent('div[classname=header_logo_ls]', 10000) 
        .pause(1000)

        .useXpath()
        .clearValue("//input[@name='priceEntryDate_minguo']")
        .setValue("//input[@name='priceEntryDate_minguo']", '1200101')
        .click("//select[@name='searchPriceStatus']/option[@value='1']")
        .click("//input[@classname='button btn']")
        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
        .pause(1000)
        for (var i=0; i <15000; i ++) {
        	browser
        		.click("//input[@name='all']")
        		.pause(1000)
        		.click("//input[@name='Submit22']")
		        .waitForElementPresent("//div[@classname='header_logo_ls']", 10000) 
		        .pause(1000)
        }
}}