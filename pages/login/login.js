//引入封装好的网络请求方法
import request from '../../network/request'
Page({


  /**
   * 页面的初始数据
   */
  data: {
    iphone: "", //电话号
    password: '' //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //表单项内容发生改变时的回调

  handleInput(e) {
    let type = e.currentTarget.id; //id 传值 取值 iphone || password  还可以用data-key="value"
    this.setData({
      [type]: e.detail.value
    })
    // console.log([type])
  },

  //登录验证
  async login() {
    //1.收集表单数据
    let {
      phone,
      password
    } = this.data; //获取手机号秘密
    //2.前端验证
    //验证账号
    //1.内容为空
    //2.账号格式正确
    //3.账号格式正确，通过验证
    if (!phone) {
      //如果为空
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }

    //输入的手机号是否正确
    //定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }

    //后端验证


    let result = await request('/login/cellphone', {phone,password,isLogin:true});
    if (result.code === 200) {
      //登录成功
      wx.showToast({
        title: '登录成功',
      })
      //将用户的信息储存到本地
      //转换为 JSON 格式
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))

      //成功后跳转到 personal 界面
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
      
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '登录失败,请重新登录',
        icon: 'none'
      })
    }





  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})