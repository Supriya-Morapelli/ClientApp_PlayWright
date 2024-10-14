const { LoginPage } = require('../RSPage_objects/loginpage')
const { DashBoardPage } = require('../RSPage_objects/dashboardPage')
const { CartPage } = require('../RSPage_objects/cartPage')
const { OrderReviewPage } = require('../RSPage_objects/placeTheOrde')
const { OrderConfirmPage } = require('../RSPage_objects/orderconfirmPage')
const { OrderHistoryPage } = require('../RSPage_objects/orderHistoryPage')



class POManager {

    constructor(page) {
        this.page = page
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashBoardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.orderreviewpage = new OrderReviewPage(this.page)
        this.confirmationpage = new OrderConfirmPage(this.page)
        this.orderhistory = new OrderHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginpage;
    }
    getDashboardPage() {
        return this.dashboardpage;
    }
    getCartPage() {
        return this.cartpage;
    }
    getOrderReviewPage() {
        return this.orderreviewpage;
    }
    getConfirmationPage() {
        return this.confirmationpage;
    }
    getOrderHistoryPage() {
        return this.orderhistory;
    }


}

module.exports = { POManager }