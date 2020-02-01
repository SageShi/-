// pages/home1/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[],
    url:'',
    id:'',
    newComment:'',
  },
  //实时获取表单值
  updataComment: function (e) {
    this.setData({
      newComment: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url || '',
      id: options.id || ''
    });
    const db = wx.cloud.database({})
    const comment = db.collection('vComment')
    // 加载评论表
    comment.where(
      { videoId: options.url }
    ).get({
      success: res => {
        this.setData({
          commentList: res.data
        })
      }
    })
  },
  onTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  addComment: function () {
    if (app.globalData.studentdocid != '') {
      const db = wx.cloud.database({})
      const comment = db.collection('vComment')
      var myDate = new Date();//获取系统当前时间
      comment.add({
        data: {
          Holder: app.globalData.name,
          Holderid: app.globalData.studentdocid,
          HolderAvatarUrl: app.globalData.avatarUrl,
          Content: this.data.newComment,
          videoId: this.data.url,
          Year: myDate.getFullYear(),
          Month: myDate.getMonth() + 1,
          Date: myDate.getDate(),
          Hours: myDate.getHours(),
          Minutes: myDate.getMinutes()
        },
        success: function (res) {
          wx.showToast({
            title: '评论成功',
            duration: 2000
          })
          this.onLoad()
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先完善学生信息',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../firstSetting/firstSetting',
            })
          }
        }
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