const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const app = express()
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // 支持跨域
    res.header('Access-Control-Allow-Headers', 'Content-Type, Token') // 允许包含请求头字段
    res.header('Content-Type', 'application/json;charset=utf-8') // 设置响应的数据类型
    next()
})

// 启动后端所有接口
api(app)

app.listen(9000, function() {
    console.log('server listen 9000')
})

const querystring = require('querystring')
console.log(querystring.parse('appKey=12574478&t=1521885722047&sign=9b9718a745fd0ab9ad8cf594692e5bf0&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp'))
