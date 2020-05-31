import React from 'react'
import './index.scss'
import {NavBar,Icon} from 'antd-mobile';
class Map extends React.Component{

  componentDidMount(){
    this.initMap()
  }
  initMap=()=>{
    const { BMap } = window;
    // console.log(BMap)
    // 1. 创建地图实例
    const map = new BMap.Map("container");
    // 2. 地图定位的经纬度设置(天安门)
    let point = new BMap.Point(116.404, 39.915);
    // 3. 设置地图的位置和缩放级别
    map.centerAndZoom(point, 15);
  }
  render(){
    return(
      <div className="mapBox">
        <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {
            this.props.history.goBack()
            }}
        >
        地图找房
         </NavBar>
         <div id="container"></div>
      </div>
    )
  }
}
export default Map