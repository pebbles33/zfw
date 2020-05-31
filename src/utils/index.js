 import {getCityInfo} from './api/city'
 

 const CURR_CITY='currCity'
 export const getData = (key) => {
  return window.localStorage.getItem(key)
}
export const setData = (key, val) => {
  window.localStorage.setItem(key, val)
}
export const removeData = (key) => {
  window.localStorage.removeItem(key)
}

 // 获取当前城市信息
export function getCurrCity()  {
   const currCity=JSON.parse(getData(CURR_CITY))
   if(!currCity){
      return new Promise((resolve, reject) => {
       // 使用百度地图LocalCity类获取当前城市名字
      const myCity = new window.BMap.LocalCity();
      myCity.get(async (result) => {
        // 根据百度地图获取到城市名字，调用后台接口获取当前城市的详细数据
        let res = await getCityInfo(result.name);
        console.log(res);
        // 显示到页面上
        if(res.status === 200 ){
          setData(CURR_CITY,JSON.stringify(res.data))
          resolve(res.data)
        }else{
          reject('error')
        }
      });
     })
   }
  else{
    return Promise.resolve(currCity)
  }
}

export {CURR_CITY}