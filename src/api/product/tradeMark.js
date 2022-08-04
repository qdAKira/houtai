// 这个模块主要获取品牌管理的数据的模块
import request from '@/utils/request'
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}  get
export const reqTradeMark = (page,limit)=>{
  return request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
}
