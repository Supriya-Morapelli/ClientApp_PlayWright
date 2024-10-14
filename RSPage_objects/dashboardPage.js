const { test, expect } = require('@playwright/test');
class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cartbtn=page.locator("[routerlink*=cart]")

    }

    async searchItem(productName) {
        await this.productText.first().textContent();
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }

        }
    }

    async gotoCart() {
        await this.cartbtn.click()
       
    }
}
module.exports = { DashBoardPage }