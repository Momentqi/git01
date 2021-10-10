import {getclassify} from "./request";

export function getDetails(goods_id) {
  return getclassify({
    url:'/goods/detail',
    params: {
      goods_id
    }
  })
}
export class Goods {
  constructor(goods_price,goods_name){
    this.price = goods_price
    this.name = goods_name

  }
}