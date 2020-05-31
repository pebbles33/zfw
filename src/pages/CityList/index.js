import React,{Component} from 'react'
import {getCitise,getHotCity} from '../../utils/api/city'
import { getCurrCity,setData, CURR_CITY } from '../../utils'
import {List,AutoSizer} from 'react-virtualized';
import './index.scss' 
import { NavBar,Icon,Toast} from 'antd-mobile';


// const list =Array.from(new Array(100)).map((item,index)=>index);
// console.log(list);

class CityList extends Component{

  state = {
    cityIndex: [],
    cityList: {}
  }
   // 获取城市列表所需数据
   getCityData = async () => {
    const {status,data} = await getCitise()
    if(status===200){
      //console.log(data);
      const { cityIndex, cityList } = this.formatCities(data)
      console.log(cityIndex, cityList );
      const {status:st,data:dt}=await getHotCity()
      if(st===200){
        cityList['hot']=dt
        cityIndex.unshift('hot')
      }
      let  res=await getCurrCity()
      console.log(res);
      cityList['cur']=[res]
      cityIndex.unshift('cur')
      //做响应式
      this.setState({
        cityIndex, 
        cityList
      })
    }
  }

   // 格式化城市列表数据
   formatCities = (data) => {
    let cityList = {}, cityIndex;
    data.forEach((item) => {
      // 截取首字母
      let first = item.short.slice(0, 1);
      // 判断对象中是否存在某个属性
      if (!(first in cityList)) {
        cityList[first] = [item]
      } else {
        cityList[first].push(item)
      }
    })
    cityIndex = Object.keys(cityList).sort()
    return {
      cityIndex,
      cityList
    }
  }

   // 格式化字母
   formatTitle=(title) =>{
    switch (title) {
      case 'hot':
        return '热门城市';
      case 'cur':
        return '当前城市';
      default:
        return title.toUpperCase()
    }
  }
  // 动态获取行高
 getRowheight = ({ index }) => {
  const { cityIndex, cityList } = this.state;
  let letter = cityIndex[index];
  // title高度+城市高度*城市个数
  return 36 + 50 * cityList[letter].length
} 

changeCity = (city) => {
  const hasData = ['北京', '上海', '广州', '深圳'];
  if (hasData.includes(city.label)) {
    setData(CURR_CITY, JSON.stringify(city));
    this.props.history.goBack()
  } else {
    Toast.info('该城市暂无房源数据！', 2)
  }
}
  //渲染列表
  rowRenderer =({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it))=>{ 
  }) =>{
    const { cityIndex, cityList } = this.state;
    const title = cityIndex[index];
    const citylist = cityList[title]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatTitle(title)}</div>
          { citylist.map((item) => 
             <div onClick={()=>this.changeCity(item)} key={item.value} className="name">{item.label}</div>)
           }
      </div>
    )
  }

componentDidMount(){
  this.getCityData()
}

  render(){
    return(
      <div className="cityList">
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
          >
            城市选择
        </NavBar>
        {/* 高阶组件 */}
       <AutoSizer>
          {({ height, width }) => (
            <List
            height={height}
            width={width}
            rowCount={this.state.cityIndex.length}
            rowHeight={this.getRowheight}
            rowRenderer={this.rowRenderer}
            />
            )}
       </AutoSizer>
      </div>
    )
  }
}
export default CityList