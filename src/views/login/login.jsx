import React, {Component} from 'react'
import $http from '../../utils/http'
import './login.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import mapDispatchToProps from './dispatch'
class Login extends Component{
    constructor(){
        super()
        this.toLogin = this.toLogin.bind(this)
    }
    render(){
        return (
            <div id='login'>
                <h1>登录</h1>
                <p className='reg'><Link to='/register'>注册</Link></p>
                <section>
                    <p>用户名：<input type="text" placeholder='请输入用户名' className='username' ref='username'/></p>
                    <p>密码：<input type="password" placeholder='请输入你的密码' className='password' ref='password'/></p>
                    <button onClick={this.toLogin}>登录</button>
                </section>
            </div>
        )
    }

     // 在前端进行请求
     toLogin(){
         // 获取到值
        let {username, password} = this.refs
        
        $http.post('/user/login',{
            username: username.value,
            password: password.value
        })
        .then(res=>{
           if(res.success==1){// 成功才会有
                // this.props.saveUser(res.user)
                let from = this.props.location.state ? this.props.location.state.from || 'index/home':'index/home'
                document.cookie = "token="+res.token// 前端获取, 登录成功后默认跳转到首页
                this.props.history.replace(from)
           }else{
               alert('登录错误')
           }
        })
     }
}

export default connect(null,mapDispatchToProps)(Login)