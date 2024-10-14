const { test, expect } = require('@playwright/test');
class OrderHistoryPage {

  constructor(page) {
    this.page = page
    this.table = page.locator("tbody")
    this.rows = page.locator("tbody tr")
    this.orderidDetails = page.locator(".col-text")
  }

  async checkingOrderId(orderid) {
    await this.table.waitFor();
    // const rows = page.locator("tbody tr");
    for (let i = 0; i < await this.rows.count(); i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderid.includes(rowOrderId)) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }

  }

  async getOrderId() {
    return await this.orderidDetails.textContent();

  }
}

module.exports = { OrderHistoryPage }