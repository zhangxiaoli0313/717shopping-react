import React, {Component} from 'react'
import './setting.scss'
import { loginout } from '../../utils/utils'
// import Dialog from './../../components/dialog'
class Setting extends Component{
    constructor(){
        super()
        this.state={flag:false}
        this.logout=this.logout.bind(this)
        this.close=this.close.bind(this)
        this.callback=this.callback.bind(this)
        this.goback=this.goback.bind(this)
    }
    render(){
        let {flag}=this.state
        return(
            <div id='setting'>
                <header><span className='iconfont icon-zuojiantou1' onClick={this.goback}></span>设置</header>
                <p>
                    <span>我的头像</span>
                    <span>></span>
                </p>
                <p>
                    <span>用户名</span>
                    <span>张晓利 ></span>
                </p>
                <p>
                    <span>我的二维码名片</span>
                    <span>></span>
                </p>
                <button onClick={this.logout}>退出登录</button>
                {/* {flag&&<Dialog title='提示'
                        info={'确定退出登录吗？'}
                        close={this.close}
                        callback={this.callback}/>} */}
            </div>
        )
    }
    close(){
        this.setState({
            flag:false
        })
    }
    callback(){
        loginout()
        this.props.history.push('/index/home')
    }
    logout(){
        this.setState({
            flag:true
        })
        loginout()
        this.props.history.push('/index/home')
    }
    goback(){
        this.props.history.push('/index/mine')
    }
}
export default Setting