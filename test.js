const cookies = require("./test/smzdm");
//const ua = require('../ueragent');
const page = require("./util.js");


page({
    userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36",
    cookies,
    goto: ["https://www.smzdm.com", {
        timeout: 60 * 10000,
        waitUntil: [
            "load",
            "domcontentloaded",
            "networkidle0",
            "networkidle2"
        ]
    }],
    seletor: ".J_punch"
})