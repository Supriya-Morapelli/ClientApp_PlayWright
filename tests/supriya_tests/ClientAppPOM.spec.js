const { test, expect } = require('@playwright/test');
const { POManager } = require('../../RSPage_objects/POManager');
const { customtest } = require('../../test_data/test-base')
//json->string->js object
const testdata = JSON.parse(JSON.stringify(require('../../test_data/clientApp.json')));


for (const data of testdata) {
    test.only(`client app ${data.productName}`, async ({ page }) => {

        const pomManager = new POManager(page);
        const loginpage = pomManager.getLoginPage();
        await loginpage.goToPage();
        await loginpage.validLogIn(data.username, data.pass)

        const dashboardpage = pomManager.getDashboardPage();
        await dashboardpage.searchItem(data.productName);
        await dashboardpage.gotoCart();

        const cartpage = pomManager.getCartPage();
        await cartpage.verifyProductIsDisplayed(data.productName);
        await cartpage.checkOut();
        

        const orderreviewpage = pomManager.getOrderReviewPage()
        await orderreviewpage.searchAndSelectCountry("ind", "India")
        await orderreviewpage.assertingmailId(data.username);
        await orderreviewpage.placingOrder();

        const confirmationpage = pomManager.getConfirmationPage();
        const orderid = await confirmationpage.validatingOrders();
        console.log(orderid)
        await confirmationpage.goToOrders();


        const orderhistory = pomManager.getOrderHistoryPage()
        await orderhistory.checkingOrderId(orderid)
        const orderdetailsid = await orderhistory.getOrderId();
        expect(orderid.includes(orderdetailsid)).toBeTruthy();


    })
}

customtest('client app custom test @Web', async ({ page, testDataForOrder }) => {

    const pomManager = new POManager(page);
    const loginpage = pomManager.getLoginPage();
    await loginpage.goToPage();
    await loginpage.validLogIn(testDataForOrder.username, testDataForOrder.pass)

    const dashboardpage = pomManager.getDashboardPage();
    await dashboardpage.searchItem(testDataForOrder.productName);
    await dashboardpage.gotoCart();

    const cartpage = pomManager.getCartPage();
    await cartpage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartpage.checkOut();

    const orderreviewpage = pomManager.getOrderReviewPage()
    await orderreviewpage.searchAndSelectCountry("ind", "India")
    await orderreviewpage.assertingmailId(testDataForOrder.username);
    await orderreviewpage.placingOrder();

    const confirmationpage = pomManager.getConfirmationPage();
    const orderid = await confirmationpage.validatingOrders();
    console.log(orderid)
    await confirmationpage.goToOrders();


    const orderhistory = pomManager.getOrderHistoryPage()
    await orderhistory.checkingOrderId(orderid)
    const orderdetailsid = await orderhistory.getOrderId();
    expect(orderid.includes(orderdetailsid)).toBeTruthy();


})
