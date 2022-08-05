// 这个模块主要获取品牌管理的数据的模块
import request from '@/utils/request'
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}  get
export const reqTradeMark = (page, limit) => {
  return request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
}

//处理添加品牌的操作1.新增品牌POST /admin/product/baseTrademark/save  携带两个参数：品牌名称，品牌logo
//注意：对于新增的品牌，不需要传递id，是由服务器生成

// 2.修改品牌  PUT /admin/product/baseTrademark/update    携带三个参数：品牌id，品牌名称，品牌logo
// 对于修改某一品牌的操作，前端携带的参数需要带上id
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 修改
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method:'put', data: tradeMark })
  } else {
    // 新增品牌
    return request({ url: '/admin/product/baseTrademark/save', method:'post', data: tradeMark })
  }
}
