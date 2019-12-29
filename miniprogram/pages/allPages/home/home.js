// pages/home1/document/document.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    imgList: [
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    isManager:false,
    phoneNumber: ''
  },
  //打电话
  callManager:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    })
  },
  //获取广告图
  getImages() {
    let that = this;
    let imgArr = [];
    wx.cloud.database().collection("advertises").get({
      success(res) {
        that.setData({
          imgList: res.data
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  //获取通知列表
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
          showCancel:false
        })
      }
    })
  },
  //获取电话
  getPhoneNumber(){
    let that = this;
    wx.cloud.database().collection("phone").get({
      success(res) {
        var pn = res.data[0].pn
        that.setData({
          phoneNumber:pn
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
  //回到顶部
  onTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //跳转到对应功能
  onJumpTap: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
  },
  //广告栏跳转到对应文档
  toDoc:function(e){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://xiaochengxu-o6nj9.7869-xiaochengxu-o6nj9-1259225399/' + e.currentTarget.dataset.fileid,
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath),
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.hideLoading()
            }
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImages()
    this.getNotice()
    this.getPhoneNumber()
    this.setData({
      isManager:app.globalData.isManager
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
    this.getImages()
    this.getNotice()
    this.getPhoneNumber()
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