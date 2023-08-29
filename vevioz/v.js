const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: "new",
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page = await browser.newPage();
	await page.goto('https://api.vevioz.com/apis/button/mp3?url=https:%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmYHPnqa7B3Y', { waitUntil: "domcontentloaded"
	});
	
	page.setExtraHTTPHeaders({
		'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) (yt-search; https://www.npmjs.com/package/yt-search)',
		'x-requested-by': 'XMLHttpRequest'
	});
	const body = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('div')).map(e => e.outerHTML);
	});
	
	console.log(body);
	
	await browser.close();
})();
