import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import $http from '../utils/http'

// 每一个saga都是一个generator函数

// worken saga
function* fetchData(){
    try{
        let res = yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
        console.log(res)
        yield put({
            type:'TEST_SAGA',
            data:JSON.parse(res)
        })
    }
    catch(err){
        yield put({
            type:'TEST_SAGA_ERROR',
            data:err
        })
    }
}

export default function* watchFetch(){
    // 监听type为GET_GOODS_LIST的action
    yield takeEvery(['GET_GOODS_LIST'],fetchData)
}