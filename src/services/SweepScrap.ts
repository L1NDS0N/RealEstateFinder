import { Pesquisa } from '.prisma/client';
import puppeteer from 'puppeteer';

// Fazer verificação no controller, pra não receber nulo e travar no scraping
// important: lib: "dom"
async function Sweeping(pesquisa: Pesquisa) {
  const xpath_expression = '//*[@id="ad-list"]/li/a[@href]';
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(pesquisa.url || '');
  await page.waitForXPath(xpath_expression);
  const links = await page.$x(xpath_expression);
  const link_urls = await page.evaluate((...links) => {
    return links.map(e => e.href);
  }, ...links);
  console.warn('🔠 data sucessful pulled right now ');
  await browser.close();
  return link_urls;
}

async function ScrapPage(links: any) {
  const xpath_valor = "//div[@class='h3us20-4 iThXCX']//h2";
  const xpath_quartos =
    "//div[contains(@class, 'duvuxf-0')][4]/div[contains(@class, 'sc-hmzhuo')]/a[contains(@class, 'sc-57pm5w-0')]";

  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });

  for await (const link of links) {
    const page = await browser.newPage();
    await page.goto(link.href);
    // await page.waitForXPath(xpath_quartos);
    // await page.waitForXPath(xpath_valor);
    // await page.$x(xpath_quartos && xpath_valor);
    await page.close();
  }

  console.log('sai da função');
  await browser.close();
}

export { Sweeping, ScrapPage };
