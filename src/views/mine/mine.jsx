import React, {Component} from 'react'
import './mine.scss'
import { connect } from 'react-redux'
import mapStateToProps from './state'

class Mine extends Component{
    constructor(){
        super()
        this.toSetting=this.toSetting.bind(this)
    }
    render(){
        let { userInfo } = this.props;
        return(
            <div id='mine'>
                <header>
                    <p>
                        <span className='iconfont icon-home' onClick={this.toSetting}></span>
                        <span>我的717商城</span>
                    </p>
                    <dl>
                        <dt>
                            <img src={require('../../static/img/1.png')} alt=""/>
                        </dt>
                        <dd>
                            {/* <p>{userInfo.name}</p>
                            <p>{userInfo.nickName}</p>  */}
                            <p>liyiming</p>
                        </dd>
                    </dl>
                    <ul className='mineBox'>
                        <li>
                            <span><i className='iconfont icon-dianpu'></i>我的店铺</span>
                            <i className='iconfont icon-zuojiantou'></i>
                        </li>
                        <li>
                            <span><i className='iconfont icon-shequ'></i>我的社区</span>
                            <i className='iconfont icon-zuojiantou'></i>
                        </li>
                        <li>
                            <span><i className='iconfont icon-yue01'></i>我的余额</span>
                            <i className='iconfont icon-zuojiantou'></i>
                        </li>
                        <li>
                            <span><i className='iconfont icon-dangdi'></i>我的地址</span>
                            <i className='iconfont icon-zuojiantou'></i>
                        </li>
                    </ul>
                </header>
            </div>
        )
    }
    toSetting(){
        this.props.history.push('/setting')
    }
}
export default connect(mapStateToProps)(Mine)