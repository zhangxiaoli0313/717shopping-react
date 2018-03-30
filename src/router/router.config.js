// 存放手游的路由
import React, { Component } from 'react'
import Home from '../views/home'
import Detail from '../views/detail'
import Login from '../views/login'
import Register from '../views/register' // 注册

import Indexs from '../views/indexs'
import Search from '../views/search'
import Catagory from '../views/catagory'
import Cart from '../views/cart'
import Mine from '../views/mine'
import Result from '../views/result'
import Setting from '../views/setting'
let router = {
    routes: [{
            path: '/detail',
            component: Detail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/setting',
            component:Setting
        },
        {
            path: '/index',
            component: Indexs,
            children: [{
                    path: '/index/home',
                    component: Home
                },
                {
                    path: '/index/search',
                    component: Search
                },
                {
                    path: '/index/catagory',
                    component: Catagory
                },
                {
                    path: '/index/cart',
                    component: Cart,
                    authorization: true
                },
                {
                    path: '/index/mine',
                    component: Mine,
                    authorization: true // 权限
                },
                {
                    path: '/index/result',
                    component: Result
                }
            ]
        }
    ]
}
export default router // 把router抛出去，在main.js里引用一下