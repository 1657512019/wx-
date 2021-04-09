import request from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // image:[
    //   'http://p1.music.126.net/N54prn6SkH9jtqyy1lPOSw==/109951165775720142.jpg?imageViewquality=89',
    //   'http://p1.music.126.net/4cbCbl_3HZDIhsRBH6Gz3g==/109951165776140550.jpg?imageViewquality=89',
    //   'http://p1.music.126.net/-CO6PGdpu3MTMtbL6smsbg==/109951165777096853.jpg?imageViewquality=89',
    //   'http://p1.music.126.net/swEB4xw6QNMnicZ2mdNtfw==/109951165775803082.jpg?imageViewquality=89',
    //   'http://p1.music.126.net/kt7V8K1dcGpKed43-4-WQg==/109951165777719589.jpg?imageView&quality=89'
    // ],
       //轮播图数据
    recommendList: [], //推荐歌单
    topList: [], //排行榜数据
  },

  onLoad: async function (options) {
    let result = await request('/banner', {
      type: 2
    });
    this.setData({
      bannerList: result.banners
    })
    // console.log(result)
    //推荐歌单数据
    let recommendListData = await request('/personalized', {
      limit: 10
    })
    this.setData({
      recommendList: recommendListData.result
    });

    //获取排行榜数据
    let index = 0;
    let newarr = [];
    while (index < 10) {
      let topListDate = await request('/top/list', {
        idx: index++
      });
      let topListItem = {
        name: topListDate.playlist.name,
        tracks: topListDate.playlist.tracks.slice(0, 3)
      }
      newarr.push(topListItem);
      //更新 toplist   的状态值
        //不需要等待五次请求全部结束后在进行更新，用户体验好，但是渲染次数会多一些
      this.setData({
        topList: newarr
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