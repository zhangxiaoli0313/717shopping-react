import React, {Component} from 'react'
import './search.scss'
import {connect} from 'react-redux'
class Search extends Component{
    constructor(){
        super()
        this.state={
            historylist:[]
        }
        this.toSearch = this.toSearch.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.testSaga = this.testSaga.bind(this)
        this.goBack = this.goBack.bind(this)
    }
    render(){
        let { historylist } = this.state
        let { goodsList } = this.props
        console.log(goodsList)
        return <div id='search'>
            <header><span onClick={this.goBack} className='iconfont icon-zuojiantou1'></span><input type="text" placeholder='请输入你要购买的商品' ref='keyWords'/><button onClick={this.toSearch}>搜索</button></header>
            <section className='recent-search'>
                <p>最近搜索 <span onClick={this.clearHistory} className='iconfont icon-shanchu'></span></p>
                {historylist.length == 0 ? <p>暂无搜索记录。。。</p> :
                    <ul className='ks-clean'>
                        {
                            this.state.historylist.map((item,index)=>{
                                return <li key={index} onClick={()=>{this.toResult(item)}}>{item}</li>
                            })
                        } 
                    </ul>
                } 
            </section>
            <section className='common-search'>
                <p>大家都在搜索</p>
                <ol className='ks-clean'>
                    <li onClick={this.testSaga}>巧克力</li>
                </ol>
            </section>
        </div>
    }
    goBack(){
        this.props.history.push('/index/home')
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory')
        this.setState({
            historylist: []
        })
    }
    toSearch(){
        // 判断，如果有输入值才会到result页面 this.refs.keyWords.value
        if(!this.refs.keyWords.value) return;
        let keyWords = this.refs.keyWords.value;// 输入的值,是字符串
        let ls = localStorage;
        console.log(keyWords)
        // 判断，有了就获取，没有就设置
        if(ls.getItem('SearchHistory')){
            let shArr = JSON.parse(ls.getItem('SearchHistory'));// 字符串转对象object
            console.log(typeof(shArr))
            // 判断去重
            if(shArr.indexOf(keyWords) > -1) return;
            shArr.push(keyWords);
            ls.setItem('SearchHistory', JSON.stringify(shArr))
        }else{ 
            ls.setItem('SearchHistory', JSON.stringify([keyWords]))
        }
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    toResult(keyWords){
        this.props.history.push('/index/result',{
            key_words:keyWords
        })
    }
    componentDidMount(){
        if(localStorage.getItem('SearchHistory')){
            this.setState({
                historylist:JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
    testSaga(){
        this.props.dispatch({
            type:'GET_GOODS_LIST'
        })
    }
}


export default connect(function(state){
    return {
        goodsList:state.goods_list
    }
})(Search)