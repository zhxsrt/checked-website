const puppeteer = require('puppeteer');

module.exports = async (options) => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        args: [
            '--disable-gpu', // GPU硬件加速  
            '--disable-dev-shm-usage', // 创建临时文件共享内存  
            '--disable-setuid-sandbox', // uid沙盒  
            '--no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。  
            '--no-sandbox', // 沙盒模式  
            '--no-zygote',
            '--single-process' // 单进程运行    
        ],
        slowMo: 15
    });
    const page = await browser.newPage();
    await page.setUserAgent(options.userAgent);
    await page.setViewport({
        width: 768,
        height: 1024,
        deviceScaleFactor: 1,
    });
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')) //|| interceptedRequest.url().endsWith('.css'))
            interceptedRequest.abort();
        else
            interceptedRequest.continue();
    });
    await page.setCookie(...options.cookies);
    await page.goto(...options.goto);
    //await page.waitForSelector(options.selector);
    //await page.tap(options.selector);
    await page.screenshot({ path: "test.png" });
    await page.close();
    await browser.close();
}
