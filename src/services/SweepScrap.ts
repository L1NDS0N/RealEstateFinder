import puppeteer from 'puppeteer';

// Fazer verificação no controller, pra não receber nulo e travar no scraping
// important: lib: "dom"
async function Sweeping() {
  const xpath_expression = '//*[@id="ad-list"]/li/a[@href]';
  const url =
    'https://rn.olx.com.br/rio-grande-do-norte/outras-cidades/sao-goncalo-do-amarante/imoveis';

  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(url);
  await page.waitForXPath(xpath_expression);
  const links = await page.$x(xpath_expression);
  const link_urls = await page.evaluate((...links) => {
    return links.map(e => e.href);
  }, ...links);
  console.log(link_urls);

  await browser.close();
}
Sweeping();

export { Sweeping };
