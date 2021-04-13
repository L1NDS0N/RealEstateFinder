import { Pesquisa } from '.prisma/client';
import puppeteer from 'puppeteer';

// Fazer verificação no controller, pra não receber nulo e travar no scraping
// important: lib: "dom"
async function Sweeping(pesquisa: Pesquisa) {
  const xpath_expression = '//*[@id="ad-list"]/li/a[@href]';
  const browser = await puppeteer.launch();
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

export { Sweeping };
