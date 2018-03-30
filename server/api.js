const jwt = require('jsonwebtoken') 
const http = require('http') 
const querystring = require('querystring')
const fs = require('fs')
const mock = require('mockjs')
const _ = require('lodash')

function queryApi(url, methods, params) {
    return new Promise((resolve,reject) => {
        let data = ''
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            // 接收数据
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                console.log(data)
                resolve(JSON.stringify(data))
            });
        })
        if (methods.toLowerCase() == 'post') {
            request.write(querystring.stringify(params))
        }
        request.end()
    })

}

module.exports = function (app) {
    // 商品列表的接口， 传数据给服务器
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryApi('/mall/index/getGoodsChannel','post',req.body)
        .then((data)=>{
            res.end(data)
        })
    })

    // 注册接口
    app.post('/user/register', function (req, res) {
        console.log(req.body) // 新数据
        let user = fs.readFileSync('user.json', { encoding: 'utf-8' }) // 怎么读取文件
        user = JSON.parse(user);
        user.push(req.body); // 把新数据放到user.json，前提是此文件有个空[]
        console.log(user) // [],接收新接收到的数据数据
        fs.writeFile('user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "register success"
            }))
        })
    })

    // 登录接口
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', { encoding: 'utf-8' });
        user = JSON.parse(user); // 把字符串转换为对象， user:字符串
        let login = req.body;
        let resInfo = {
            success: 0,
            info: "用户名或密码错误",
            token: ''
        }

        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 1;
                resInfo.info = "login success"
                resInfo.user={
                    name:usr.username,
                    time:new Date().toLocaleTimeString(),
                    nickName:'Jacky'
                }
            }
        });

        // 判断成功加密
        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, '0112', {
                expiresIn: 60*60
            }) // login加密的对象， 0421，密码, 
        }
        res.end(JSON.stringify(resInfo))
    })

    // 错误中间键
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    //添加购物车
    app.post('/user/Cart/addCart', function (req, res) {
        jwt.verify(req.body.token, '0112', (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: '登录过期，请重新登录',
                    detail: err.TokenExpiredError
                }))
            } else {
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/cart_info.json', { encoding: 'utf-8' }))
                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username];
                    let flag=false;
                    recordList.forEach((item,index)=>{
                        if(item.goods_id==req.body.goods_info.goods_id){
                            ++item.count
                            flag=true;
                        }
                    })
                    if(!flag){
                        let record = req.body.goods_info;
                        record.count=1;
                        record.selected=0;
                        cartInfo[decoded.username].push(record)
                    }
                } else {
                    let record = req.body.goods_info;
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username] = [record]
                }
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                    res.end("1")
                })
            }
        })

    })

    // 分类接口

    app.get('/mobile/Category/categorySon', function (req, res) {
        let tbdata='https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521885722047&sign=9b9718a745fd0ab9ad8cf594692e5bf0&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp3&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%222%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        // queryApi(tbdata,'get')
        // .then(data=>{
        //     console.log(data)
        // })
        res.json(1)
    })

    // 登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList',function(req,res){
        console.log(req.body)
        jwt.verify(req.body.token, '0112', (err, decoded) => {
            if (err) {
                console.log(decoded)
                res.end(JSON.stringify({
                    info: '登录过期，请重新登录',
                    detail: err.TokenExpiredError,
                    error:1
                }))
            }else{
                try{
                    let goodsRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}))
                    res.json(goodsRecord[decoded.username])
                }
                catch(error){
                    res.json(error)
                }
            }
        })
    })

    // 删除购物车指定商品
    app.post('/user/Cart/delGoods',function(req,res){
        let cartRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}))
        jwt.verify(req.body.token,'0112',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let cartList = cartRecord[decoded.username];
                let delGoods = _.remove(cartList,function(item){
                    return req.body.selectedID.indexOf(item.goods_id)>-1
                })
                cartRecord[decoded.username]=cartList;
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartRecord), function () {
                    res.json({
                        success:1,
                        info:'删除成功',
                        delGoods:delGoods,
                        leftGoods:cartList
                    })
                })
            }
        })
    })
}