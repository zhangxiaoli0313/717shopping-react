import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapDisPatchToProps from './dispatch'
class CartItem extends Component{
    constructor(){
        super()
    }
    render(){
        let { toggleSelect, updateCount, item } = this.props
        return (
            <li>
                <span onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}} className={item.selected==0?'select-btn iconfont':'select-btn iconfont icon-duihao'}></span>
                <span className='goods-img'>
                    <img src={'http://www.lb717.com/'+item.obj_data} alt=""/>
                </span>
                <div className='right-area'>
                    <p>{item.goods_name}</p>
                    <div className='flex'>
                        <div className='price-box'>
                            <p>*{item.count}</p>
                            <p>￥{item.discount_price}</p>
                        </div>
                        <div className='count-box'>
                            <span onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</span>
                            <span>{item.count}</span>
                            <span onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

// export default connect(null,mapDisPatchToProps)(CartItem)
export default connect(null,mapDisPatchToProps,null,{pure:false})(CartItem)