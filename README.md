#717项目总结
    1.页面
        首页=>【swiper+list+scroll,swiper下载包然后引用swiper.css和swiper.js完成轮播图;引用http.js完成list的渲染】
            搜索=>【最近搜索和搜索记录,最近搜索每一项点击都会自动搜索;搜索记录是根据自己的后台记录所渲染出来的】
            详情页=>【点击每个dl也就是图片或文字都会跳转至详情页,根据点击的每个商品id值不同,所渲染出来的页面不同】
            单机购物车=>【记录当前的商品id,存入商品项目至local Storage】
        分类=>【最主要的是点击li的每一项,切换相对应的内容,使用tab切换原理】
        购物车=>【从local Storage里拿出我们起初存入的数据并去重渲染到页面,全选和单选运用第三方变量和三目运算符来实现】
        我的
            注册=>【输入用户名和密码运用正则注册,并将用户名和密码存入到token中,在user.json中】
            登录=>【验证用户名和密码,】
            退出登录=>
            设置=>
        邮寄地址管理=>
            添加=>
            邮寄地址列表=>
        订单管理=>
    
    2.common组件封装
        弹出框=>
        轮播图=>
        商品模块=>
        筛选=>
        购物车商品模块=>
        邮寄地址=>

    3.技术选型

        React, redux, react-router, react-redux, redux-sage

        文档要求：
        1：回去之后看到系项目的代码的文件夹
        2：做项目的总结
        3：你是怎么规划你项目的结构的，你做了哪些功能
        4：你的路由是怎么搭建的
        5：你传参是怎么传的
        6：你的组建时怎么封装的，封装了那些组建
        7：要对你的项目做一个系统性的比较完整的有条理性的总结
        8：md格式，名字.md，里面就是717项目总结
        9：上面先总结一下你这个项目是干什么的，
        你是电商网站用的什么技术react,redux，saga, react-router
        所用到的知识点总结一番，然后在细节的去概括，你在这里面是做某些功能的
        购物车是怎么做的，商品是怎么封装的，还封装了那些comon组建
        你是怎么封装的，核心逻辑是什么，甚至可以把那段核心逻辑代码粘过来，作为你的项目总结
