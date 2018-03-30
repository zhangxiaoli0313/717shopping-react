import React, {Component} from 'react'
import { connect } from 'react-redux'
import './detail.css'
class Detail extends Component{
    constructor(){
        super()
        this.goback = this.goback.bind(this)
    }
    render(){
        const { state } = this.props.location
        return (
            <div id='detal'>
            <div className="headdel">
                <ul>
                    <li><span className='iconfont icon-zuojiantou1' onClick={this.goback}></span></li>
                    <li><span>商品详情</span></li>
                    <li><span></span></li>
                </ul>
            </div>
                {/* <dl className='detal'>
                    <dt>
                         <img src={'http://www.lb717.com/' + state.obj_data} alt="" /> 
                    </dt>
                    <dd>
                        <p className='detal'>{state.goods_name}</p>
                        <p>
                            <span className='price'>￥{state.discount_price}</span>
                            <i className='iconfont icon-gouwuche'></i>
                        </p>
                    </dd>
                </dl>  */}
                <h1>我是详情页</h1>
            </div>
        )
    }
    goback(){
        this.props.history.push('/index/home')
    }
    componentDidMount(){
        // console.log(this.props)
    }
}
export default Detail