const { test, expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.signInBtn = page.locator("input#login");


    }
    async goToPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/");

    }
    async validLogIn(username, pass) {

        await this.userName.fill(username);
        await this.password.fill(pass);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState("load");
    }
}

module.exports = { LoginPage }