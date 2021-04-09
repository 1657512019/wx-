import request from '../../network/request'

let startY = 0; //手指起始坐标
let moveY = 0; //手指移动坐标
let moveDistance = 0; //手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)", //初始值
    coverTransition: "transition(0)", //默认过渡值
    userInfo: {}, //用户信息
    recentPlayList: [], //记录用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo') //读取的是login userinfo 当初存储的字段一样
    if (userInfo) {
      //更新 userinfo 的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      //获取用户登录播放记录
this.getUserRecentPlayList(this.data.userInfo.userId);
    }
  },
  //获取用户播放记录的函数
  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record', {uid: userId,type: 0});
    let index  = 0;
     let recentPlayList = recentPlayListData.allData.splice(0,10).map(item =>{
       item.id = index++;
       return item;
     })
    this.setData({
      recentPlayList
    })
  },


  handleTouchStart(e) {
    this.setData({
      coverTransition: '' //手指点击的时候先把回弹的过渡效果给初始化防止 下次一点击下拉卡顿
    })
    //获取手指起始的坐标
    startY = e.touches[0].clientY;
    //获取手指的元素 有可能多个手指，所以用数组
  },
  handleTouchMove(e) {
    //获取手指移动的坐标
    moveY = e.touches[0].clientY;
    //手指移动的距离
    moveDistance = moveY - startY;
    //动态更新手指状态值
    if (moveDistance <= 0) { //如果计算出来的移动距离小于等于0 就不让他移动
      return
    }
    if (moveDistance >= 80) { //如果大于等于八十 就不让他继续走了
      moveDistance = 80;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`,
    })
    // console.log(moveDistance)

  },
  handleTouchEnd() {
    //手指松开后回弹到起始位置
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: 'transform .5s linear'
    })
  },
  //跳转至登录界面的回调
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
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