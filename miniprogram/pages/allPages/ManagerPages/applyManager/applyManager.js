// miniprogram/pages/allPages/ManagerPages/applyManager/applyManager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    applyList:[],
    managerList:[],
    managerButtons:[
      {
        type: 'warn',
        text: '删除',
      }
    ],
    applyButtons: [
      {
        text: '通过'
      },
      {
        type: 'warn',
        text: '拒绝',
      }
    ]
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //获取申请人表
  getApply: function(){
    const db = wx.cloud.database({})
    const apply = db.collection('apply')
    apply.get({
      success: res => {
        this.setData({
          applyList: res.data
        })
      }
    })
  },
  //获取管理员列表
  getManager: function () {
    const db = wx.cloud.database({})
    const m = db.collection('manager')
    m.get({
      success: res => {
        var temp = res.data
        for (var i = 0;i<temp.length;i++) {
          temp[i].isTouchMove = false
        }
        this.setData({
          managerList: temp
        })
      }
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
    this.getApply()
    this.getManager()
  },
  //滑动删除
  mSlideButtonTap(e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '注意',
      content: '你确定要移除该管理员？',
      success: function (res) {
        if (res.confirm) {
          that.deleteManager(id)
        }
      }
    })
  },
  deleteManager: function (ID) {
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        id: ID,
        collection: 'manager'
      },
      complete: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
    })
  },
  //未通过页面
  aSlideButtonTap(e) {
    if (e.detail.index == 0) {
      console.log('tongguo')
    } else {
      var id = e.currentTarget.dataset.id
      var that = this
      wx.showModal({
        title: '注意',
        content: '你将要拒绝该申请者？',
        success: function (res) {
          if (res.confirm) {
            that.deleteApply(id)
          }
        }
      })
    }
  },
  deleteApply: function (ID) {
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        id: ID,
        collection: 'apply'
      },
      complete: res => {
        wx.showToast({
          title: '已拒绝',
        })
      },
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

  },
})