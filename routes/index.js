const express = require('express');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('request');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/revenu', (req, res, next) => {
        let content = [];
        let taskAmount = 0;
        let taskFinished = 0;

        function getData(stockcode, year, season) {
            console.log("gogo");
            const pos = taskAmount;
            taskAmount++;
            stockcode = stockcode || 3008;
            year = year || 2017;
            season = season || 2;
            request.get({
                "url": `http://mops.twse.com.tw/server-java/t164sb01?step=1&CO_ID=${stockcode}&SYEAR=${year}&SSEASON=${season}&REPORT_ID=C`,
                "encoding": null
            }, function (err, httpResponse, body) {
                var body = iconv.decode(body, 'big5');
                var $ = cheerio.load(body);
                $('td').each(function (i, item) {
                    if ($(this).text().trim() == "營業收入合計") {
                        let data = $(this).next().text();
                        data = data.trim().replace(/\,/g, "");
                        content[pos] = `股票代號: ${stockcode},${year}年第${season}季營業收入合計: ${data}`;
                        
                    }
                })

                taskFinished++;
                if (taskAmount == taskFinished) {
                    // res.content = JSON.stringify(content);
                    res.content = content;
                    console.log('done');
                    next();
                }
            });
        }

        getData(3008, 2016, 1);
        getData(3008, 2016, 2);
        getData(3008, 2016, 3);
        getData(3008, 2016, 4);
        getData(3008, 2017, 1);
    },
    (req, res, next) => {
        console.log('render')
        res.render('revenu', {title: 'Revenu', content: res.content});
    })

module.exports = router