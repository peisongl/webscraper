
const fs = require("fs");
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

const jsonTab = []; // We create our table

function writeFile() {
  // Will write the json file
  fs.writeFile("/Users/peisong/node_test/web_scrap/output.json", JSON.stringify(jsonTab, null, 4), (err) => {
    console.log("File successfully written!");
  });
}

const url = 'https://www.sinoquebec.com/portal.php?mod=list&catid=1'

app.get('/', function (req, res, next) {
  superagent.get(url)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);

      $('.zn-message ').each(function (idx, element) {

        const json = {
            href: "",
            title: "",
            description: "",
            label: "",
            view: "",
            timestamp: ""
          };

        var $element = $(element);

        json.href = $('.xs2 a', element).attr('href'),
        json.title = $('.xs2 a', element).text()
        json.description = $('.cl', element).text()
        // json.label = $('label > a', element).text()

        var dd = $('dd', element).text().split('|');
        json.label = dd[0].split(':')[1].trim();
        json.view = dd[1].split(':')[1].trim();
        json.timestamp = dd[2].replace(" 发布:", "").trim();

        jsonTab.push(json)

      });
      res.send(jsonTab);
      writeFile();

    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

