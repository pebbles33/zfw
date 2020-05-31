import React from 'react'
import {  Route } from 'react-router-dom'
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import { TabBar } from 'antd-mobile';
import './index.scss'
import tabbarData from '../../utils/tabbarData'

class HomeIndex extends React.Component {
  state = {
    //当前页路径
    selectedTab: this.props.location.pathname
  }

  renderTbar=()=>{
   return ( 
     <TabBar
     unselectedTintColor="#949494"
     tintColor="#33A3F4"
     barTintColor="white"
     >
    {
     tabbarData.map((item,index)=>
      <TabBar.Item
       title={item.title}
       key={index}
       icon={ 
             <i className={`iconfont ${item.icon}`} />  }
       selectedIcon={
              <i className={`iconfont ${item.icon}`} />
       }
       selected={this.state.selectedTab === item.path}
       onPress={() => {
         //编程时路由 跳转页面
         this.props.history.push(item.path)
         this.setState({
           selectedTab: item.path,
         });
       }}
     />           
        ) }
    </TabBar>
   )
  }

  render() {
    return (
      <div>
        {/* <div>
          <Link to="/home">首页</Link>
          <Link to="/home/house">房屋列表</Link>
          <Link to="/home/profile">个人中心</Link>
        </div> */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        <div className="tabBox" >
        {this.renderTbar()}
        </div>
      </div>
    )
  }
}
export default HomeIndex