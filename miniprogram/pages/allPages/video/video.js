// pages/home1/document/document.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchWord: "",
    isManager: app.globalData.isManager,
    currentData: 0,
  },
  
  clickVideo:function(e){
    console.log(this.data.isManager)
    var url=e.currentTarget.dataset.url;
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../videoPlay/videoPlay?url='+url+'&id'+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({});
    const cont = db.collection('videos');
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var _this = this;   
    db.collection('videos').get({
      success: res => {
        this.setData({
          videoList: res.data
        })
      }
    })
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

  searchInput: function (e) {
    this.setData({ searchWord: e.detail.value })
  },

  //关键字搜索
  searchNotice: function (e) {
    const db = wx.cloud.database({});
    // 数据库正则对象（正则表达式查询）
    db.collection('videos').where({
      name: db.RegExp({
        regexp: this.data.searchWord,
        options: 'i',
      })
    }).get({
      success: res => {
        this.setData({
          videoList: res.data
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log("not found")
      }
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