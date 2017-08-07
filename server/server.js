require('dotenv').config();
const fs = require('fs'),
      request = require('request'),
      cheerio = require('cheerio'),
      host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
      port = process.env.PORT || 8080,
      cors_proxy = require('cors-anywhere'),
      Storage = require('node-storage'),
      store = new Storage(__dirname + "/data/scrapedData.js"),
      pageURL = 'https://www.nytimes.com/',

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

function parseItems(resHtml) {
  return new Promise( (resolve, reject) => {
    const $ = cheerio.load(resHtml),
          storyCollection = $('article.story');
          console.log("storyCollection", storyCollection);

    storyCollection.toArray().forEach( (article) => {
      const $story = $(article),
            articleHeadline = $story.find('.story-heading').text(),
            articleAuthor = $story.find('.byline').text(),
            articleCopy = $story.find('.summary').text(),
            articleLink = $story.find('.story-heading a').attr('href'),
            articleId = $story.attr('id');

			store.put(articleId, {articleHeadline, articleLink, articleAuthor, articleCopy});

      console.log("new item stored?", store.get(articleId));
      resolve(articleId)
    })
  });
}

//scrape the page
scrapePage()
.then( (resHtml) => {
	console.log('html written to folder', resHtml);
  return parseItems(resHtml)
})
.catch( (err) => {
  console.log("error", err );
});
