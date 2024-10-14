  const{test,expect}=require('@playwright/test');
  
  
  test('client app ',async ({page})=>{
      const productName="ADIDAS ORIGINAL";
      const email="supriya2001@gmail.com"
      const products=await page.locator(".card-body");
      await page.goto("https://rahulshettyacademy.com/client/");
      await page.locator("#userEmail").fill(email);
      await page.locator("#userPassword").fill("Supriya@2001");
      await page.locator("input#login").click();
      await page.waitForLoadState('networkidle');
      //await page.locator(".card-body b").first().textContent();
      const titles=await page.locator(".card-body b").allTextContents();
      console.log(titles);
  
      // for(const title of titles){
      //     if(title===productName){
      //         await page.locator("text= Add To Cart").click();
      //         break;
      //     }}
    // here we cant able to use for of loop
  //selecting product and adding to cart
    const count=await products.count();
  
    for(let i=0;i<count;i++){
      if(await products.nth(i).locator("b").textContent()===productName){
          await products.nth(i).locator('text= Add To Cart').click();
          break;
      }
  
    }
    await page.locator("[routerlink*=cart]").click()
    //waiting for cart list to appear and asserting the added product
    await page.locator(".cart").waitFor();
    const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    //clicking checkout button
    await page.locator("text=Checkout").click();
    //selecting country auto suggestive dropdown. Navigating through the list and selecting particular country
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount=await dropdown.locator("button").count();
    for(let i=0;i<optionCount;i++){
      const text=await dropdown.locator("button").nth(i).textContent();
      if(text===' India'){
          await dropdown.locator("button").nth(i).click();
          break;
      }
    }
    //await page.pause();
    //asserting the mail id
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    //placing the order
    await page.locator("text=Place Order ").click();
    //veryfying the success message and printing the order id on console.
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
  // clicking orders button
    await page.locator("button[routerlink*='myorders']").click();
    //waiting for orders table to locate
    await page.locator("tbody").waitFor();
    const rows= page.locator("tbody tr");
    for(let i=0;i<await rows.count();i++){
      const rowOrderId=await rows.nth(i).locator("th").textContent();
      if(orderId.includes(rowOrderId)){
          await rows.nth(i).locator("button").first().click();
          break;
      }
    }
    const orderidDetails=await page.locator(".col-text").textContent();
    expect(orderId.includes(orderidDetails)).toBeTruthy();
    //
  
    
  
  
  
  })