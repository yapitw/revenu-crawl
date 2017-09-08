// var http = require('http');

// http.createServer(function (req, res) {

//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('Hello, world!');

// }).listen(process.env.PORT || 8080);

const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index');

// 設定 public 內容
app.use(express.static(path.join(__dirname, 'public')));
// 設定 views 路徑
app.set('views', path.join(__dirname, 'views'));
// 設定 view 引擎為 pug
app.set('view engine', 'pug');


// 引入 routes
app.use('/', routes);


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
    console.log('Express 伺服器已啟動並監聽於 PORT ' + app.get('port'))
})