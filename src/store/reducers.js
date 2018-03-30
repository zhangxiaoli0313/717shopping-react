import { combineReducers } from 'redux'

// 添加购物车
export const ADD_CART = 'ADD_CART'
// 添加商品
export const DELETE_CART = 'DELETE_CART'
// 改变商品数量
export const UPDATE_GOODS_COUNT = 'UPDATE_GOODS_COUNT'
// 改变商品选中与否
export const UPDATE_GOODS_SELECTED = 'UPDATE_GOODS_SELECTED'
// 更新整个列表对象
export const UPDATE_GOODS_LIST = 'UPDATE_GOODS_LIST'
// 设置全选
export const SELECTED_ALL = 'SELECTED_ALL'
// 存储用户信息
let initState={
    cart_list:[],
    user_info:null,
    goods_list:[]
}
function goods_list(state=initState.goods_list,action){
    if(action.type=='TEST_SAGA'){
        return action.data
    }
    return state
}
function cart_list(state=initState.cart_list,action){

    switch (action.type){
        case ADD_CART: 
        let flag=false;
        state.forEach((item,index)=>{
            if(item.goods_id==action.data.goods_id){
                ++item.count;
                flag=true
            }
        })
        return flag ? [...state] : [...state,action.data]
        break;
        case UPDATE_GOODS_COUNT:
        let arr=[...state];
        arr.forEach(item=>{
            if(item.goods_id==action.id){
                item.count=action.data
            }
        })
        return arr
        break;
        case UPDATE_GOODS_SELECTED:
        let arr2=[...state];
        arr2.forEach(item=>{
            if(item.goods_id==action.id){
                item.selected=action.data
            }
        })
        return arr2;
        case UPDATE_GOODS_LIST:
        return action.data;
        case SELECTED_ALL:
        let arr3=[...state];
        let str=action.data;
        arr3.forEach(item=>{
            item.selected=str=='all'?1:0
        })
        return arr3;
        default: return state
    }
    return state
}
function user_info(state=initState.user_info,action){
    switch(action.type){
        case user_info:
        return action.data;
        break;
        default:
        return {

        }
    }
}
export default combineReducers({
    cart_list,
    user_info,
    goods_list
})