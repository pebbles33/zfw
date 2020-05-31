import http from '../axios'
//获取当前城市信息
export function getCityInfo(name){
  return http.get('/area/info',{
    params:{
      name
    }
  })
}
export function getCitise(level){
  return http.get('/area/city',{
    params:{
      level:1
    }
  })
}
export function getHotCity(){
  return http.get('/area/hot',)
}