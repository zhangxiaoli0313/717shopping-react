import React, { Component } from 'react'
import './catagory.scss'
import $http from '../../utils/http'
class Catagory extends Component {
    constructor() {
        super()
        this.state={
            activeIndex: 0
        }
        this.toSearch = this.toSearch.bind(this)
    }
    toSearch() {
        let { history } = this.props;
        history.push('/index/search')
    }
    render() {
        let catList = ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料']
        let catcount = [require("../../static/img/images/1.jpg"),require("../../static/img/images/2.jpg"), require("../../static/img/images/3.jpg"), require("../../static/img/images/4.jpg"), require("../../static/img/images/1.jpg"),
        require("../../static/img/images/1.jpg"), require("../../static/img/images/6.jpg"), require("../../static/img/images/5.jpg"),
        require("../../static/img/images/3.jpg")
        ]
        return (
            <div id='catagory'>
                <header><input type="text" onFocus={this.toSearch} /></header>
                <div className='catagory-wrap ks-clear'>
                    <div className='left-side'>
                        <ul>
                            {
                                catList.map((item,index)=>{
                                    return <li className={this.state.activeIndex==index?'catagory-active':''} key={index} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='right-side'>
                        <ul>
                            {
                                catcount.map((item, index) => {
                                    return <li className={this.state.activeIndex == index ? 'count-active' : 'count-none'}
                                        key={index} onClick={() => { this.addContentClass(index) }}>
                                        <img src={item} alt=""/>
                                        </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    toggleActive(idx){
        // $http.get('/mobile/Category/categorySon',{sonid:idx+1}).then((res)=>{
        //     console.log(res)
        // })
        let url='https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521885722047&sign=9b9718a745fd0ab9ad8cf594692e5bf0&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp3&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%222%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        let url_men='https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521886542051&sign=d464adc853aa269b7452e608d09ed69f&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp4&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%223%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        $http.jsonp(url,'mtopjsonp3').then(res=>{console.log(res)})
        $http.jsonp(url_men,'mtopjsonp4').then(res=>{console.log(res)})

        // 根据经纬度搜索位置
        $http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location=36,119&key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp&callback=findLocation','findLocation').then(res=>{console.log(res)})
        this.setState({
            activeIndex:idx
        })
    }
    addContentClass(ind){
        this.setState({
            activeIndex: ind
        })
    }
}
export default Catagory