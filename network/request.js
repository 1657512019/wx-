//发起ajax请求
//1.封装功能函数
//2.函数内部应该保留固定代码
//3.将动态的数据抽取成形参，由使用者自身的情况动态的传入实参
//导入服务器信息
import config from './config'
export default (url, data={}, method = 'GET') => {

  //1. new Promise 初始化时状态为 pending 等待
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) => {
        if (data.isLogin) {
          //登录请求将用户cookie 存入本地
          wx.setStorage({
            key: "cookies",
            data: res.cookies //存入本地
          })
        }
        // console.log(res)
        resolve(res.data) //成功状态
      },
      fail: (err) => {
        reject(err) //失败状态
      }
    })
  })
}