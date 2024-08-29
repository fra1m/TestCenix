import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	const [url, region] = process.argv.slice(2);

	if (!url || !region) {
		console.error('Usage: node index.js <url> "<region>"');
		process.exit(1);
	}

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	// Установка пользовательского агента для десктопной версии сайта
	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36'
	);

	// Установка размеров окна для десктопной версии сайта
	await page.setViewport({ width: 1280, height: 800 });

	try {
		await page.goto(url, { waitUntil: 'domcontentloaded' });
		await wait(5000);

		await page.click('.Region_regionIcon__oZ0Rt');
		await wait(5000);

		const regionSelector = await page.evaluate(async region => {
			const regions = Array.from(
				document.querySelectorAll(
					'.UiRegionListBase_item___ly_A.UiRegionListBase_bold__ezwq4'
				)
			);
			const targetRegion = regions.find(el => el.textContent.includes(region));
			if (!targetRegion) {
				return false;
			}
			targetRegion.click();

			return true;
		}, region);

		if (!regionSelector) {
			throw new Error(`Region "${region}" not found`);
		}
		await wait(5000);

		const productName = await page.evaluate(() => {
			const titleElement = document.querySelector('.Title_title__nvodu'); // Пример, возможно, вам нужно будет изменить селектор
			return titleElement ? titleElement.textContent.trim() : 'unknown-product';
		});

		const productFolder = path.join(__dirname, 'static', productName);
		if (!fs.existsSync(productFolder)) {
			fs.mkdirSync(productFolder, { recursive: true });
		}

		const screenshotPath = path.join(productFolder, 'screenshot.jpg');
		await page.screenshot({ path: screenshotPath, fullPage: true });
		await wait(5000);

		const productInfo = await page.evaluate(() => {
			const prices =
				document
					.querySelector(
						'.Price_price__QzA8L.Price_size_XL__MHvC1.Price_role_discount__l_tpE'
					)
					?.textContent.trim() || 'No price';
			const priceOld =
				document
					.querySelector(
						'.Price_price__QzA8L.Price_size_XS__ESEhJ.Price_role_old__r1uT1'
					)
					?.textContent.trim() || 'No priceOld';
			const rating =
				document
					.querySelector('.ActionsRow_stars__EKt42')
					?.textContent.trim() || 'No rating';
			const reviewCount =
				document
					.querySelector('.ActionsRow_reviews__AfSj_')
					?.textContent.trim() || 'No rating';

			return {
				prices,
				priceOld,
				rating,
				reviewCount,
			};
		});

		const dataToSave = `
Prices: ${productInfo.prices}
PriceOld: ${productInfo.priceOld}
Rating: ${productInfo.rating}
ReviewCount: ${productInfo.reviewCount}
        `;
		const infoFilePath = path.join(productFolder, 'product.txt');
		fs.writeFileSync(infoFilePath, dataToSave.trim());

		console.log('Data saved to product.txt and screenshot.jpg');
	} catch (err) {
		console.error('Error:', err.message);
	} finally {
		await browser.close();
	}
})();
