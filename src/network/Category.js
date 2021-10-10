import {getclassify} from "./request";

export function getCategory() {
  return getclassify({
    url:'/categories',
    
  })
}

export function getPlay(pagesize,pagenum){
  return getclassify({
    url:'/goods/search',
    params: {
      pagesize,
      pagenum
    }
   
  })
}