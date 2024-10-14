const base=require('@playwright/test')
 
exports.customtest=base.test.extend(
    {
testDataForOrder:{
    "username" : "supriya2001@gmail.com",
    "pass": "Supriya@2001",
    "productName":"ADIDAS ORIGINAL"
 
  }
    }
)