// miniprogram/pages/allPages/ManagerPages/noticeManager/noticeManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    listButtons: [
      {
        type: 'warn',
        text: '删除',
      }
    ],
  },
  getNotice() {
    let that = this;
    let imgArr = [];
    wx.cloud.database().collection("notice").get({
      success(res) {
        that.setData({
          noticeList: res.data
        })
      },
      fail(res) {
        wx.showModal({
          title: '警告',
          content: '获取通知数据失败',
          showCancel: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getNotice()
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