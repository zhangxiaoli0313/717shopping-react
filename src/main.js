import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'

// config  router
import router from './router/router.config'// 引入router

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import RouterWraper from './components/routeWraper'
// font set & common style set
import fontset from './utils/fontset'
import './static/css/reset.css'
import './static/font/iconfont.css'
import './static/css/common.css'

// call react-dom to render root
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter> 
            <Switch>
                <Redirect exact from = '/' to='/index/home'></Redirect>
                <RouterWraper  routes={router.routes}></RouterWraper> 
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'))