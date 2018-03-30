// 创建商品组建
import React, {Component} from 'react'
import $http from '../../utils/http'
import '../../static/css/goodsComponent.css'
import Lazyload from 'react-lazyload'
// import { T } from 'react-toast-mobile'
import { getCookie } from '../../utils/utils'

import { connect } from 'react-redux'
import { ADD_CART } from './../../store/reducers'

class Placeholder extends Component{
    render(){
        return <img src={require('../../static/img/loading.gif')} alt=""/>
    }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let { data } = this.props
        return <dl className='goods-item' onClick={()=>{this.toDetail(data.goods_id)}}>
            <dt><Lazyload height={'100%'} overflow once placeholder={<Placeholder />} debounce={200}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></Lazyload></dt>
            <dd>
                {/*描述信息  */}
                <p className='goods-detail'>{data.goods_name}</p>
                <p className='goods-nums'><span className='goods-price'>{data.discount_price}</span><span onClick={this.addCart} className='iconfont icon-gouwuche1'></span></p>
                {/* <ToastContainer></ToastContainer> */}
            </dd>
        </dl>
    }

    // post 请求
    addCart(e){
        e.stopPropagation()
        let { data } = this.props
        if(getCookie('token')){
            $http.post('/user/Cart/addCart', {
                goods_id:data.goods_id,
                goods_info:data,
                token:getCookie('token')
            })
            .then((res)=>{
                if(res==1){
                    // T.notify('购物车添加成功')
                    this.props.dispatch({
                        type: ADD_CART,
                        data: {
                            ...data,
                            count:1,
                            selected:0
                        }
                    })
                }else{
                    // T.notify(res.info)
                    let { history, location } = this.props;
                    history.push('/login',{
                        from: location.pathname
                    })
                }
            })
        }else{
            let { history, location } = this.props
            history.push('/login',{
                from:location.pathname
            })
        }
    }
    toDetail(goods_id){
        this.props.history.push('/detail?goods_id='+goods_id,{
            goods_id:goods_id
        })
    }
}
export default connect(null)(GoodsItem)