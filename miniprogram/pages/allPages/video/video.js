// pages/home1/document/document.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager: app.globalData.isManager,
    currentData: 0,
    vedioList: [
      {
        name:'test',
        src: 'https://v.qq.com/x/page/k0723gblmlu.html',//非必要
        vid:'k0723gblmlu' //必要
      },
      {
        name:"test1",
        src: 'https://v.qq.com/x/page/a07554e8r4i.html',//非必要
        vid: 'a07554e8r4i'
      }
    ]
  },
  
  clickVideo:function(e){
    console.log(this.data.isManager)
    var vid=e.currentTarget.dataset.vid;
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../videoPlay/videoPlay?vid='+vid+'&id'+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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