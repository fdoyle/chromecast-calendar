const puppeteer = require('puppeteer');
const fs = require('fs');

exports.generateImage = async (titleText, startText, imageUrl) => {
    console.log(`Creating image ${titleText} ${startText}`);
    const browser = await puppeteer.launch({
        'args': ['--disable-web-security'],
    });
    const page = await browser.newPage();
    const contentHtml = fs.readFileSync('./event.html', 'utf8');
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    const loaded = page.waitForNavigation({
        waitUntil: 'networkidle0'
    });
    await page.setContent(contentHtml);
    await page.evaluate((titleText, startText, imageUrl) => {
        let image = document.querySelector('#image');
        image.src = imageUrl;
        let title = document.querySelector('#title');
        title.innerHTML = titleText;
        let date = document.querySelector('#date');
        date.innerHTML = startText;
    }, titleText, startText, imageUrl);
    await loaded
    const underscoredTitle = titleText.replace(/ /g, "_");
    filename = `${underscoredTitle}.png`
    const path = `images/${filename}`
    await page.screenshot({
        path: path
    });
    await browser.close();
    return {
        path: path,
        filename: filename
    };
}