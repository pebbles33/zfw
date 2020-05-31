import http from '../axios'
export function getSwiper(){
  return http.get('/home/swiper')
}
export function getGroup(area='AREA|88cff55c-aaa4-e2e0'){
  return http.get('/home/groups',{
    params:{
      area
    }
  })
}
export function getNews(area='AREA|88cff55c-aaa4-e2e0'){
  return http.get('/home/news',{
    params:{
      area
    }
  })
}
