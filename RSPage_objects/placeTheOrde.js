const { test, expect } = require('@playwright/test');
class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first()
        this.placeOrder = page.locator("text=Place Order ")


    }

    async searchAndSelectCountry(countryCode, countryName) {
        await this.country.pressSequentially(countryCode);
        //const dropdown = page.locator(".ta-results");
        await this.dropdown.waitFor();
        const optionCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async assertingmailId(username) {
        await expect(this.emailId).toHaveText(username);

    }
    async placingOrder() {
        await this.placeOrder.click();
    }



}

module.exports = { OrderReviewPage }