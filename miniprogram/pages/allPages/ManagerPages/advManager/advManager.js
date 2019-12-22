Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [
      {
        type: 'warn',
        text: '删除',
      }
    ],
    adviceList: []
  },
  //回到顶部
  onTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取建议列表
    const db = wx.cloud.database({});
    var _this = this;
    db.collection('advice').get({
      success: res => {
        this.setData({
          adviceList: res.data
        })
      }
    })
  },
  //进入详细页面
  toDetail: function (e) {
    wx.navigateTo({
      url: '../comManager/comManager?id=' + e.currentTarget.dataset.id
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
    //获取建议列表
    const db = wx.cloud.database({});
    var _this = this;
    db.collection('advice').get({
      success: res => {
        this.setData({
          adviceList: res.data
        })
      }
    })
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
    //获取建议列表
    const db = wx.cloud.database({});
    var _this = this;
    db.collection('advice').get({
      success: res => {
        this.setData({
          adviceList: res.data
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})