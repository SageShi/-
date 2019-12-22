// miniprogram/pages/allPages/ManagerPages/docManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    dataList: [],
  },
  /**
   * 转换tab
   */
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
      that.getData(e.target.dataset.current)
    }
  },
  /**
   * 跳转上传界面
   */
  upload:function(e){
    var tip = this.data.currentData
    if(tip == 0){
      wx.navigateTo({
        url: '/pages/allPages/ManagerPages/vupload/vupload',
        fail: function(res) {},
      })
    } else if (tip == 1){
      wx.navigateTo({
        url: '/pages/allPages/ManagerPages/dupload/dupload',
        fail: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '/pages/allPages/ManagerPages/aupload/aupload',
        fail: function (res) { },
      })
    }
  },
  /**
   * 获取对应资料
   */
  getData:function(flag) {
      if (flag == 0){
        this.getVedio()
      } else if (flag == 1) {
        this.getDoc()
      } else {
        this.getAd()
      }
  },
  getVedio(){
    const db = wx.cloud.database({})
    const vedio = db.collection('videos')
    vedio.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  getDoc(){
    const db = wx.cloud.database({})
    const doc = db.collection('fileID')
    doc.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  getAd(){
    const db = wx.cloud.database({})
    const ad = db.collection('advertises')
    ad.get({
      success: res => {
        this.setData({
          dataList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVedio()
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