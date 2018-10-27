
const fs = require("fs");
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');

var app = express();

function writeFile(jsonTab) {
  // Will write the json file
  fs.writeFile("/Users/peisong/node_test/web_scrap/output.json", JSON.stringify(jsonTab, null, 4), (err) => {
    console.log("File successfully written!");
  });
}

const homeurl = 'https://www.sinoquebec.com/portal.php?mod=list&catid=1'

app.get('/', function (req, res, next) {
  superagent.get(homeurl)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);

      var contentUrls = [];

      $('.zn-message ').each(function (idx, element) {

        var $element = $(element);

        var href = url.resolve(homeurl, $('.xs2 a', element).attr('href'));
        contentUrls.push(href)

      });

      console.log(contentUrls);

      var ep = new eventproxy();  
      contentUrls.forEach(function (contentUrl) {
          superagent.get(contentUrl)
            .end(function (err, res) {
              console.log('fetch ' + contentUrl + ' successful');
              ep.emit('content_html', [contentUrl, res.text]);
        });
      });      

      ep.after('content_html', contentUrls.length, function (contents) {
        contents = contents.map(function (contentPair) {

          const json = {
            href: "",
            title: "",
            full_content: ""
          };

          var contentUrl = contentPair[0];
          var contentHtml = contentPair[1];
          var $ = cheerio.load(contentHtml);

          json.href  = contentUrl
          json.title = $('.ph').text()

          var full_content = []

          $('#article_content div').each(function (idx, element) {
            var $element = $(element);
            full_content.push($element.text())
          });

          json.full_content = full_content.join(' ');
          return json

        });
      console.log('final:');
      console.log(contents);
      res.send(contents);
      writeFile(contents)
      });      

  });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

