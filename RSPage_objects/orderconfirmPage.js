const { test, expect } = require('@playwright/test');
class OrderConfirmPage {
    constructor(page) {
        this.page = page;
        this.confirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        this.ordersPagelink = page.locator("button[routerlink*='myorders']")


    }

    async validatingOrders() {

        await expect(this.confirmationText).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderId.textContent();
        return orderId;
    }

    async goToOrders() {
        // clicking orders button
        await this.ordersPagelink.click()
    }
}

module.exports = { OrderConfirmPage }
