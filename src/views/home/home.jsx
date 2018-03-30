import React, {Component} from 'react'
import $http from '../../utils/http'
import SwiperComponent from '../../components/swiper/swiperComp'
import './home.scss'
import GoodsItem from '../../components/goodsComp/goodsComponent'
class Home extends Component{
    constructor(){
        super()
        this.state={
            goodlist:[],
            channel_id: 3,
            caniquery: true
        }
        this.toSearch = this.toSearch.bind(this)
        this.scrolling = this.scrolling.bind(this)
    }
    toSearch(){
        let {history} = this.props;
        history.push('/index/search')
    }
    render(){
        return (
            <div id='home' onScroll={this.scrolling} ref='scroller'>
                <div ref='doc'>
                    <header><input type="text" onFocus={this.toSearch}/></header> 
                    {/* input用来跳转search页面 */}
                    <div>
                        <SwiperComponent></SwiperComponent>
                    </div>
                    <section className='home-cat ks-clear'>
                        <dl>
                            <dt><img src={require('../../static/img/images/1.jpg')} alt=""/></dt>
                            <dd>家乡风味</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/2.jpg')} alt=""/></dt>
                            <dd>进口食品</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/3.jpg')} alt=""/></dt>
                            <dd>牛奶乳品</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/4.jpg')} alt=""/></dt>
                            <dd>茶果冲饮</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/5.jpg')} alt=""/></dt>
                            <dd>休闲零食</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/6.jpg')} alt=""/></dt>
                            <dd>米面粮油</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/7.jpg')} alt=""/></dt>
                            <dd>调味调料</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/images/8.jpg')} alt=""/></dt>
                            <dd>酒水饮料</dd>
                        </dl>
                    </section>
                    <div className='goods-list ks-clear'>
                        {
                            this.state.goodlist.map((item,index)=>{
                                return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                            })
                        }
                    </div>
                    <p>我是有底线的！！</p>
                </div>
            </div>
    )}
    componentDidMount(){
        // http://localhost:9000 把域名和协议封装在http.js里面

        $http.post('/mall/index/getGoodsChannel', {channel_id:this.state.channel_id})// 前端传给后端的一个数据：{id:3},console.log(req.body)=>1
        .then(res=>{
            this.setState({
                goodlist:JSON.parse(res).data.data
            })
        })
    }
    scrolling(){
        if(this.state.channel_id>9) return
        if(!this.state.caniquery) return;
        let { scroller, doc } = this.refs
        let st = scroller.scrollTop
        let sw = scroller.offsetHeight
        let dh = doc.offsetHeight
        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            this.setState({
                channel_id:++this.state.channel_id
            })
            let { goodlist } = this.state;
            $http.post('/mall/index/getGoodsChannel', {channel_id:this.state.channel_id})
            .then(res=>{
                // goodlist.push(JSON.parse(res).data.data)
                this.setState({
                    goodlist: [...goodlist,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
    }
} 
export default Home