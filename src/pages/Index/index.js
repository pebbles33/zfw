import React from 'react'
import { Carousel,Flex,Grid,WingBlank,SearchBar} from 'antd-mobile';
import { BASE_URL } from '../../utils/axios';
import {getSwiper,getGroup,getNews} from '../../utils/api/home'
// import {getCityInfo} from '../../utils/api/city'
import {getCurrCity} from '../../utils'
import Navs from '../../utils/navs'
import './index.scss'


class Index extends React.Component{
  state = {
    swiper: [],
    group:[],
    news:[],
    keyword:'',
    currCity: {
      label: '--',
      value: ''
    },
    isplay:false,
    imgHeight: 212,
  }
  componentDidMount() {
  //  this.getSwiper()
  //  this.getGroup()
  //  this.getNews()
  this.loadDatas()
  this.getCurCity()
  }

  //promise重构
  loadDatas=async ()=>{
    const apis=[getSwiper(),getGroup(),getNews()]
    let res=await Promise.all(apis)
    console.log(res);
    this.setState({
      swiper:res[0].data,
      group:res[1].data,
      news:res[2].data
    },()=>{
      this.setState({
        autoplay:true
      })
    })
  }
  // 获取当前定位城市信息  封装到工具包再调用
    getCurCity = async () => {
       let res=await getCurrCity()
       console.log(res)
       this.setState({
         currCity:res
       })
    }
  // getSwiper = async ()=>{
  //   const {status,data} = await getSwiper()
  //   if(status===200){
  //     //setState是异步操作,轮播图自动播放激活
  //     this.setState({
  //       swiper:data
  //     },()=>{
  //       this.setState({
  //         isplay:true
  //       })
  //     })
  //   }
  // }
  // getGroup = async() =>{
  //   const{ status,data}=await getGroup()
  //   if(status===200){
  //     this.setState({
  //       group:data
  //     })
  //   }
  // }
  // getNews = async () =>{
  //   const{ status,data }=await getNews()
  //   if(status===200){
  //     this.setState({
  //       news:data
  //     })
  //   }
  // }
  renderCarousel=()=>{
    return(
      <Carousel
          autoplay={this.state.isplay}
          infinite
        >
          {this.state.swiper.map(val => (
            <a
              key={val.id}
              href="http://www.itcast.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight ,background: 'gray'}}
            >
              <img
                src={`${BASE_URL}${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  //img宽高自适应
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    )
  }
  renderNavs=() => {
    return(
      <Flex className="nav">
      {
         	Navs.map((item,index)=>   
          <Flex.Item 
          onClick={() => {this.props.history.push(item.path)} }
          key={index}>
          <img src={item.img}/>
          <p>{item.title}</p>
          </Flex.Item>  )             
      }
      </Flex>
    )
  }
  renderNews=()=> {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={()=>{
            this.props.history.push('./cityList')
          }}>
            {this.state.currCity.label}<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={()=>{ this.props.history.push('/map')}}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }
  render() {
    return (
      <div className="indexBox">
         {this.renderTopNav()}
         {this.renderCarousel()}
         {this.renderNavs()}
         <div className="group">
            <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
            </Flex> 
            <Grid data={this.state.group}
              columnNum={2}    
              // 关闭默认正方形
              square={false}
              hasLine={false}
              renderItem={item => {
              //自定义宫格内容
                 return (                
                   <Flex className="grid-item" justify="between">
                     <div className="desc">
                       <h3>{item.title}</h3>
                       <p>{item.desc}</p>
                     </div>
                     <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                   </Flex>
                 )
              }}
            />
        </div>
         <div className="news">
             <h3 className="group-title">最新资讯</h3>
             <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>  
  )
  }
}
export default Index