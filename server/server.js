require('dotenv').config();
const fs = require('fs'),
      request = require('request'),
      cheerio = require('cheerio'),
      pageURL = 'http://www.themutinychicago.com/',
      host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
      port = process.env.PORT || 8080,
      cors_proxy = require('cors-anywhere'),
      // twilio = require('twilio'),
      // client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
      Storage = require('node-storage'),
      store = new Storage(__dirname + "/data/scrapedData.js"),
      // origPrice = null;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

function scrapePage() {
  return new Promise( (resolve, reject) => {
    //make an HTTP request for the page to be scraped
    request(`http://localhost:${port}/${pageURL}`, (error, response, responseHtml) => {
      if (error) { console.log("error", error); reject(); };
      //write the entire scraped page to the local file system
      fs.writeFile(__dirname + '/html/scrapedPage.html', responseHtml, (err) => {
          if (err) console.log("error in write file", err);
          console.log('entire-page.html successfully written to HTML folder');
          resolve(responseHtml)
      })
    })
  })
}

//scrape the page
scrapePage()
.then( (resHtml) => {
	console.log('html written to folder', resHtml);
  // return parseItems(resHtml)
})
// .then( ({currentPrice}) => {
//   comparePrice(currentPrice)
// })
.catch( (err) => {
  console.log("error", err );
});
