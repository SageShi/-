import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      school: '',
      name: '',
    }
  },
  //表单验证
  initValidate() {
    const rules = {
      name: {
        required: true,
        rangelength: [2, 4],
      },
      school: {
        required: true,
      }
    }
    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '请输入2~4位汉字'
      },
      school: {
        required: '请输入学院',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit: function (e) {
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.finalSubmit(params)
  },
  //未完成提示框
  showModal: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //提交函数
  finalSubmit: function (params) {
    const db = wx.cloud.database()
    db.collection('apply').add({
      data: {
        Name: params.name,
        School: params.school,
        Wxid:app.globalData.openid
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 2000)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '提交失败'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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